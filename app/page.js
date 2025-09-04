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
import ForbiddenListContent from "./components/ForbiddenListContent";

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
  { id: "about", label: "About" },
  { id: "forbidden", label: "Forbidden/Limited list" }
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
        return <ForbiddenListContent />;
      default:
        return <AboutContent />;
    }
  };

  return (
    <Box sx={{ minHeight: "100vh" }}>
      {/* Header */}
      <StyledAppBar position="static" elevation={0}>
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: "space-between", px: 0 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Image
                src="/exiled.jpg"
                alt="Exiled Format Logo"
                width={64}
                height={64}
                style={{
                  borderRadius: "12px",
                  objectFit: "cover"
                }}
              />
              <Typography
                variant="h2"
                component="h1"
                sx={{ fontWeight: "bold" }}
              >
                Exiled Format
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
        </Container>
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
