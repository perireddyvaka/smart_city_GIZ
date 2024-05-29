import React, { useState, useRef, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ReplayIcon from '@mui/icons-material/Replay';
import { Box } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Logo from './logos.png';

const styles = {
  sessionTimeoutDialog: {
    width: '600px',
    padding: '48px',
    backgroundColor: '#f3e5f5', // Light purple background color
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  errorIcon: {
    fontSize: '96px', // Increased icon size
    color: '#c51162', // Attractive red color
    marginBottom: '24px',
  },
  sessionTimeoutText: {
    marginBottom: '16px',
    fontWeight: 'bold', // Bold text for better visibility
  },
  loginAgainText: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '32px', // Increased bottom margin for better spacing
    fontSize: '18px', // Increased font size for better readability
  },
  loginAgainIcon: {
    marginRight: '8px',
  },
};

const theme = createTheme();

const App = () => {
  const [conditions, setConditions] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [sessionTimeoutAlert, setSessionTimeoutAlert] = useState(false);
  const navigate = useNavigate();
  const sessionTimer = useRef(null);

  useEffect(() => {
    // Fetch conditions from backend
    axios
      .get('http://127.0.0.1:8000/conditions') // Replace with your actual backend endpoint
      .then((response) => {
        setConditions(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the data!', error);
      });

    const startSessionTimer = () => {
      const sessionDuration = 1 * 24 * 60 * 60 * 1000; // 1 day for testing, adjust as needed
      return setTimeout(() => {
        setSessionTimeoutAlert(true);
      }, sessionDuration);
    };

    const resetTimer = () => {
      clearTimeout(sessionTimer.current);
      sessionTimer.current = startSessionTimer();
    };

    sessionTimer.current = startSessionTimer();

    document.addEventListener('mousemove', resetTimer);
    document.addEventListener('keypress', resetTimer);

    return () => {
      clearTimeout(sessionTimer.current);
      document.removeEventListener('mousemove', resetTimer);
      document.removeEventListener('keypress', resetTimer);
    };
  }, []);

  const handleSessionTimeoutAlertClose = () => {
    setSessionTimeoutAlert(false);
    navigate('/login');
  };

  const handleUpdateCondition = (index) => {
    setSelectedCondition(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCondition(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" style={{ backgroundColor: '#002e41' }}>
        <Toolbar>
          <img
            src={Logo}
            alt="Logo"
            style={{ marginRight: theme.spacing(2), width: 110, height: 50 }}
            onClick={() => navigate(-1)}
          />
          <Typography variant="h6" component="div" style={{ flexGrow: 1, textAlign: 'center' }}>
            Alarm Conditions
          </Typography>
        </Toolbar>
      </AppBar>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f2f2f2' }}>Parameter</TableCell>
              <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f2f2f2' }}>Phase</TableCell>
              <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f2f2f2' }}>Min Range</TableCell>
              <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f2f2f2' }}>Max Range</TableCell>
              <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f2f2f2' }}>Parameter Units</TableCell>
              <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f2f2f2' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {conditions.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.parameter}</TableCell>
                <TableCell>{row.phase}</TableCell>
                <TableCell>{row.minRange}</TableCell>
                <TableCell>{row.maxRange}</TableCell>
                <TableCell>{row.units}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleUpdateCondition(index)}>
                    <EditIcon />
                  </IconButton>
                  </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Condition</DialogTitle>
        <DialogContent>
          {selectedCondition !== null && (
            <>
              <TextField
                label="Parameter"
                defaultValue={conditions[selectedCondition]?.parameter}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="Phase"
                defaultValue={conditions[selectedCondition]?.phase}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="Min Range"
                defaultValue={conditions[selectedCondition]?.minRange}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="Max Range"
                defaultValue={conditions[selectedCondition]?.maxRange}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="Parameter Units"
                defaultValue={conditions[selectedCondition]?.units}
                fullWidth
                margin="normal"
                variant="outlined"
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={handleClose} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

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
          Your session has expired.
        </Typography>
        <Box style={styles.loginAgainText}>
          <ReplayIcon style={styles.loginAgainIcon} />
          <Typography variant="body1">Please log in again</Typography>
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
    </ThemeProvider>
  );
};

export default App;

