import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Divider,
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
      
      {/* Additional content area */}
      <Divider sx={{ my: 3 }} />
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card
            variant="outlined"
            sx={{
              backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'grey.800' : 'grey.50',
              height: "100%",
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                component="h3"
                gutterBottom
                sx={{ fontWeight: 600 }}
              >
                Forbidden Cards
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Cards that are completely banned from the Exiled format.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card
            variant="outlined"
            sx={{
              backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'grey.800' : 'grey.50',
              height: "100%",
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                component="h3"
                gutterBottom
                sx={{ fontWeight: 600 }}
              >
                Limited Cards
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Button
                  variant="text"
                  color="primary"
                  sx={{ 
                    justifyContent: "flex-start", 
                    py: 1,
                    '&:hover': {
                      backgroundColor: (theme) => theme.palette.mode === 'dark' 
                        ? 'rgba(96, 165, 250, 0.1)' 
                        : 'rgba(37, 99, 235, 0.04)'
                    }
                  }}
                >
                  View Limited List
                </Button>
                <Button
                  variant="text"
                  color="primary"
                  sx={{ 
                    justifyContent: "flex-start", 
                    py: 1,
                    '&:hover': {
                      backgroundColor: (theme) => theme.palette.mode === 'dark' 
                        ? 'rgba(96, 165, 250, 0.1)' 
                        : 'rgba(37, 99, 235, 0.04)'
                    }
                  }}
                >
                  Download List
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </CardContent>
  );
}
