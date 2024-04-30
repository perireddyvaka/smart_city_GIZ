// SignupPage.js
import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Container, Link, Grid } from '@mui/material';
import ExistingUsersTable from './ExistingUsersTable';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showExistingUsers, setShowExistingUsers] = useState(false);

  const users = [
    {
      userId: 'A12345',
      username: 'john_doe',
      email: 'john@example.com',
      role: 'Admin',
      password: '******',
    },
    {
      userId: 'M67890',
      username: 'jane_smith',
      email: 'jane@example.com',
      role: 'Manager',
      password: '******',
    },
    {
      userId: 'U54321',
      username: 'bob_johnson',
      email: 'bob@example.com',
      role: 'User',
      password: '******',
    },
    // Additional users...
  ];

  const handleSignup = (e) => {
    e.preventDefault();

    // Perform sign-up logic here
    if (password === confirmPassword && username && email && password) {
      // Sign-up successful, redirect to login page
      alert('Sign-up successful!');
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
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ border: '1px solid grey', borderRadius: '8px', p: '16px' }}>
              <Typography variant="h5" component="div" gutterBottom>
                Assign
              </Typography>
              <Box
                component="form"
                onSubmit={handleSignup}
                sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
              >
                <TextField
                  label="Username"
                  variant="outlined"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <TextField
                  label="Email"
                  type="email"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                <TextField
                  label="Confirm Password"
                  type="password"
                  variant="outlined"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <TextField
                  label="Role"
                  variant="outlined"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                />
                <Button variant="contained" color="primary" type="submit">
                  Assign
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            {showExistingUsers && (
              <>
                <Box textAlign="center" mb={2}>
                  <Link href="#" onClick={toggleExistingUsers} underline="hover">
                    Hide Existing Users
                  </Link>
                </Box>
                <ExistingUsersTable users={users} />
              </>
            )}
            {!showExistingUsers && (
              <Box textAlign="center">
                <Link href="#" onClick={toggleExistingUsers} underline="hover">
                  Show Existing Users
                </Link>
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SignupPage;
