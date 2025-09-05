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
import cardData from '../../data/cards.json';

const GameChangersBubble = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const GameChangersCategory = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'categoryColor',
})(({ theme, categoryColor }) => ({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  marginBottom: theme.spacing(2),
  color: categoryColor || theme.palette.text.primary,
}));

const GameChangersFlexbox = styled(Paper, {
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
  '&:hover': {
    transform: 'scale(1.1)',
    zIndex: 1000,
    position: 'relative',
  },
}));

// Import game changers cards from JSON
const gameChangersCards = cardData.gameChangers;

export default function GameChangersContent() {
  const renderCardGrid = (cards, bgColor) => (
    <GameChangersFlexbox bgColor={bgColor}>
      {cards.map((card, index) => (
        <CardImageBox key={index}>
          <CardImageCell>
            <CardImage
              src={`https://cdn.formatlibrary.com/images/medium_cards/${card.id}.jpg`}
              alt={card.name}
              title={card.name}
            />
          </CardImageCell>
        </CardImageBox>
      ))}
    </GameChangersFlexbox>
  );

  return (
    <CardContent sx={{ p: 4, "&:last-child": { pb: 4 } }}>
      <Typography
        variant="h3"
        component="h2"
        gutterBottom
        sx={{ mb: 3 }}
      >
        Game Changers
      </Typography>
      
      <Typography
        variant="h6"
        color="text.secondary"
        sx={{ lineHeight: 1.7, mb: 2 }}
      >
        Scopri le carte che sono normalmente bandite in altri formati ma operano sotto regolamenti speciali nel formato Kitchen, creando opportunità di gioco uniche.
        
      </Typography>
      
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ fontStyle: 'italic', mb: 4 }}
      >
        Ultimo aggiornamento: 5 settembre 2025
      </Typography>
      
      {/* Game Changers Cards */}
      <GameChangersBubble>
        <GameChangersCategory categoryColor="#9c27b0">
          Game Changers:
        </GameChangersCategory>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 3, lineHeight: 1.6 }}
        >
          Puoi aggiungere un massimo di 1 copia di queste carte nel tuo deck, per un massimo di 2 carte game changers in totale nel tuo deck.
        </Typography>
        {renderCardGrid(gameChangersCards, 'rgba(156, 39, 176, 0.1)')}
      </GameChangersBubble>
    </CardContent>
  );
}
