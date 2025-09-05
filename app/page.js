"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import logoImage from "../public/mystic.webp";
import {
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  Container,
  Paper,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Divider,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from "@mui/material/styles";
import AboutContent from "./components/AboutContent";
import CardLegalityContent from "./components/CardLegalityContent";
import ForbiddenListContent from "./components/ForbiddenListContent";
import GameChangersContent from "./components/GameChangersContent";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: theme.palette.mode === 'dark' 
    ? '0 1px 3px 0 rgb(0 0 0 / 0.3), 0 1px 2px -1px rgb(0 0 0 / 0.3)'
    : '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
}));

const StyledDivider = styled(Box)(({ theme }) => ({
  height: '1px',
  background: theme.palette.mode === 'dark'
    ? `linear-gradient(to right, transparent, ${theme.palette.grey[600]}, transparent)`
    : `linear-gradient(to right, transparent, ${theme.palette.grey[300]}, transparent)`,
  margin: 0,
}));

const ContentCard = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: theme.spacing(2),
}));

const tabs = [
  { id: "about", label: "Info" },
  { id: "legality", label: "Ricerca" },
  { id: "forbidden", label: "Carte Bandite/Limitate" },
  { id: "gamechangers", label: "Game Changers" }
];

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Handle hydration and loading state
  useEffect(() => {
    // Set a minimal loading time to ensure smooth transition
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200); // 200ms minimum loading time - just enough to prevent the interaction buffer

    return () => clearTimeout(timer);
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    if (isMobile) {
      setMobileMenuOpen(false); // Close mobile menu when tab is selected
    }
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <AboutContent />;
      case 1:
        return <CardLegalityContent />;
      case 2:
        return <ForbiddenListContent />;
      case 3:
        return <GameChangersContent />;
      default:
        return <AboutContent />;
    }
  };

  return (
    <>
      {/* Loading Overlay */}
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: 'background.default',
          flexDirection: 'column',
          gap: 2,
        }}
        open={isLoading}
      >
        <Image
          src={logoImage}
          alt="Kitchen Format Logo"
          width={80}
          height={80}
          style={{
            borderRadius: "12px",
            objectFit: "cover"
          }}
        />
        <CircularProgress color="primary" size={40} />
        <Typography variant="h6" sx={{ mt: 1, color: 'text.primary' }}>
          Caricamento...
        </Typography>
      </Backdrop>

      {/* Main App Content */}
      <Box sx={{ minHeight: "100vh", opacity: isLoading ? 0 : 1, transition: 'opacity 0.3s ease-in-out' }}>
        {/* Header */}
        <StyledAppBar position="sticky" elevation={0}>
        <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, md: 4 } }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, py: 2 }}>
            <Image
              src={logoImage}
              alt="Kitchen Format Logo"
              width={isMobile ? 48 : 64}
              height={isMobile ? 48 : 64}
              style={{
                borderRadius: "12px",
                objectFit: "cover"
              }}
            />
            <Typography
              variant={isMobile ? "h5" : "h3"}
              component="h1"
              sx={{ fontWeight: "bold" }}
            >
              Kitchen Format
            </Typography>
          </Box>
          
          {/* Desktop Navigation Tabs */}
          {!isMobile && (
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              textColor="primary"
              indicatorColor="primary"
            >
              {tabs.map((tab, index) => (
                <Tab
                  key={tab.id}
                  label={tab.label}
                  sx={{ 
                    minWidth: "auto", 
                    px: 3,
                    fontSize: "1.3rem",
                    fontWeight: 600
                  }}
                />
              ))}
            </Tabs>
          )}

          {/* Mobile Hamburger Menu */}
          {isMobile && (
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMobileMenuToggle}
              sx={{ color: 'text.primary' }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </StyledAppBar>

      {/* Mobile Drawer Menu */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={handleMobileMenuToggle}
        PaperProps={{
          sx: { 
            width: 280,
            backgroundColor: 'background.paper'
          }
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Menu
          </Typography>
          <IconButton onClick={handleMobileMenuToggle}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <List sx={{ pt: 0 }}>
          {tabs.map((tab, index) => (
            <ListItem key={tab.id} disablePadding>
              <ListItemButton
                selected={activeTab === index}
                onClick={() => handleTabChange(null, index)}
                sx={{
                  py: 2,
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    }
                  }
                }}
              >
                <ListItemText 
                  primary={tab.label}
                  primaryTypographyProps={{
                    fontSize: '1.1rem',
                    fontWeight: activeTab === index ? 'bold' : 'normal'
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Divider */}
      <StyledDivider />

      {/* Content */}
      {/* Main Content Container */}
        <Container 
          maxWidth="lg" 
          sx={{ 
            mt: 4, 
            mb: 4,
            px: { xs: 1, sm: 3 }
          }}
        >
        <ContentCard elevation={1} sx={{ borderRadius: { xs: 1, md: 2 } }}>
          {renderTabContent()}
        </ContentCard>
      </Container>
      </Box>
    </>
  );
}
