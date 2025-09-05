"use client";

import { useState } from "react";
import Image from "next/image";
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
} from "@mui/material";
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

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
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
    <Box sx={{ minHeight: "100vh" }}>
      {/* Header */}
      <StyledAppBar position="sticky" elevation={0}>
        <Toolbar sx={{ justifyContent: "space-between", px: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, py: 2 }}>
            <Image
              src="/mystic.webp"
              alt="Kitchen Format Logo"
              width={64}
              height={64}
              style={{
                borderRadius: "12px",
                objectFit: "cover"
              }}
            />
            <Typography
              variant="h3"
              component="h1"
              sx={{ fontWeight: "bold" }}
            >
              Kitchen Format
            </Typography>
          </Box>
          
          {/* Navigation Tabs */}
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
        </Toolbar>
      </StyledAppBar>

      {/* Divider */}
      <StyledDivider />

      {/* Content */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <ContentCard elevation={1}>
          {renderTabContent()}
        </ContentCard>
      </Container>
    </Box>
  );
}
