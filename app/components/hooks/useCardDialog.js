import { useState } from 'react';

const useCardDialog = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  // Function to handle card click
  const handleCardClick = async (card) => {
    console.log("Fetching card data for:", card.name);
    setSelectedCard({ ...card, loading: true });
    setDialogOpen(true);
    
    // Fetch additional card data from YGOPRODeck API
    try {
      const response = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${encodeURIComponent(card.name)}`);
      const data = await response.json();
      
      if (data.data && data.data.length > 0) {
        const apiCardData = data.data[0];
        setSelectedCard({
          ...card,
          apiData: apiCardData,
          loading: false
        });
      } else {
        console.warn("No card data found for:", card.name);
        setSelectedCard({ ...card, loading: false });
      }
    } catch (error) {
      console.error('Error fetching card data:', error);
      setSelectedCard({ ...card, loading: false });
    }
  };

  // Function to close dialog
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedCard(null);
  };

  return {
    dialogOpen,
    selectedCard,
    handleCardClick,
    handleCloseDialog
  };
};

export default useCardDialog;
