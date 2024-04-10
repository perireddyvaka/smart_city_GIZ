import React, { useEffect, useState } from 'react';
import { useTheme, useMediaQuery, makeStyles, Hidden, Drawer, IconButton, Divider } from '@material-ui/core';
import { AppBar, Toolbar, Typography, List, ListItem, ListItemIcon, ListItemText, Badge, Menu, MenuItem } from '@material-ui/core';
import { Dashboard as DashboardIcon, Add as AddIcon, Menu as MenuIcon, NotificationsActive as NotificationsIcon, Alarm as AlarmIcon, Person as PersonIcon, ArrowDropDown as ArrowDropDownIcon, ChevronLeft as ChevronLeftIcon } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import yourImage from './logos.png';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: '#155F82',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${240}px)`,
    marginLeft: 240,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(0, 2),
  },
  logo: {
    height: '50px',
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  dropdownButton: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    padding: theme.spacing(0.5, 2),
    borderRadius: '20px',
    backgroundColor: 'transparent',
    marginRight: theme.spacing(1),
    border: '1px solid transparent',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  dropdownMenu: {
    marginTop: theme.spacing(1),
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  listItem: {
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
}));

const CustomAppBar = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [ncount, setNcount] = useState(0);
  const [acount, setAcount] = useState(0);
  const [issue, setIssue] = useState([]);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [dropdownAnchorEl, setDropdownAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState('DTR');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleNotificationOpen = async (event) => {
    setNotificationAnchorEl(event.currentTarget);
    await fetch('http://127.0.0.1:8000/alarm/notidata', { method: 'GET' })
      .then((response) => response.json())
      .then((data) => {
        setIssue(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleDropdownOpen = (event) => {
    setDropdownAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = (option) => {
    setSelectedOption(option);
    setDropdownAnchorEl(null);
  };

  const handlelogchange = (id) => {
    console.log(id);
  };

  useEffect(() => {
    fetch('http://127.0.0.1:8000/alarm/ncount', { method: 'GET' })
      .then((response) => response.json())
      .then((data) => {
        setNcount(data[0]);
      })
      .catch((err) => {
        console.log(err.message);
      });

    fetch('http://127.0.0.1:8000/alarm/acount', { method: 'GET' })
      .then((response) => response.json())
      .then((data) => {
        setAcount(data[0]);
      })
      .catch((err) => {
        console.log(err.message);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        className={`${classes.appBar} ${drawerOpen && classes.appBarShift}`}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            edge="start"
            className={drawerOpen ? '' : classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Hidden xsDown>
            <img src={yourImage} alt="Your company logo" className={classes.logo} />
          </Hidden>
          <Typography variant="h6" className={classes.title}>
            SUBDIVISIONHEAD DASHBOARD
            <div className={classes.dropdownButton} onClick={handleDropdownOpen}>
              {selectedOption}
              <ArrowDropDownIcon />
            </div>
            <Menu
              className={classes.dropdownMenu}
              anchorEl={dropdownAnchorEl}
              keepMounted
              open={Boolean(dropdownAnchorEl)}
              onClose={() => handleDropdownClose(selectedOption)}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center', // Aligning the dropdown menu to the center
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <MenuItem onClick={() => handleDropdownClose('DTR')}>DTR</MenuItem>
              <MenuItem onClick={() => handleDropdownClose('ACB')}>ACB</MenuItem>
            </Menu>
          </Typography>
          <div className={classes.dropdownButton} onClick={handleNotificationOpen}>
            <Badge badgeContent={ncount.count} color="secondary">
              <NotificationsIcon />
            </Badge>
          </div>
          <Menu
            anchorEl={notificationAnchorEl}
            keepMounted
            open={Boolean(notificationAnchorEl)}
            onClose={handleNotificationClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            {issue.map((item, index) => (
              <MenuItem key={index} onClick={() => handlelogchange(item['id'])}>
                <Typography variant="body1">
                  <br />
                  Status:- {item['status']}
                  <br />
                  Occurrence:- {item['occurrence']}
                  <br />
                  Location:- {item['location']}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
          <IconButton component={Link} to="/Alarmlog" color="inherit">
            <Badge badgeContent={acount.count} color="error">
              <AlarmIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <PersonIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant={isSmallScreen ? 'temporary' : 'persistent'}
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <Link to="/analytical-view" onClick={toggleDrawer} className={classes.listItem}>
            <ListItem button>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Analytical View" />
            </ListItem>
          </Link>
          <Link to="/user-management" onClick={toggleDrawer} className={classes.listItem}>
            <ListItem button>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="User Management" />
            </ListItem>
          </Link>
          <Link to="/AlarmLogPage" onClick={toggleDrawer} className={classes.listItem}>
            <ListItem button>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Add Alarm" />
            </ListItem>
          </Link>
        </List>
      </Drawer>
    </div>
  );
};

export default CustomAppBar;
