import React from 'react';
import {
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const CardDialog = ({ open, card, onClose }) => {
  if (!card) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3, position: 'relative' }
      }}
    >
      {/* Close button in top-right corner */}
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{ 
          position: 'absolute', 
          right: 8, 
          top: 8, 
          color: (theme) => theme.palette.grey[500],
          zIndex: 1
        }}
      >
        <CloseIcon />
      </IconButton>
      
      <DialogContent sx={{ pt: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4 }}>
          {/* Card Image */}
          <Box sx={{ flexShrink: 0 }}>
            <img
              src={card.apiData?.card_images?.[0]?.image_url || `https://cdn.formatlibrary.com/images/cards/${card.cleanId || card.id.replace(/^0+/, '') || '0'}.jpg`}
              alt={card.name}
              style={{
                width: '480px',
                height: 'auto',
                borderRadius: '12px',
                boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
              }}
            />
          </Box>
          
          {/* Card Details */}
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {card.loading ? (
              <Typography>Loading card details...</Typography>
            ) : (
              <>
                {/* Card ID */}
                <Box>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Card ID
                  </Typography>
                  <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
                    {card.id}
                  </Typography>
                </Box>

                {/* Use API data if available, otherwise use original data */}
                {(() => {
                  const cardInfo = card.apiData || card.originalData;
                  
                  return (
                    <>
                      {/* Card Type */}
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                          Card Type
                        </Typography>
                        <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                          {cardInfo?.type || cardInfo?.cardType || 'Unknown'}
                        </Typography>
                      </Box>

                      {/* Monster specific details */}
                      {(cardInfo?.type?.toLowerCase().includes('monster') || cardInfo?.cardType === 'monster') && (
                        <>
                          {/* Monster Type/Race */}
                          <Box>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                              Monster Type
                            </Typography>
                            <Typography variant="body1">
                              {cardInfo?.race || cardInfo?.monster?.race || 'Unknown'}
                            </Typography>
                          </Box>

                          {/* Attribute */}
                          <Box>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                              Attribute
                            </Typography>
                            <Typography variant="body1" sx={{ textTransform: 'uppercase', fontWeight: 'bold' }}>
                              {cardInfo?.attribute || cardInfo?.monster?.attribute || 'Unknown'}
                            </Typography>
                          </Box>

                          {/* Level/Rank */}
                          {(cardInfo?.level !== undefined || cardInfo?.monster?.level !== undefined) && (
                            <Box>
                              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                Level
                              </Typography>
                              <Typography variant="body1">
                                {cardInfo?.level ?? cardInfo?.monster?.level ?? 'Unknown'}
                              </Typography>
                            </Box>
                          )}

                          {/* ATK / DEF */}
                          <Box>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                              ATK / DEF
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                              {(cardInfo?.atk ?? cardInfo?.monster?.attack ?? '?')} / {(cardInfo?.def ?? cardInfo?.monster?.defense ?? '?')}
                            </Typography>
                          </Box>
                        </>
                      )}

                      {/* Card Effect/Description */}
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                          Card Text
                        </Typography>
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            lineHeight: 1.6, 
                            backgroundColor: 'rgba(0,0,0,0.02)', 
                            p: 2, 
                            borderRadius: 1,
                            maxHeight: '200px',
                            overflowY: 'auto',
                            fontSize: '1rem'
                          }}
                        >
                          {cardInfo?.desc || cardInfo?.text?.en?.effect || 'No description available'}
                        </Typography>
                      </Box>
                    </>
                  );
                })()}
              </>
            )}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CardDialog;
