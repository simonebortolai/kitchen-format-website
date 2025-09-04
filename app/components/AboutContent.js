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
        About Exiled Format
      </Typography>
      
      <Typography
        variant="h6"
        color="text.secondary"
        sx={{ lineHeight: 1.7, mb: 4 }}
      >
        Learn more about the Exiled format, its rules, and how it differs from other Yu-Gi-Oh! formats. Discover the philosophy behind this community-driven format.


        WORK IN PROGRESS
      </Typography>
      
     
        
        
    </CardContent>
  );
}
