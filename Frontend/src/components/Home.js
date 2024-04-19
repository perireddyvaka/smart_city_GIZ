import React from 'react';
import { Typography, Container } from '@mui/material';
import { APP_NAME } from '../constants';

function Home() {
  return (
    <Container
      maxWidth="sm"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh' // Ensures the container covers the entire viewport height
      }}>
      <Typography
        variant="h2"
        align="center"
        color="textPrimary"
        gutterBottom
        style={{ whiteSpace: 'nowrap' }} // Display text in a single line
      >
        Welcome to {APP_NAME}
      </Typography>
    </Container>
  );
}

export default Home;
