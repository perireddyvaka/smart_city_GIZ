// DivisionHeadPage.jsx
import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AlarmIcon from '@mui/icons-material/Alarm';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

const DivisionHeadPage = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleUserClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    // Redirect to the login page
    navigate('/login');
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          {/* Logo Image */}
          <img src="/logo.png" alt="Logo" style={{ height: '40px' }} />

          {/* Title */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginLeft: 2 }}>
            DivisionHead Dashboard
          </Typography>

          {/* IconButtons */}
          <IconButton color="inherit">
            <AlarmIcon />
          </IconButton>
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
          <IconButton color="inherit" onClick={handleUserClick}>
            <AccountCircleIcon />
          </IconButton>

          {/* User Management Popup */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <iframe
        src="https://your-tableau-server.com/views/YourDashboard/DivisionHeadDashboard"
        title="Tableau Dashboard"
        style={{
          width: '100%',
          height: 'calc(100vh - 64px)', // Adjust the height as needed
          border: 'none',
        }}
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
};

export default DivisionHeadPage;