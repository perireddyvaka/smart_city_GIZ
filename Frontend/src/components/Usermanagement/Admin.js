import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from './logos.png';

const styles = {
  appBar: {
    backgroundColor: '#002e41', // Material-UI primary color
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    height: 40,
    marginRight: 16, // Add some spacing between the logo and title
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
    color: '#fff', // Set text color to white for better visibility
  },
  button: {
    color: '#fff', // Set text color to white for better visibility
    marginLeft: 16, // Add some spacing between the buttons
    textDecoration: 'none', // Remove underline from the link
  },
  container: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const Admin = () => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <AppBar position="static" style={styles.appBar}>
        <Toolbar style={styles.toolbar}>
          <Box display="flex" alignItems="center">
            <img src={logo} alt="Logo" style={styles.logo} />
          </Box>
          <Typography variant="h5" component="div" style={styles.title}>
            Admin Dashboard
          </Typography>
          <Box>
            <Button
              color="inherit"
              variant="text"
              component={Link}
              to="/login"
              style={styles.button}
            >
              Login
            </Button>
            <Button
              color="inherit"
              variant="text"
              component={Link}
              to="/Signup"
              style={styles.button}
            >
              Assign
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" style={styles.container}>
        <Typography variant="h4" component="div" align="center" gutterBottom>
          Welcome to Admin Dashboard
        </Typography>
      </Container>
    </Box>
  );
};

export default Admin;