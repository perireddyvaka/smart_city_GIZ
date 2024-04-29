import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from './logos.png'; // Replace with your actual logo file path

const WelcomePage = () => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <AppBar position="static" color="primary">
        <Toolbar>
          <Box display="flex" alignItems="center" mr={2}>
            <img src={logo} alt="Logo" height="40" />
          </Box>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            My Web App
          </Typography>
          <Button color="inherit" variant="outlined" component={Link} to="/login">
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h4" component="div" align="center" gutterBottom>
          Welcome to My Web App
        </Typography>
      </Container>
    </Box>
  );
};

export default WelcomePage;