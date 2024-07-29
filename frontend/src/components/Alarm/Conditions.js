import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import {  useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import config from '../../config';

const theme = createTheme();

const useStyles = makeStyles({
  root: {
    width: '96.5vw',
    backgroundColor: "black",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(3),
    position: "relative",
    overflow: "hidden",
  },
  container: {
    maxWidth: "41.6vw",
    position: "relative",
  },
  closeButtonText: {
    color: "#fff",
  },
  tableHeader: {
    fontWeight: "bold",
    color: "white",
    border: "1px solid #fff",
    backgroundColor: "black",
  },
  tableCell: {
    border: "1px solid #fff",
    color: "#fff",
    width: '25vw',
    backgroundColor: "black",
  },
  optionsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.spacing(0),
  },
  optionContainer: {
    display: "flex",
    width: "1vw",
    justifyContent: "space-between",
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(20),
    marginLeft: theme.spacing(-59),
    marginTop: "0.3vw"
  },
  previousButton: {
    display: "flex",
    maxWidth: "40vw",
    justifyContent: "space-between",
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(-40),
    marginTop: "0.5vw"
  },
  pagination: {
    color: "#fff",
    left: "55vw",
    justifyContent: "right",
    position: 'relative',
    display: "flex",
    width: "9vw",
    top: "-2vw"
  },
  appBar: {
    top: '0.01vw',
    border: "1px solid #fff",
    backgroundColor: "black",
    width: '98vw',
    position: '-webkit-sticky'
  },
  title: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing(1),
  },
  table: {
    width: "90vw",
    height: "9vw",
    margin: "-0vw",
  }
});

const perPage = 5;
const App = () => {
  const classes = useStyles();
  const [conditions, setConditions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCondition, setSelectedCondition] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${config.backendAPI}/conditions`);
        const data = await response.json();
        setConditions(data);
        setTotalPages(Math.ceil(data.length / perPage));
      } catch (error) {
        console.error('There was an error fetching the data!', error);
      }
    };

    fetchData();
  }, []);

  const handleUpdateCondition = (index) => {
    setSelectedCondition(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCondition(null);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleSaveChanges = async () => {
    const updatedCondition = {
      id: conditions[selectedCondition].id,
      parameter: document.getElementById('parameter').value,
      phase: document.getElementById('phase').value,
      range_min: document.getElementById('range_min').value,
      range_max: document.getElementById('range_max').value,
      parameter_units: document.getElementById('parameter_units').value,
    };

    try {
      const response = await fetch(`${config.backendAPI}/conditions/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCondition),
      });

      if (response.ok) {
        setConditions((prevConditions) => {
          const newConditions = [...prevConditions];
          newConditions[selectedCondition] = updatedCondition;
          return newConditions;
        });
        handleClose();
      } else {
        console.error('There was an error updating the condition!');
      }
    } catch (error) {
      console.error('There was an error updating the condition!', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="relative" className={classes.appBar} style={{
        backgroundColor: 'black',
        width: '99.5vw',
        height: '4vw',
        marginBottom: '1vw',
        marginTop: '0.5vw'
      }}>
        <Toolbar>
        <ArrowBackIcon
                style={{ cursor: 'pointer', marginRight: '0.5vw', width: '2vw' }} 
                onClick={() => navigate('/Alarmlog')} 
            />
          <Typography variant="h6" component="div" style={{ flexGrow: 1, textAlign: 'center', marginBottom: '0.6vw' }}>
            Alarm Conditions
          </Typography>
        </Toolbar>
      </AppBar>

      <Table className={classes.table} style={{
    backgroundColor: 'black',
    width: '99.5vw',
    height: '4vw',
    marginBottom: '1vw',
    marginTop: '0.5vw'
  }}>
    <TableHead>
      <TableRow>
        <TableCell className={classes.tableHeader} style={{ color: 'white' }}>Sl.No</TableCell>
        <TableCell className={classes.tableHeader} style={{ color: 'white' }}>Parameter</TableCell>
        <TableCell className={classes.tableHeader} style={{ color: 'white' }}>Phase</TableCell>
        <TableCell className={classes.tableHeader} style={{ color: 'white' }}>Max Range</TableCell>
        <TableCell className={classes.tableHeader} style={{ color: 'white' }}>Min Range</TableCell>
        <TableCell className={classes.tableHeader} style={{ color: 'white' }}>Parameter Units</TableCell>
        <TableCell className={classes.tableHeader} style={{ color: 'white' }}>Actions</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {conditions
        .slice((currentPage - 1) * perPage, currentPage * perPage)
        .map((item, index) => (
          <TableRow key={index}>
            <TableCell className={classes.tableCell} style={{ color: 'white' }}>{(currentPage - 1) * perPage + index + 1}</TableCell>
            <TableCell className={classes.tableCell} style={{ color: 'white' }}>{item.parameter}</TableCell>
            <TableCell className={classes.tableCell} style={{ color: 'white' }}>{item.phase}</TableCell>
            <TableCell className={classes.tableCell} style={{ color: 'white' }}>{item.range_max}</TableCell>
            <TableCell className={classes.tableCell} style={{ color: 'white' }}>{item.range_min}</TableCell>
            <TableCell className={classes.tableCell} style={{ color: 'white' }}>{item.parameter_units}</TableCell>
            <TableCell className={classes.tableCell}>
              <IconButton color="primary" onClick={() => handleUpdateCondition((currentPage - 1) * perPage + index)}>
                <EditIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
    </TableBody>
  </Table>


      <div className={classes.optionsContainer}>
        {currentPage > 1 && (
          <Button
            className={classes.previousButton}
            variant="contained"
            color="primary"
            onClick={handlePrevPage}
          >
            Previous
          </Button>
        )}
        {currentPage < totalPages && (
          <Button
            className={classes.optionContainer}
            variant="contained"
            color="primary"
            onClick={handleNextPage}
            style={{ backgroundColor: '#1976D2' }}
          >
            Next
          </Button>
        )}
      </div>
      <Typography
        className={classes.pagination} style={{ top: '0.2vw', left: '90vw' }}>
        Page {currentPage} of {totalPages}
      </Typography>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Condition</DialogTitle>
        <DialogContent>
          {selectedCondition !== null && (
            <>
              <TextField
                id="parameter"
                label="Parameter"
                defaultValue={conditions[selectedCondition]?.parameter}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="phase"
                label="Phase"
                defaultValue={conditions[selectedCondition]?.phase}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="range_min"
                label="Min Range"
                defaultValue={conditions[selectedCondition]?.range_min}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="range_max"
                label="Max Range"
                defaultValue={conditions[selectedCondition]?.range_max}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="parameter_units"
                label="Parameter Units"
                defaultValue={conditions[selectedCondition]?.parameter_units}
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
          <Button onClick={handleSaveChanges} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default App;
