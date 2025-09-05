import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Divider,
} from "@mui/material";

export default function AboutContent() {
  return (
    <CardContent sx={{ p: 4, "&:last-child": { pb: 4 } }}>
      <Typography
        variant="h3"
        component="h2"
        gutterBottom
        sx={{ mb: 3 }}
      >
        Info sul Formato Kitchen
      </Typography>
      
      <Typography
        variant="h6"
        color="text.secondary"
        sx={{ lineHeight: 1.7, mb: 4 }}
      >
        Scopri di più sul formato Kitchen, le sue regole e come si differenzia dagli altri formati di Yu-Gi-Oh!. Esplora la filosofia dietro questo formato guidato dalla community.


        LAVORI IN CORSO
      </Typography>
      
     
        
        
    </CardContent>
  );
}
