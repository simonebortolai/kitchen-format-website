"use client";

import { useState } from "react";
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
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" }
];

const tabContent = {
  home: {
    title: "Welcome Home",
    content: "This is the home page content. Here you can find the latest updates and featured information about our website."
  },
  about: {
    title: "About Us",
    content: "Learn more about our company, our mission, and our team. We are dedicated to providing excellent service and innovative solutions."
  },
  services: {
    title: "Our Services",
    content: "Discover the range of services we offer. From web development to consulting, we have the expertise to help you achieve your goals."
  },
  contact: {
    title: "Contact Us",
    content: "Get in touch with us today. We'd love to hear from you and discuss how we can help with your next project."
  }
};

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const currentTabKey = tabs[activeTab].id;

  return (
    <Box sx={{ minHeight: "100vh" }}>
      {/* Header */}
      <StyledAppBar position="static" elevation={0}>
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: "space-between", px: 0 }}>
            <Typography
              variant="h6"
              component="h1"
              sx={{ fontWeight: "bold" }}
            >
              Exiled Format
            </Typography>
            
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
                  sx={{ minWidth: "auto", px: 2 }}
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
          <CardContent sx={{ p: 4, "&:last-child": { pb: 4 } }}>
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              sx={{ mb: 3 }}
            >
              {tabContent[currentTabKey].title}
            </Typography>
            
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ lineHeight: 1.7, mb: 4 }}
            >
              {tabContent[currentTabKey].content}
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
                      Featured Section
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      This content changes based on the selected tab: {currentTabKey}
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
                      Quick Actions
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
                        Learn More
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
                        Get Started
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        </ContentCard>
      </Container>
    </Box>
  );
}
