import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AlarmIcon from '@mui/icons-material/Alarm';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close'; // Close icon for sidebar
import { Analytics, Description } from '@mui/icons-material'; // Importing icons from Material-UI
import { useNavigate } from 'react-router-dom';
import logo from './logos.png';

const styles = {
  appBar: {
    backgroundColor: '#002e41',
  },
  drawer: {
    width: 250,
  },
  logo: {
    height: '40px',
    marginRight: '10px',
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
  },
  closeIcon: {
    marginLeft: 'auto', // Align close icon to the right
  },
  iframeContainer: {
    width: '100%',
    height: 'calc(100vh - 64px)', // Adjust height based on AppBar height
    border: 'none',
  },
};

const DivisionHeadPage = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleUserClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    navigate('/login');
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleNavigate = (path) => {
    navigate(path);
    handleDrawerClose();
  };

  return (
    <div>
      <AppBar position="static" style={styles.appBar}>
        <Toolbar>
          <IconButton color="inherit" onClick={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
          <img src={logo} alt="Logo" style={styles.logo} />
          <Typography variant="h6" component="div" sx={styles.title}>
            DivisionHead Dashboard
          </Typography>
          <IconButton color="inherit">
            <AlarmIcon />
          </IconButton>
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
          <IconButton color="inherit" onClick={handleUserClick}>
            <AccountCircleIcon />
          </IconButton>
          {drawerOpen && (
            <IconButton color="inherit" onClick={handleDrawerClose} style={styles.closeIcon}>
              <CloseIcon />
            </IconButton>
          )}
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

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerClose}
        sx={{ width: styles.drawer }}
      >
        <List>
          <ListItem button onClick={() => handleNavigate('/analytical')}>
            <ListItemIcon>
              <Analytics />
            </ListItemIcon>
            <ListItemText primary="Analytical View" />
          </ListItem>
          <ListItem button onClick={() => handleNavigate('/Alarmlog')}>
            <ListItemIcon>
              <AlarmIcon />
            </ListItemIcon>
            <ListItemText primary="Alarm Logs" />
          </ListItem>
          <ListItem button onClick={() => handleNavigate('/LogStore')}>
            <ListItemIcon>
              <Description />
            </ListItemIcon>
            <ListItemText primary="Log Store" />
          </ListItem>
        </List>
      </Drawer>

      <iframe
        src="https://your-tableau-server.com/views/YourDashboard/DivisionHeadDashboard"
        title="Tableau Dashboard"
        style={styles.iframeContainer}
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
};

export default DivisionHeadPage;
