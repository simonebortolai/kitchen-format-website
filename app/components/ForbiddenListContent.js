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

export default function ForbiddenListContent() {
  return (
    <CardContent sx={{ p: 4, "&:last-child": { pb: 4 } }}>
      <Typography
        variant="h3"
        component="h2"
        gutterBottom
        sx={{ mb: 3 }}
      >
        Forbidden/Limited List
      </Typography>
      
      <Typography
        variant="h6"
        color="text.secondary"
        sx={{ lineHeight: 1.7, mb: 4 }}
      >
        View the current list of forbidden and limited cards in the Exiled format. This list is maintained to ensure balanced and enjoyable gameplay for all players.
      </Typography>
      
      {/* Card Lists */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {/* Forbidden Cards */}
        <Box>
          <Typography
            variant="h4"
            component="h3"
            gutterBottom
            sx={{ 
              fontWeight: 600,
              color: 'error.main',
              mb: 1
            }}
          >
            Forbidden
          </Typography>
          
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ 
              lineHeight: 1.6,
              mb: 3
            }}
          >
            Cards completely banned from play
          </Typography>
          
          <Paper
            elevation={3}
            sx={{
              backgroundColor: 'rgba(244, 67, 54, 0.1)', // Red transparent
              border: '2px solid rgba(244, 67, 54, 0.3)',
              p: 3,
              width: '100%',
              height: '150px',
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
          </Paper>
        </Box>
        
        {/* Limited Cards */}
        <Box>
          <Typography
            variant="h4"
            component="h3"
            gutterBottom
            sx={{ 
              fontWeight: 600,
              color: 'warning.main',
              mb: 1
            }}
          >
            Limited
          </Typography>
          
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ 
              lineHeight: 1.6,
              mb: 3
            }}
          >
            Maximum 1 copy per deck
          </Typography>
          
          <Paper
            elevation={3}
            sx={{
              backgroundColor: 'rgba(255, 193, 7, 0.1)', // Yellow transparent
              border: '2px solid rgba(255, 193, 7, 0.3)',
              p: 3,
              width: '100%',
              height: '150px',
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
          </Paper>
        </Box>
        
        {/* Semi-Limited Cards */}
        <Box>
          <Typography
            variant="h4"
            component="h3"
            gutterBottom
            sx={{ 
              fontWeight: 600,
              color: 'success.main',
              mb: 1
            }}
          >
            Semi-limited
          </Typography>
          
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ 
              lineHeight: 1.6,
              mb: 3
            }}
          >
            Maximum 2 copies per deck
          </Typography>
          
          <Paper
            elevation={3}
            sx={{
              backgroundColor: 'rgba(76, 175, 80, 0.1)', // Green transparent
              border: '2px solid rgba(76, 175, 80, 0.3)',
              p: 3,
              width: '100%',
              height: '150px',
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
          </Paper>
        </Box>
      </Box>
    </CardContent>
  );
}
