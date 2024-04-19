import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useState } from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

// import logos

import IIITHLogo from '../assets/images/iiithlogo.png';
import SCRCLogo from '../assets/images/scrclogo.png';
import MainListItems from './listItems';

// auth Service
import { useAuth } from '../contexts/AuthContext';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9)
        }
      })
    }
  })
);

const MainContent = styled('main')(({ theme }) => ({
  flexGrow: 1,
  height: '100vh',
  overflow: 'auto',
  paddingTop: theme.spacing(8),
  paddingLeft: theme.spacing(9),
  paddingRight: theme.spacing(2)
}));

export default function TopBar({ children }) {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
            display: 'flex',
            alignItems: 'center'
          }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' })
            }}>
            <MenuIcon />
          </IconButton>
          <img
            src={IIITHLogo}
            style={{
              width: '100px',
              // add no warp to prevent text from wrapping
              whiteSpace: 'wrap'
            }}
            alt="IIIT Hyderabad"
          />
          <img
            src={SCRCLogo}
            style={{ width: '100px', whiteSpace: 'wrap' }}
            alt="Smart City Research Center"
          />
          <Typography
            component="h1"
            variant="h4"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1, textAlign: 'center', paddingRight: '100px' }}>
            BYPL DASHBOARD
          </Typography>
          {isLoggedIn ? (
            <IconButton color="inherit">
              <Badge color="secondary">
                <AccountCircle />
              </Badge>
            </IconButton>
          ) : (
            <Button
              onClick={() => {
                navigate('/login');
              }}
              color="inherit">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1]
          }}>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          <MainListItems />
          {/* <Divider sx={{ my: 1 }} />
          {secondaryListItems} */}
        </List>
      </Drawer>
      <MainContent>{children}</MainContent>
      <Toolbar />
    </Box>
  );
}
