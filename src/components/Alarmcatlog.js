import React, { useState } from 'react';
import {
  Typography,
  makeStyles,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  TableSortLabel
} from '@material-ui/core';
import { Close as CloseIcon, GetApp as DownloadIcon } from '@material-ui/icons';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f0f0',
    padding: theme.spacing(4)
  },
  categoryContainer: {
    width: '100%',
    maxWidth: 800,
    marginBottom: theme.spacing(4),
    backgroundColor: '#ffffff',
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2]
  },
  table: {
    width: '100%'
  },
  addButton: {
    position: 'fixed',
    bottom: theme.spacing(4),
    right: theme.spacing(4),
    borderRadius: 50
  },
  downloadButton: {
    position: 'fixed',
    bottom: theme.spacing(4),
    left: theme.spacing(4),
    borderRadius: 50
  }
}));

const AlarmLogPage = () => {
  const classes = useStyles();

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [addData, setAddData] = useState({
    id: '',
    status: '',
    location: '',
    occurrence: ''
  });
  const [addErrors, setAddErrors] = useState({
    id: '',
    status: '',
    location: '',
    occurrence: ''
  });
  const [sortColumn, setSortColumn] = useState('time');
  const [sortDirection, setSortDirection] = useState('asc');
  const [searchStatus, setSearchStatus] = useState('');

  // Static sample data for demonstration
  const allLogs = [
    {
      id: 'ABCD1',
      status: 'Error',
      location: 'Building A',
      occurrence: 'Yearly',
      time: '2024-04-01T15:37:42.887Z'
    },
    {
      id: 'EFGH2',
      status: 'Warning',
      location: 'Building B',
      occurrence: 'Yearly',
      time: '2025-04-02T15:37:42.887Z'
    },
    {
      id: 'IJKL3',
      status: 'Error',
      location: 'Building C',
      occurrence: 'Monthly',
      time: '2024-04-03T15:37:42.887Z'
    },
    {
      id: 'MNOP4',
      status: 'Warning',
      location: 'Building D',
      occurrence: 'Monthly',
      time: '2024-05-04T15:37:42.887Z'
    },
    {
      id: 'QRST5',
      status: 'Error',
      location: 'Building E',
      occurrence: 'Daily',
      time: '2024-04-05T15:37:42.887Z'
    },
    {
      id: 'UVWX6',
      status: 'Warning',
      location: 'Building F',
      occurrence: 'Daily',
      time: '2024-04-06T15:37:42.887Z'
    }
  ];

  const handleLogClose = (log) => {
    // Handle close of log
    console.log('Closed log:', log);
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
      occurrence: ''
    });
    setAddErrors({
      id: '',
      status: '',
      location: '',
      occurrence: ''
    });
  };

  const handleInputChangeAdd = (event) => {
    const { name, value } = event.target;
    setAddData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSort = (column) => {
    const isAsc = sortColumn === column && sortDirection === 'asc';
    setSortColumn(column);
    setSortDirection(isAsc ? 'desc' : 'asc');
  };

  const handleSearch = (event) => {
    setSearchStatus(event.target.value);
  };

  const handleDownload = () => {
    const filteredLogs = allLogs.filter((log) =>
      log.status.toLowerCase().includes(searchStatus.toLowerCase())
    );
    const csvData = [
      ['ID', 'Status', 'Location', 'Occurrence', 'Time'],
      ...filteredLogs.map((log) => [log.id, log.status, log.location, log.occurrence, moment(log.time).format('YYYY-MM-DD HH:mm:ss')])
    ];
    const csvContent = csvData.map((row) => row.join(',')).join('\n');
    const downloadLink = document.createElement('a');
    downloadLink.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent));
    downloadLink.setAttribute('download', 'alarm_logs.csv');
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const filteredLogs = allLogs.filter((log) =>
    log.status.toLowerCase().includes(searchStatus.toLowerCase())
  );

  const sortedLogs = filteredLogs.sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className={classes.container}>
      <div className={classes.categoryContainer}>
        <TextField
          margin="normal"
          label="Search by Status"
          type="text"
          fullWidth
          value={searchStatus}
          onChange={handleSearch}
        />
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortColumn === 'id'}
                  direction={sortColumn === 'id' ? sortDirection : 'asc'}
                  onClick={() => handleSort('id')}
                >
                  ID
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortColumn === 'status'}
                  direction={sortColumn === 'status' ? sortDirection : 'asc'}
                  onClick={() => handleSort('status')}
                >
                  Status
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortColumn === 'location'}
                  direction={sortColumn === 'location' ? sortDirection : 'asc'}
                  onClick={() => handleSort('location')}
                >
                  Location
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortColumn === 'occurrence'}
                  direction={sortColumn === 'occurrence' ? sortDirection : 'asc'}
                  onClick={() => handleSort('occurrence')}
                >
                  Occurrence
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortColumn === 'time'}
                  direction={sortColumn === 'time' ? sortDirection : 'asc'}
                  onClick={() => handleSort('time')}
                >
                  Time
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">Close</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{log.id}</TableCell>
                <TableCell>{log.status}</TableCell>
                <TableCell>{log.location}</TableCell>
                <TableCell>{log.occurrence}</TableCell>
                <TableCell>{moment(log.time).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleLogClose(log)}>
                    <CloseIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Button
        className={classes.addButton}
        variant="contained"
        color="primary"
        onClick={handleAddButtonClick}
      >
        ADD
      </Button>

      <Button
        className={classes.downloadButton}
        variant="contained"
        color="primary"
        onClick={handleDownload}
      >
        <DownloadIcon />
      </Button>

      <Dialog open={openAddDialog} onClose={handleAddDialogClose}>
        <DialogTitle>Add Condition</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="ID"
            type="text"
            fullWidth
            name="id"
            value={addData.id || ''}
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