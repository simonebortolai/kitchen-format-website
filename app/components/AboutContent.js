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
    <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 }, "&:last-child": { pb: { xs: 2, sm: 3, md: 4 } } }}>
      <Typography
        variant="h3"
        component="h2"
        gutterBottom
        sx={{ 
          mb: 3,
          fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
        }}
      >
        Cos'è il Kitchen Format?
      </Typography>
      
      <Typography
        variant="h6"
        color="text.secondary"
        sx={{ 
          lineHeight: 1.7, 
          mb: 3,
          fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
          '& .highlight-primary': { fontWeight: 'bold', color: 'primary.main' },
          '& .highlight-warning': { fontWeight: 'bold', color: 'warning.main' },
          '& .highlight-error': { fontWeight: 'bold', fontStyle: 'italic', color: 'error.main' }
        }}
      >
        Il formato Kitchen si basa sull'idea di avere una <span className="highlight-primary">vasta gamma di carte tra cui scegliere</span>, dalle iconiche del passato a quelle più bilanciate dell'era moderna. Le carte ammesse sono tutte quelle rilasciate fino al <span className="highlight-warning">10 luglio 2014</span>, <span className="highlight-error">il giorno prima che tutto venisse rovinato con l'uscita dei Pendulum</span>.
      </Typography>

      {/* Three cards display */}
      <Box sx={{ 
        my: 6, 
        py: 1,
        display: 'flex', 
        justifyContent: 'center',
        gap: { xs: 3, sm: 4, md: 5 },
        flexWrap: 'wrap'
      }}>
        <Box
          component="img"
          src="/kitchen-format-website/exiled.jpg"
          alt="Exiled Force"
          sx={{
            width: { xs: '120px', sm: '150px', md: '180px' },
            height: 'auto',
            borderRadius: 2,
            boxShadow: 2
          }}
        />
        <Box
          component="img"
          src="/kitchen-format-website/mystic.webp"
          alt="Mystic Tomato"
          sx={{
            width: { xs: '120px', sm: '150px', md: '180px' },
            height: 'auto',
            borderRadius: 2,
            boxShadow: 2
          }}
        />
        <Box
          component="img"
          src="/kitchen-format-website/utopia.webp"
          alt="Number 39: Utopia"
          sx={{
            width: { xs: '120px', sm: '150px', md: '180px' },
            height: 'auto',
            borderRadius: 2,
            boxShadow: 2
          }}
        />
        <Box
          component="img"
          src="/kitchen-format-website/jar.jpg"
          alt="Pot of Greed"
          sx={{
            width: { xs: '120px', sm: '150px', md: '180px' },
            height: 'auto',
            borderRadius: 2,
            boxShadow: 2
          }}
        />
      </Box>

      <Typography
        variant="h6"
        color="text.secondary"
        sx={{ 
          lineHeight: 1.7, 
          fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
          '& .highlight-secondary': { fontWeight: 'bold', color: 'secondary.main' },
          '& .highlight-primary': { fontWeight: 'bold', color: 'primary.main' }
        }}
      >
        Per mantenere il formato bilanciato, le carte più vecchie sono limitate da una <span className="highlight-secondary">meccanica unica del formato chiamata WildCards</span>: carte normalmente bannate che invece fanno una passeggiata nel formato come <span className="highlight-primary">carte limitate, dove puoi avere solo due copie di WildCards diverse per ogni deck</span>.
      </Typography>
      
     <Box sx={{ 
        my: 6, 
        py: 1,
        display: 'flex', 
        justifyContent: 'center',
        gap: { xs: 3, sm: 4, md: 5 },
        flexWrap: 'wrap'
      }}>
        <Box
          component="img"
          src="/kitchen-format-website/sangan.webp"
          alt="Sangan"
          sx={{
            width: { xs: '120px', sm: '150px', md: '180px' },
            height: 'auto',
            borderRadius: 2,
            boxShadow: 2
          }}
        />
        <Box
          component="img"
          src="/kitchen-format-website/stardust.webp"
          alt="Stardust Dragon"
          sx={{
            width: { xs: '120px', sm: '150px', md: '180px' },
            height: 'auto',
            borderRadius: 2,
            boxShadow: 2
          }}
        />
        <Box
          component="img"
          src="/kitchen-format-website/pot.webp"
          alt="Pot of Greed"
          sx={{
            width: { xs: '120px', sm: '150px', md: '180px' },
            height: 'auto',
            borderRadius: 2,
            boxShadow: 2
          }}
        />
        <Box
          component="img"
          src="/kitchen-format-website/photon.webp"
          alt="Photon"
          sx={{
            width: { xs: '120px', sm: '150px', md: '180px' },
            height: 'auto',
            borderRadius: 2,
            boxShadow: 2
          }}
        />
        
      </Box>
      
      <Typography
        variant="h6"
        color="text.secondary"
        sx={{ 
          lineHeight: 1.7, 
          fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
          '& .highlight-primary': { fontWeight: 'bold', color: 'primary.main' },
          '& .highlight-secondary': { fontWeight: 'bold', color: 'secondary.main' },
          '& .highlight-warning': { fontWeight: 'bold', color: 'warning.main' },
          '& .highlight-kitchen': { fontWeight: 'bold', fontStyle: 'italic', color: 'primary.main' }
        }}
      >
        Il Kitchen Format è un <span className="highlight-primary">formato in continua evoluzione</span>, con una <span className="highlight-secondary">lista di WildCards sempre in revisione</span> per mantenere l'equilibrio competitivo. Vengono incentivati i <span className="highlight-warning">mazzi creativi e sperimentali</span> per un'esperienza autentica in pieno stile <span className="highlight-kitchen">"Kitchen Table"</span>, da cui deriva il nome del formato. L'obiettivo è ricreare l'atmosfera casalinga e divertente del gioco tra amici, dove la creatività e l'innovazione sono più importanti della pura competitività.
      </Typography>
        
    </CardContent>
  );
}
