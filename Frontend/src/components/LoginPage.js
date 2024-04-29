import React, { useState } from 'react';
import { Box, Typography, TextField, Checkbox, FormControlLabel, Button, Link, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Perform login logic here
    if (username && password) {
      // Login successful, redirect to AppBar page
      navigate('/appbar');
    } else {
      // Handle empty fields error
      alert('Please fill in all fields');
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Container maxWidth="sm">
        <Box sx={{ border: '1px solid grey', padding: 4, borderRadius: 2 }}>
          <Typography variant="h5" component="div" gutterBottom>
            Login
          </Typography>
          <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label="Remember me"
            />
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Link href="#" variant="body2" color="primary">
                Forgot password?
              </Link>
              <Button variant="contained" color="primary" type="submit">
                Login
              </Button>
            </Box>
            <Typography variant="body2" align="center">
              Don't have an account? <Link href="/signup" color="primary">Sign Up</Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;