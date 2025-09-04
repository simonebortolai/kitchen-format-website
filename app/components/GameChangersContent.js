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

export default function GameChangersContent() {
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
        sx={{ lineHeight: 1.7, mb: 4 }}
      >
        Discover the cards that are normally banned in other formats but operate under special regulations in the Exiled format, creating unique gameplay opportunities.
      </Typography>
      
      {/* Game Changers Content */}
      <Box>
        <Typography
          variant="h4"
          component="h3"
          gutterBottom
          sx={{ 
            fontWeight: 600,
            color: 'primary.main',
            mb: 1
          }}
        >
          Game Changers
        </Typography>
        
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ 
            lineHeight: 1.6,
            mb: 3
          }}
        >
          Cards normally banned but under special regulation in the Exiled format
        </Typography>
        
        <Paper
          elevation={3}
          sx={{
            backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(156, 39, 176, 0.1)' : 'rgba(156, 39, 176, 0.1)',
            border: (theme) => theme.palette.mode === 'dark' ? '2px solid rgba(156, 39, 176, 0.3)' : '2px solid rgba(156, 39, 176, 0.3)',
            p: 3,
            width: '100%',
            height: '200px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ 
              textAlign: 'center',
              fontStyle: 'italic'
            }}
          >
            Work in Progress
          </Typography>
          
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ 
              textAlign: 'center',
              mt: 2
            }}
          >
            Powerful cards with special restrictions that change the game
          </Typography>
        </Paper>
      </Box>
    </CardContent>
  );
}
