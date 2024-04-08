import React, { useState } from 'react';
import { Typography, makeStyles, Button, Dialog, DialogTitle, DialogContent, TextField } from '@material-ui/core';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f0f0',
    padding: theme.spacing(4),
  },
  categoryContainer: {
    width: '100%',
    maxWidth: 600,
    marginBottom: theme.spacing(4),
    backgroundColor: '#ffffff',
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2],
  },
  logItem: {
    backgroundColor: '#e0e0e0',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2],
    cursor: 'pointer',
  },
  addButton: {
    position: 'fixed',
    bottom: theme.spacing(4),
    right: theme.spacing(4),
    borderRadius: 50
  },
}));

const AlarmLogPage = () => {
  const classes = useStyles();

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [addData, setAddData] = useState({
    id: '',
    status: '',
    location: '',
    occurrence: '',
  });
  const [addErrors, setAddErrors] = useState({
    id: '',
    status: '',
    location: '',
    occurrence: '',
  });

  // Static sample data for demonstration
  const yearlyLogs = [
    {
      id: '1',
      status: 'Error',
      location: 'Building A',
      occurrence: 'Yearly',
      time: '2024-04-01T15:37:42.887Z',
    },
    {
      id: '2',
      status: 'Warning',
      location: 'Building B',
      occurrence: 'Yearly',
      time: '2025-04-02T15:37:42.887Z',
    },
  ];

  const monthlyLogs = [
    {
      id: '3',
      status: 'Error',
      location: 'Building C',
      occurrence: 'Monthly',
      time: '2024-04-03T15:37:42.887Z',
    },
    {
      id: '4',
      status: 'Warning',
      location: 'Building D',
      occurrence: 'Monthly',
      time: '2024-05-04T15:37:42.887Z',
    },
  ];

  const dailyLogs = [
    {
      id: '5',
      status: 'Error',
      location: 'Building E',
      occurrence: 'Daily',
      time: '2024-04-05T15:37:42.887Z',
    },
    {
      id: '6',
      status: 'Warning',
      location: 'Building F',
      occurrence: 'Daily',
      time: '2024-04-06T15:37:42.887Z',
    },
  ];

  const handleLogClick = (log) => {
    // Handle click on log
    console.log('Clicked log:', log);
  };

  const handleAddButtonClick = () => {
    setOpenAddDialog(true);
  };

  const handleAddDialogClose = () => {
    setOpenAddDialog(false);
    setAddData({
      id: '',
      status: '',
      location: '',
      occurrence: '',
    });
    setAddErrors({
      id: '',
      status: '',
      location: '',
      occurrence: '',
    });
  };

  const handleInputChangeAdd = (event) => {
    const { name, value } = event.target;
    setAddData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className={classes.container}>
      <div className={classes.categoryContainer}>
        <Typography variant="h4">Yearly Alarms</Typography>
        {yearlyLogs.map(log => (
          <div key={log.id} className={classes.logItem} onClick={() => handleLogClick(log)}>
            <Typography>ID: {log.id}</Typography>
            <Typography>Status: {log.status}</Typography>
            <Typography>Location: {log.location}</Typography>
            <Typography>Occurrence: {log.occurrence}</Typography>
            <Typography>Time: {moment(log.time).format('YYYY')}</Typography>
          </div>
        ))}
      </div>

      <div className={classes.categoryContainer}>
        <Typography variant="h4">Monthly Alarms</Typography>
        {monthlyLogs.map(log => (
          <div key={log.id} className={classes.logItem} onClick={() => handleLogClick(log)}>
            <Typography>ID: {log.id}</Typography>
            <Typography>Status: {log.status}</Typography>
            <Typography>Location: {log.location}</Typography>
            <Typography>Occurrence: {log.occurrence}</Typography>
            <Typography>Time: {moment(log.time).format('YYYY-MM')}</Typography>
          </div>
        ))}
      </div>

      <div className={classes.categoryContainer}>
        <Typography variant="h4">Daily Alarms</Typography>
        {dailyLogs.map(log => (
          <div key={log.id} className={classes.logItem} onClick={() => handleLogClick(log)}>
            <Typography>ID: {log.id}</Typography>
            <Typography>Status: {log.status}</Typography>
            <Typography>Location: {log.location}</Typography>
            <Typography>Occurrence: {log.occurrence}</Typography>
            <Typography>Time: {moment(log.time).format('YYYY-MM-DD')}</Typography>
          </div>
        ))}
      </div>

      <Button
        className={classes.addButton}
        variant="contained"
        color="primary"
        onClick={handleAddButtonClick}
      >
        ADD
      </Button>

      <Dialog open={openAddDialog} onClose={handleAddDialogClose}>
        <DialogTitle>Add Condition</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Phase"
            type="text"
            fullWidth
            name="id"
            value={addData.id}
            onChange={handleInputChangeAdd}
            error={addErrors.id}
            helperText={addErrors.id}
          />
          <TextField
            margin="dense"
            label="Attribute"
            type="text"
            fullWidth
            name="status"
            value={addData.status}
            onChange={handleInputChangeAdd}
            error={addErrors.status}
            helperText={addErrors.status}
          />
          <TextField
            margin="dense"
            label="Operation"
            type="text"
            fullWidth
            name="location"
            value={addData.location}
            onChange={handleInputChangeAdd}
            error={addErrors.location}
            helperText={addErrors.location}
          />
          <TextField
            margin="dense"
            label="Value"
            type="text"
            fullWidth
            name="occurrence"
            value={addData.occurrence}
            onChange={handleInputChangeAdd}
            error={addErrors.occurrence}
            helperText={addErrors.occurrence}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AlarmLogPage;