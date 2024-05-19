import React from 'react';
import AppBarComponent from './AppBar';
import { Box, Container } from '@mui/material';

const Subdivsionhead = () => {
  return (
    <div>
      <AppBarComponent />
      <Container maxWidth={false} disableGutters sx={{ height: '100vh' }}>
        <Box
          sx={{
            border: '1px solid #ccc',
            borderRadius: 2,
            boxShadow: 2,
            height: '100%',
            marginTop: '-60px',
          }}
        > 
          <iframe
            src="https://your-tableau-server.com/views/YourDashboard/OrganizationHeadDashboard
                // &:showVizHome=no
                &embed=true
                &:toolbar=no
                &:showShareOptions=no
                "
                  
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
            title="Tableau Dashboard">
              </iframe>
        </Box>
      </Container>
    </div>
  );
};

export default Subdivsionhead;