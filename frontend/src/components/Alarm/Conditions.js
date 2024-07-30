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
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useNavigate } from 'react-router-dom';
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
    justifyContent: "left",
    display: "flex",
    width: "20vw",
    position: "absolute",
    bottom: "1vw",
    left: "1vw",
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
  const [parameter, setParameter] = useState('');
  const [phase, setPhase] = useState('');
  const [items, setItems] = useState([]);
  const [rangeMin, setRangeMin] = useState('');
  const [rangeMax, setRangeMax] = useState('');
  const [parameterUnits, setParameterUnits] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${config.backendAPI}/conditions`);
        const data = await response.json();
        setConditions(data);
        setItems(data);
        setTotalPages(Math.ceil(data.length / perPage));
      } catch (error) {
        console.error('There was an error fetching the data!', error);
      }
    };

    fetchData();
  }, []);

  const handleUpdateCondition = (index) => {
    const condition = conditions[index];
    setSelectedCondition(index);
    setParameter(condition.parameter);
    setPhase(condition.phase);
    setRangeMin(condition.range_min);
    setRangeMax(condition.range_max);
    setParameterUnits(condition.parameter_units);
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
    if (selectedCondition !== null) {
      const updatedCondition = {
        id: conditions[selectedCondition].id,
        parameter: parameter,
        phase: phase,
        range_min: rangeMin,
        range_max: rangeMax,
        parameter_units: parameterUnits,
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
          {Array.isArray(conditions) && conditions.length > 0 ? (
            conditions
              .slice((currentPage - 1) * perPage, currentPage * perPage)
              .map((item, index) => (
                <TableRow key={index}>
                  <TableCell className={classes.tableCell} style={{ color: 'white' }}>{(currentPage - 1) * perPage + index + 1}</TableCell>
                  <TableCell className={classes.tableCell} style={{ color: 'white' }}>{item.parameter}</TableCell>
                  <TableCell className={classes.tableCell} style={{ color: 'white' }}>{item.phase}</TableCell>
                  <TableCell className={classes.tableCell} style={{ color: 'white' }}>{item.range_max}</TableCell>
                  <TableCell className={classes.tableCell} style={{ color: 'white' }}>{item.range_min}</TableCell>
                  <TableCell className={classes.tableCell} style={{ color: 'white' }}>{item.parameter_units}</TableCell>
                  <TableCell className={classes.tableCell} style={{ color: 'white' }}>
                    <Button
                      onClick={() => handleUpdateCondition((currentPage - 1) * perPage + index)}
                      style={{ color: '#1A84D3' }}
                    >
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))
          ) : (
            <TableRow>
              
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div 
        style={{
            marginTop:"0.2vw",
            width: '2vw'
            }}>
        {currentPage > 1 && (
          <Button
            className={classes.previousbutton}
            variant="contained"
            color="primary"
            onClick={handlePrevPage}
          >
            Previous
          </Button>
        )}
        {items.length > currentPage * perPage && (
          <Button
            className={classes.optionContainer}
            variant="contained"
            color="primary"
            onClick={handleNextPage}
          >
            Next
          </Button>
        )}
         </div>
        <Typography style={{width: '10vw', left: '90vw', bottom: '0vw', position: 'relative'}}
        className={ classes.pagination}>
          Page {currentPage} of {totalPages}
        </Typography>
     
        

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Condition</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Parameter"
            type="text"
            fullWidth
            value={parameter}
            onChange={(e) => setParameter(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Phase"
            type="text"
            fullWidth
            value={phase}
            onChange={(e) => setPhase(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Max Range"
            type="text"
            fullWidth
            value={rangeMax}
            onChange={(e) => setRangeMax(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Min Range"
            type="text"
            fullWidth
            value={rangeMin}
            onChange={(e) => setRangeMin(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Parameter Units"
            type="text"
            fullWidth
            value={parameterUnits}
            onChange={(e) => setParameterUnits(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveChanges} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default App;
