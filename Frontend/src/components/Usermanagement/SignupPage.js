import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Container, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ExistingUsersTable from './ExistingUsersTable';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showExistingUsers, setShowExistingUsers] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    // Perform sign-up logic here
    if (password === confirmPassword && username && email && password) {
      // Sign-up successful, redirect to login page
      navigate('/login');
    } else {
      // Handle password mismatch or empty fields error
      alert('Please fill in all fields and ensure passwords match');
    }
  };

  const toggleExistingUsers = () => {
    setShowExistingUsers((prevState) => !prevState);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Container maxWidth="sm">
        <Box sx={{ border: '1px solid grey', padding: 4, borderRadius: 2 }}>
          <Typography variant="h5" component="div" gutterBottom>
            Assign
          </Typography>
          <Box component="form" onSubmit={handleSignup} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{ marginBottom: 1.5 }}
            />
            <TextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Role"
              variant="outlined"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              sx={{ marginBottom: 2 }}
            />
            <Button variant="contained" color="primary" type="submit" sx={{ marginBottom: 2 }}>
              Assign
            </Button>
            <Box textAlign="center">
              <Link href="#" onClick={toggleExistingUsers} underline="hover">
                {showExistingUsers ? 'Hide Existing Users' : 'Existing Users'}
              </Link>
            </Box>
          </Box>
          {showExistingUsers && <ExistingUsersTable />}
        </Box>
      </Container>
    </Box>
  );
};

export default SignupPage;