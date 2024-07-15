import React, { useState, useRef, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Box, Button, Dialog, Container, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, useMediaQuery } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AlarmIcon from '@mui/icons-material/Alarm';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Analytics from '@mui/icons-material/Analytics';
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ReplayIcon from "@mui/icons-material/Replay";
import { useTheme } from '@mui/material/styles';
import logo from './logos.png';
// import backgroundImg from './BYPLimage.jpg'; // import your background image here

const Admin = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [sessionTimeoutAlert, setSessionTimeoutAlert] = useState(false);
  const navigate = useNavigate();
  const sessionTimer = useRef(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const startSessionTimer = () => {
      const sessionDuration = 500000; // 5 seconds for testing, adjust as needed
      return setTimeout(() => {
        setSessionTimeoutAlert(true);
      }, sessionDuration);
    };

    const resetTimer = () => {
      clearTimeout(sessionTimer.current);
      sessionTimer.current = startSessionTimer();
    };

    sessionTimer.current = startSessionTimer();

    document.addEventListener("mousemove", resetTimer);
    document.addEventListener("keypress", resetTimer);

    return () => {
      clearTimeout(sessionTimer.current);
      document.removeEventListener("mousemove", resetTimer);
      document.removeEventListener("keypress", resetTimer);
    };
  }, []);

  const handleSessionTimeoutAlertClose = () => {
    setSessionTimeoutAlert(false);
    navigate("/login");
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

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

  const styles = {
    appBar: {
      backgroundColor: '#002e41', // Material-UI primary color
      zIndex: 1201, // Ensure AppBar is above other elements
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    logo: {
      height: theme.spacing(isMobile ? 6 : 6),
      width: '12vw',
      marginRight: theme.spacing(2), // Add some spacing between the logo and title
    },
    title: {
      flexGrow: 1,
      textAlign: 'center',
      color: '#fff', // Set text color to white for better visibility
    },
    button: {
      color: '#fff', // Set text color to white for better visibility
      marginLeft: theme.spacing(1), // Add some spacing between the buttons
      textDecoration: 'none', // Remove underline from the link
    },
    container: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center', // Center the text
      padding: theme.spacing(4), // Add some padding for spacing
    },
    drawer: {
      width: isMobile ? '75vw' : '250px',
      flexShrink: 0,
    },
    drawerPaper: {
      width: isMobile ? '75vw' : '250px',
      marginTop: theme.spacing(8), // Adjust to make space for the app bar
    },
    body: {
      // backgroundImage: `url(${backgroundImg})`,
      backgroundColor: '#F5F5F5',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    sessionTimeoutDialog: {
      width: "60vw",
      padding: theme.spacing(2),
      backgroundColor: "#f3e5f5", // Light purple background color
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    errorIcon: {
      fontSize: theme.spacing(10), // Increased icon size
      color: "#c51162", // Attractive red color
      marginBottom: theme.spacing(3),
    },
    sessionTimeoutText: {
      marginBottom: theme.spacing(2),
      fontWeight: "bold", // Bold text for better visibility
    },
    loginAgainText: {
      display: "flex",
      alignItems: "center",
      marginBottom: theme.spacing(3), // Increased bottom margin for better spacing
      fontSize: theme.spacing(2), // Increased font size for better readability
    },
    loginAgainIcon: {
      marginRight: theme.spacing(1),
    },
  };

  return (
    <Box style={styles.body}>
      <AppBar position="fixed" style={styles.appBar}>
        <Toolbar style={styles.toolbar}>
          <IconButton color="inherit" onClick={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
          <img src={logo} alt="Logo" style={styles.logo} onClick={() => navigate(-1)} />
          <Typography variant="h6" component="div" style={styles.title}>
            Admin Dashboard
          </Typography>
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
          <IconButton color="inherit">
            <AlarmIcon />
          </IconButton>
          <IconButton color="inherit" onClick={handleUserClick}>
            <AccountCircleIcon />
          </IconButton>
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
        sx={{ ...styles.drawer, ...styles.drawerPaper }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 1 }}>
          <IconButton color="inherit" onClick={handleDrawerClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          <ListItem button component={Link} to="/analytical">
            <ListItemIcon>
              <Analytics />
            </ListItemIcon>
            <ListItemText primary="Analytical view" />
          </ListItem>
          {/* <ListItem button component={Link} to="/alarmlog">
            <ListItemIcon>
              <AlarmIcon />
            </ListItemIcon>
            <ListItemText primary="Alarmlog" />
          </ListItem>
          <ListItem button component={Link} to="/logstore">
            <ListItemIcon>
              <Description />
            </ListItemIcon>
            <ListItemText primary="Logstore" />
          </ListItem> */}
          <ListItem button component={Link} to="/Assign">
            <ListItemIcon>
              <PersonAddAltIcon />
            </ListItemIcon>
            <ListItemText primary="Assign" />
          </ListItem>
        </List>
      </Drawer>
      <Container maxWidth="md" style={styles.container}>
        <Typography variant="h4" component="div" gutterBottom>
          Welcome to the Admin Dashboard
        </Typography>
      </Container>

      <Dialog
        open={sessionTimeoutAlert}
        onClose={handleSessionTimeoutAlertClose}
        PaperProps={{
          style: styles.sessionTimeoutDialog,
        }}
      >
        <ErrorOutlineIcon style={styles.errorIcon} />
        <Typography variant="h5" gutterBottom style={styles.sessionTimeoutText}>
          Oops!
        </Typography>
        <Typography variant="body1" gutterBottom style={styles.sessionTimeoutText}>
          Your session is expired.
        </Typography>
        <Box style={styles.loginAgainText}>
          <ReplayIcon style={styles.loginAgainIcon} />
          <Typography variant="body1">Please kindly login again</Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSessionTimeoutAlertClose}
          autoFocus
        >
          OK
        </Button>
      </Dialog>
    </Box>
  );
};

export default Admin;
