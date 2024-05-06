import React, { useEffect, useState } from 'react';
import { useTheme, useMediaQuery, makeStyles, Hidden, Drawer, IconButton, Divider, Badge, Menu, MenuItem, Card, CardContent, Typography, Button, Popover } from '@material-ui/core';
import { AppBar, Toolbar, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Dashboard as DashboardIcon, Add as AddIcon, Menu as MenuIcon, NotificationsActive as NotificationsIcon, Alarm as AlarmIcon, Person as PersonIcon, ArrowDropDown as ArrowDropDownIcon, ChevronLeft as ChevronLeftIcon, History as HistoryIcon } from '@material-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { MdLocalGroceryStore } from "react-icons/md";
import yourImage from './logos.png';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    backgroundColor: '#155F82',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
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
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#fff',
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
  notificationCard: {
    marginBottom: theme.spacing(1),
  },
  notificationCardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  markAsReadButton: {
    backgroundColor: '#FF8000', // Bright orange color
    color: '#fff',
    '&:hover': {
      backgroundColor: '#FFA500', // Lighter shade of orange on hover
    },
    fontSize: '0.7rem', // Decrease font size
    padding: theme.spacing(0.2, 1), // Decrease padding
    minWidth: 'unset', // Remove minimum width
    height: 'unset', // Remove height
    borderRadius: '10px', // Adjust border radius
  },
  popover: {
    padding: theme.spacing(2),
  },
}));

const CustomAppBar = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState(null);
  const [ncount, setNcount] = useState(0);
  const [acount, setAcount] = useState(0);
  const [issue, setIssue] = useState([]);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [dropdownAnchorEl, setDropdownAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState('DTR');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [closedNotifications, setClosedNotifications] = useState([]);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleUserClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationOpen = async (event) => {
    setNotificationAnchorEl(event.currentTarget);
    try {
      const response = await fetch('http://127.0.0.1:8000/alarm/notidata');
      const data = await response.json();
      setIssue(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    navigate('/login');
  };

  const markAsRead = (id) => {
    const closedNotification = issue.find(item => item.id === id);
    setClosedNotifications(prevNotifications => [...prevNotifications, closedNotification]);
    localStorage.setItem(`notification_${id}`, JSON.stringify(closedNotification));
    setIssue(prevIssue => prevIssue.filter(item => item.id !== id));
    console.log(`Notification ${id} marked as read`);
  };

  const handleDropdownOpen = (event) => {
    setDropdownAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = (option) => {
    setSelectedOption(option);
    setDropdownAnchorEl(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ncountResponse = await fetch('http://127.0.0.1:8000/alarm/ncount');
        const ncountData = await ncountResponse.json();
        setNcount(ncountData[0]);

        const acountResponse = await fetch('http://127.0.0.1:8000/alarm/acount');
        const acountData = await acountResponse.json();
        setAcount(acountData[0]);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
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
            SubdivisionHead Dashboard
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
                horizontal: 'center',
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
          <div>
            <IconButton color="inherit" onClick={handleNotificationOpen}>
              <Badge badgeContent={ncount?.count || 0} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Popover
              open={Boolean(notificationAnchorEl)}
              anchorEl={notificationAnchorEl}
              onClose={handleNotificationClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <div className={classes.popover}>
                {issue.map((item, index) => (
                  <Card key={index} className={classes.notificationCard}>
                    <CardContent className={classes.notificationCardContent}>
                      <div>
                        <Typography variant="h6">{item.title}</Typography>
                        <Typography variant="body1">Status: {item.status}</Typography>
                        <Typography variant="body1">Occurrence: {item.occurrence}</Typography>
                        <Typography variant="body1">Location: {item.location}</Typography>
                      </div>
                      <Button className={classes.markAsReadButton} onClick={() => markAsRead(item.id)}>Mark as Read</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </Popover>
          </div>
          <IconButton component={Link} to="/Alarmlog" color="inherit">
            <Badge badgeContent={acount?.count || 0} color="secondary">
              <AlarmIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit" onClick={handleUserClick}>
            <LogoutIcon />
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

      <Toolbar />

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
          <Link to="/history" onClick={toggleDrawer} className={classes.listItem}>
            <ListItem button>
              <ListItemIcon>
                <HistoryIcon />
              </ListItemIcon>
              <ListItemText primary="Notification History" />
            </ListItem>
          </Link>
          <Link to="/" onClick={toggleDrawer} className={classes.listItem}>
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
          <Link to="/LogStore" onClick={toggleDrawer} className={classes.listItem}>
            <ListItem button>
              <ListItemIcon>
                <MdLocalGroceryStore />
              </ListItemIcon>
              <ListItemText primary="Log Store" />
            </ListItem>
          </Link>
        </List>
      </Drawer>
    </div>
  );
};

export default CustomAppBar;
