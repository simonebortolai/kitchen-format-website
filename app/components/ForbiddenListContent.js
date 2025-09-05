import React from 'react';
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Divider,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CardDialog from './CardDialog';
import useCardDialog from './hooks/useCardDialog';
import cardData from "../../data/cards.js";

const BanlistBubble = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const BanlistCategory = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'categoryColor',
})(({ theme, categoryColor }) => ({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  marginBottom: theme.spacing(2),
  color: categoryColor || theme.palette.text.primary,
}));

const BanlistFlexbox = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'bgColor',
})(({ theme, bgColor }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(0.5), // Reduced from 1.5 to 0.5
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  padding: theme.spacing(3),
  backgroundColor: bgColor || theme.palette.background.paper,
  border: `2px solid ${bgColor ? bgColor.replace('0.1', '0.3') : theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  maxWidth: '100%',
  '& > *': {
    flexBasis: 'calc(10% - 4px)', // Adjusted for smaller gap
    maxWidth: 'calc(10% - 4px)',
  },
}));

const CardImageBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const CardImageCell = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'inline-block',
}));

const CardImage = styled('img')(({ theme }) => ({
  width: '100%', // Make it responsive to container width
  maxWidth: '100px', // Increased from 84px
  height: 'auto',
  margin: '0px',
  padding: '1px', // Reduced from 2px
  borderRadius: '6px',
  transition: 'transform 0.2s ease-in-out',
  cursor: 'pointer',
  '&:hover': {
    transform: 'scale(1.1)',
    zIndex: 1000,
    position: 'relative',
  },
}));

// Import card data from JSON
const { forbidden: forbiddenCards, limited: limitedCards, semiLimited: semiLimitedCards } = cardData;

// Function to convert card name to URL slug
const getCardSlug = (cardName) => {
  return cardName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
};

export default function ForbiddenListContent() {
  const { dialogOpen, selectedCard, handleCardClick, handleCloseDialog } = useCardDialog();

  const renderCardGrid = (cards, bgColor) => (
    <BanlistFlexbox bgColor={bgColor}>
      {cards.map((card, index) => (
        <CardImageBox key={index}>
          <CardImageCell>
            <CardImage
              src={`https://cdn.formatlibrary.com/images/medium_cards/${card.id}.jpg`}
              alt={card.name}
              title={card.name}
              onClick={() => handleCardClick(card)}
            />
          </CardImageCell>
        </CardImageBox>
      ))}
    </BanlistFlexbox>
  );

  return (
    <CardContent sx={{ p: 4, "&:last-child": { pb: 4 } }}>
      <Typography
        variant="h3"
        component="h2"
        gutterBottom
        sx={{ mb: 3 }}
      >
        Lista Carte Bandite/Limitate
      </Typography>
      
      <Typography
        variant="h6"
        color="text.secondary"
        sx={{ lineHeight: 1.7, mb: 2 }}
      >
        Visualizza l&apos;attuale lista delle carte bandite e limitate nel formato Kitchen. Questa lista viene mantenuta per garantire un gameplay equilibrato e divertente per tutti i giocatori.
      </Typography>
      
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ fontStyle: 'italic', mb: 4 }}
      >
        Ultimo aggiornamento: 5 settembre 2025
      </Typography>
      
      {/* Forbidden Cards */}
      <BanlistBubble>
        <BanlistCategory categoryColor="#f44336">
          Bandite:
        </BanlistCategory>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 3, lineHeight: 1.6 }}
        >
          Queste carte sono completamente bandite. Non puoi includere nessuna copia di queste carte nel tuo deck principale, side deck o extra deck.
        </Typography>
        {renderCardGrid(forbiddenCards, 'rgba(244, 67, 54, 0.1)')}
      </BanlistBubble>

      {/* Limited Cards */}
      <BanlistBubble>
        <BanlistCategory categoryColor="#ffd700">
          Limitate:
        </BanlistCategory>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 3, lineHeight: 1.6 }}
        >
          Puoi includere un massimo di 1 copia di queste carte nel tuo deck. Questo include il deck principale, side deck ed extra deck combinati.
        </Typography>
        {renderCardGrid(limitedCards, 'rgba(255, 215, 0, 0.2)')}
      </BanlistBubble>

      {/* Semi-Limited Cards */}
      <BanlistBubble>
        <BanlistCategory categoryColor="#8b4513">
          Semi-Limitate:
        </BanlistCategory>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 3, lineHeight: 1.6 }}
        >
          Puoi includere un massimo di 2 copie di queste carte nel tuo deck. Questo include il deck principale, side deck ed extra deck combinati.
        </Typography>
        {renderCardGrid(semiLimitedCards, 'rgba(139, 69, 19, 0.2)')}
      </BanlistBubble>

      {/* Card Details Dialog */}
      <CardDialog
        open={dialogOpen}
        card={selectedCard}
        onClose={handleCloseDialog}
      />
    </CardContent>
  );
}