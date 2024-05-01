import React, { useState } from 'react';
import { AppBar, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';


import logo from './logos.png';
import {
  Box,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Container,
  Modal,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

// Assuming existingUsers is an array of user objects with email property
const existingUsers = [
  { username: 'user1', email: 'user1@example.com', password: 'password1' },
  { username: 'user2', email: 'user2@example.com', password: 'password2' },
  { username: 'user3', email: 'user3@example.com', password: 'password3' },
];

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
    display: 'flex',
    flexDirection: 'column', // Stack content vertically
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 'calc(100vh - 64px)', // Account for AppBar height
  },
  loginForm: {
    border: '1px solid grey',
    padding: 6,
    borderRadius: 3,
    width: '500px', // Adjust width as desired
    backgroundColor: '#fff', // Ensure background color for better contrast
  },
  loginFormItem: {
    marginBottom: 25, // Add spacing between elements
  },
  forgotPasswordLink: {
    textAlign: 'right',
    color: '#002e41', // Match primary color for better visibility
    marginBottom: 10,
    cursor: 'pointer',
  },
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalCloseButton: {
    cursor: 'pointer',
  },
};

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [openForgotPasswordModal, setOpenForgotPasswordModal] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Perform login logic here
    if (username && password) {
      // Login successful, redirect to appropriate page
      navigate('/subdivisionhead');
    } else {
      // Handle empty fields error
      alert('Please fill in all fields');
    }
  };

  const handleForgotPassword = () => {
    setOpenForgotPasswordModal(true);
  };

  const handleForgotPasswordModalClose = () => {
    setOpenForgotPasswordModal(false);
    setForgotPasswordEmail('');
  };

  const handleForgotPasswordSubmit = () => {
    // Check if the email exists in the existing users data
    const existingUser = existingUsers.find(
      (user) => user.email.toLowerCase() === forgotPasswordEmail.toLowerCase
    );

    if (existingUser) {
      // Email exists, generate reset password link (for demonstration purposes, not actual implementation)
      const resetPasswordLink = `https://yourapp.com/reset-password?email=${existingUser.email}`;
      alert(`Reset password link sent to ${existingUser.email}: ${resetPasswordLink}`);
      handleForgotPasswordModalClose();
    } else {
      alert('Email not found');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static" style={styles.appBar}>
        <Toolbar style={styles.toolbar}>
          <Box display="flex" alignItems="center">
            <img src={logo} alt="Logo" style={styles.logo} />
          </Box>
          <Typography variant="h6" component="div" style={styles.title}>
            BYPL Dashboard
          </Typography>
          <Box>
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
      <Container maxWidth="sm" style={styles.container}>
        <Box sx={styles.loginForm}>
          <Typography variant="h5" component="div" gutterBottom>
            Login
          </Typography>
          <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={styles.loginFormItem}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.loginFormItem}
            />
            <FormControlLabel control={<Checkbox color="primary" />} label="Remember me" />
            <Link href="#" variant="body2" color="primary" underline="none" style={styles.forgotPasswordLink} onClick={handleForgotPassword}>
              Forgot password?
            </Link>
            <Button variant="contained" color="primary" type="submit">
              Login
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Forgot Password Modal */}
      <Modal open={openForgotPasswordModal} onClose={handleForgotPasswordModalClose}>
        <Box sx={styles.modal}>
          <Box sx={styles.modalHeader}>
            <Typography variant="h6" gutterBottom>
              Forgot Password
            </Typography>
            <IconButton onClick={handleForgotPasswordModalClose} sx={styles.modalCloseButton}>
              <CloseIcon />
            </IconButton>
          </Box>
          <TextField
            label="Email"
            variant="outlined"
            value={forgotPasswordEmail}
            onChange={(e) => setForgotPasswordEmail(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleForgotPasswordSubmit} fullWidth>
            Submit
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default LoginPage;