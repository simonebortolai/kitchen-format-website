import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  TextField,
  Paper,
  CardContent,
  Chip,
  InputAdornment,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from '@mui/icons-material/Search';
import CardDialog from './CardDialog';
import useCardDialog from './hooks/useCardDialog';
import cardData from "../../data/cards.js";
import cardsJsonData from "../../data/cards.json";

// Process cards from JSON file
const processedCards = cardsJsonData.map(card => {
  // Extract names from all available languages
  const text = card.text || {};
  const names = {
    en: text.en?.name || '',
    fr: text.fr?.name || '',
    de: text.de?.name || '',
    it: text.it?.name || '',
    es: text.es?.name || '',
    ja: text.ja?.name || '',
    ko: text.ko?.name || ''
  };
  
  // Primary display name (English first, then first available)
  const name = names.en || names.fr || names.de || names.it || names.es || names.ja || names.ko || '';
  
  // Get the main password (card ID)
  const id = card.passwords?.[0] || '';
  
  return {
    name,
    names, // All language names for searching
    id: id.toString(),
    originalData: card
  };
}).filter(card => card.name && card.id); // Filter out cards without name or ID

// Function to check card release date using YGOPRODeck API
const checkCardReleaseDate = async (cardId) => {
  try {
    const response = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${cardId}&misc=yes`);
    const data = await response.json();
    
    if (data.data && data.data[0]) {
      const cardInfo = data.data[0];
      
      // Check misc_info for TCG release date
      if (cardInfo.misc_info && cardInfo.misc_info[0] && cardInfo.misc_info[0].tcg_date) {
        const tcgDate = cardInfo.misc_info[0].tcg_date;
        const releaseDate = new Date(tcgDate);
        const cutoffDate = new Date('2014-07-10');
        
        return {
          isLegal: releaseDate < cutoffDate,
          releaseDate: tcgDate
        };
      }
      
      // If no TCG date found in misc_info
      return {
        isLegal: false, // Conservative approach - assume illegal if no date
        releaseDate: "Data non disponibile"
      };
    }
    
    // If no data returned, card doesn't exist
    return {
      isLegal: false,
      releaseDate: "Carta non trovata"
    };
  } catch (error) {
    console.error(`Error checking release date for card ${cardId}:`, error);
    return {
      isLegal: false,
      releaseDate: "API failed"
    };
  }
};

const SearchContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const ResultContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));

const CardRow = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  gap: theme.spacing(3),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5),
    gap: theme.spacing(2),
    flexDirection: 'column',
    textAlign: 'center',
  },
}));

const CardImageContainer = styled(Box)(({ theme }) => ({
  flexShrink: 0,
}));

const CardImage = styled('img')(({ theme }) => ({
  width: '80px',
  height: 'auto',
  borderRadius: '6px',
  cursor: 'pointer',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  '&:error': {
    display: 'none',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100px',
  },
}));

const CardImagePlaceholder = styled(Box)(({ theme }) => ({
  width: '80px',
  height: '117px', // Standard Yu-Gi-Oh card aspect ratio
  borderRadius: '6px',
  cursor: 'pointer',
  transition: 'transform 0.2s ease-in-out',
  backgroundColor: theme.palette.grey[200],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '12px',
  color: theme.palette.grey[600],
  textAlign: 'center',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const CardInfo = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

const CardName = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '1.1rem',
}));

const CardDetails = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  flexWrap: 'wrap',
}));

const StatusContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  flexWrap: 'wrap',
}));

// Card Image Component using only Format Library
const CardImageWithFallback = ({ card, onClick }) => {
  // Remove leading zeros from card ID for Format Library URLs
  const cleanedId = card.id.replace(/^0+/, '') || '0';
  const imageUrl = `https://cdn.formatlibrary.com/images/cards/${cleanedId}.jpg`;
  
  return (
    <CardImage
      src={imageUrl}
      alt={card.name}
      onClick={onClick}
    />
  );
};

export default function CardLegalityContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [cardLegality, setCardLegality] = useState({}); // Cache for card legality
  const [resultsToShow, setResultsToShow] = useState(5); // Number of results to display
  const [allFilteredResults, setAllFilteredResults] = useState([]); // Store all filtered results
  
  // Use the card dialog hook
  const { dialogOpen, selectedCard, handleCardClick, handleCloseDialog } = useCardDialog();

  // Combine all card lists for status checking
  const allBanlistCards = {
    ...cardData.forbidden.reduce((acc, card) => ({ ...acc, [card.name]: 'forbidden' }), {}),
    ...cardData.limited.reduce((acc, card) => ({ ...acc, [card.name]: 'limited' }), {}),
    ...cardData.semiLimited.reduce((acc, card) => ({ ...acc, [card.name]: 'semi-limited' }), {}),
    ...cardData.gameChangers.reduce((acc, card) => ({ ...acc, [card.name]: 'game-changer' }), {}),
  };

  // Function to check if a card is legal (now checks release date)
  const isCardLegal = async (cardId) => {
    // Check cache first
    if (cardLegality[cardId] !== undefined) {
      return cardLegality[cardId];
    }
    
    // Check release date via API
    const result = await checkCardReleaseDate(cardId);
    
    // Cache the result
    setCardLegality(prev => ({ ...prev, [cardId]: result }));
    
    return result;
  };

  // Function to get card status
  const getCardStatus = (cardName) => {
    return allBanlistCards[cardName] || null;
  };

  // Function to format date (removed since we're not using dates)
  // const formatDate = (dateString) => {
  //   const date = new Date(dateString);
  //   return date.toLocaleDateString('it-IT', {
  //     year: 'numeric',
  //     month: 'long',
  //     day: 'numeric'
  //   });
  // };

  // Function to convert card name to URL slug
  const getCardSlug = (cardName) => {
    return cardName
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // Wait 500ms after user stops typing

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Search function with legality checking
  useEffect(() => {
    if (debouncedSearchTerm.trim() === '') {
      setSearchResults([]);
      setAllFilteredResults([]);
      setResultsToShow(5); // Reset to 5 when search is cleared
      return;
    }

    const performSearch = async () => {
      const searchTerm = debouncedSearchTerm.toLowerCase();
      
      // Filter cards by searching across all language names
      const filtered = processedCards.filter(card => {
        // Check if search term matches any language name
        return Object.values(card.names).some(name => 
          name && name.toLowerCase().includes(searchTerm)
        );
      });
      
      // Sort by relevance: exact matches first, then starts with, then contains
      const sorted = filtered.sort((a, b) => {
        const getRelevanceScore = (card) => {
          const names = Object.values(card.names).filter(Boolean);
          const lowerNames = names.map(name => name.toLowerCase());
          
          // Exact match gets highest score
          if (lowerNames.some(name => name === searchTerm)) return 1000;
          
          // Starts with search term gets high score
          if (lowerNames.some(name => name.startsWith(searchTerm))) return 100;
          
          // Contains search term gets lower score (but prioritize shorter names)
          const containsMatches = lowerNames.filter(name => name.includes(searchTerm));
          if (containsMatches.length > 0) {
            const shortestMatch = Math.min(...containsMatches.map(name => name.length));
            return 50 - shortestMatch; // Shorter names get higher score
          }
          
          return 0;
        };
        
        return getRelevanceScore(b) - getRelevanceScore(a);
      });
      
      // Store all filtered results
      setAllFilteredResults(sorted);
      
      // Limit to current number of results to show
      const limitedResults = sorted.slice(0, resultsToShow);
      
      // Add legality check for each card
      const enrichedResults = await Promise.all(
        limitedResults.map(async (card) => {
          const legalityResult = await isCardLegal(card.id);
          return { 
            ...card, 
            isLegal: legalityResult.isLegal,
            releaseDate: legalityResult.releaseDate
          };
        })
      );
      
      setSearchResults(enrichedResults);
    };

    performSearch();
  }, [debouncedSearchTerm, resultsToShow]);

  const getStatusChipProps = (status) => {
    switch (status) {
      case 'forbidden':
        return { label: 'Bandita', color: 'error' };
      case 'limited':
        return { label: 'Limitata', sx: { backgroundColor: '#ffd700', color: '#000000', '&:hover': { backgroundColor: '#e6c200' } } };
      case 'semi-limited':
        return { label: 'Semi-Limitata', sx: { backgroundColor: '#8b4513', color: '#ffffff', '&:hover': { backgroundColor: '#7a3d11' } } };
      case 'game-changer':
        return { label: 'Game Changer', color: 'secondary' };
      default:
        return null;
    }
  };

  return (
    <CardContent sx={{ p: 4, "&:last-child": { pb: 4 } }}>
      <Typography
        variant="h3"
        component="h2"
        gutterBottom
        sx={{ mb: 3 }}
      >
        Ricerca Carte
      </Typography>
      
      <Typography
        variant="h6"
        color="text.secondary"
        sx={{ lineHeight: 1.7, mb: 2 }}
      >
        Verifica se una carta è legale nel formato Kitchen e controlla il suo status nella banlist.
      </Typography>
      
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ fontStyle: 'italic', mb: 4 }}
      >
        Inserisci il nome di una carta per verificarne lo status nella banlist.
      </Typography>

      <SearchContainer>
        <TextField
          fullWidth
          placeholder="Cerca una carta..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
        />
      </SearchContainer>

      <ResultContainer>

        
        {searchResults.map((card, index) => {
          const cardStatus = getCardStatus(card.name);
          const statusChip = getStatusChipProps(cardStatus);
          
          // Find which language(s) matched the search
          const searchTerm = debouncedSearchTerm.toLowerCase();
          const matchingLanguages = Object.entries(card.names)
            .filter(([lang, name]) => name && name.toLowerCase().includes(searchTerm))
            .map(([lang, name]) => ({ lang, name }));
          
          // Show the best matching name (exact match or shortest containing match)
          const bestMatch = matchingLanguages.find(({name}) => 
            name.toLowerCase() === searchTerm
          ) || matchingLanguages.find(({name}) => 
            name.toLowerCase().startsWith(searchTerm)
          ) || matchingLanguages[0];
          
          const displayName = bestMatch && bestMatch.name !== card.name ? 
            `${card.name} (${bestMatch.name})` : card.name;
          
          return (
            <CardRow key={index} elevation={1}>
              <CardImageContainer>
                <CardImageWithFallback 
                  card={card}
                  onClick={() => handleCardClick(card)}
                />
              </CardImageContainer>
              
              <CardInfo>
                <CardName>{displayName}</CardName>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  {card.releaseDate === undefined ? "Caricamento..." : `Data rilascio TCG: ${card.releaseDate}`}
                </Typography>
              </CardInfo>
              
              <StatusContainer>
                {statusChip ? (
                  // If card has banlist status, show only that
                  <Chip
                    label={statusChip.label}
                    color={statusChip.color || 'default'}
                    variant="filled"
                    sx={statusChip.sx || {}}
                  />
                ) : (
                  // Otherwise show legality status
                  <Chip
                    label={card.isLegal === undefined ? "Verificando..." : card.isLegal ? "Legale" : "Non Legale"}
                    color={card.isLegal === undefined ? "default" : card.isLegal ? "success" : "error"}
                    variant="filled"
                  />
                )}
              </StatusContainer>
            </CardRow>
          );
        })}
        
        {searchTerm.trim() !== '' && searchResults.length === 0 && (
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography color="text.secondary">
              Nessuna carta trovata per &quot;{searchTerm}&quot;
            </Typography>
          </Paper>
        )}
        
        {/* Show More Results Button */}
        {searchResults.length > 0 && allFilteredResults.length > resultsToShow && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button
              variant="outlined"
              onClick={() => setResultsToShow(prev => prev + 5)}
              sx={{ borderRadius: 2 }}
            >
              Mostra altri 5 risultati ({allFilteredResults.length - resultsToShow} rimanenti)
            </Button>
          </Box>
        )}
      </ResultContainer>

      {/* Card Details Dialog */}
      <CardDialog
        open={dialogOpen}
        card={selectedCard}
        onClose={handleCloseDialog}
      />
    </CardContent>
  );
}
