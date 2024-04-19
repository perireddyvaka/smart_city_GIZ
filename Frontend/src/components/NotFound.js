import React from 'react';
import { Typography, Container, Button, TextField } from '@mui/material';
// import { APP_NAME } from '../constants';
import './Signup.css'; // Import the CSS file

function SignUp() {
  return (
    <Container className="container" maxWidth="sm">
      <Typography variant="h3" align="center" color="textPrimary" gutterBottom>
        Sign Up
      </Typography>
      <Typography variant="h6" align="center" color="textSecondary" paragraph>
        Create an account to get started.
      </Typography>
      <form className="form">
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          className="textfield"
          fullWidth
          autoFocus
          required
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          className="textfield"
          type="password"
          fullWidth
          required
        />
        <TextField
          id="Role"
          label="Role"
          variant="outlined"
          className="textfield"
          type="password"
          fullWidth
          required
        />
        <Button variant="contained" color="primary" type="submit" className="button" fullWidth>
          Sign Up
        </Button>
      </form>
      <Typography variant="body2" className="link" align="center">
        Already have an account? <a href="/login">Login</a>
      </Typography>
    </Container>
  );
}

export default SignUp;
