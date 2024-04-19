import React, { useEffect, useState } from "react";
import {
  Typography,
  Container,
  makeStyles,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Menu,
  AppBar,
  Toolbar,
} from "@material-ui/core";
import { Alarm } from "@material-ui/icons";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundColor: "#6EB1D6",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(3),
    position: "relative",
    overflow: "hidden", // Prevent scrolling
  },
  container: {
    maxWidth: "800px",
    width: "100%",
    position: "relative",
  },
  addButton: {
    borderRadius: "30%",
    backgroundColor: "#092b4d",
    marginRight: theme.spacing(2),
  },
  closeButtonText: {
    color: "#fff",
  },
  alarmIcon: {
    marginRight: theme.spacing(1),
    fontSize: "2rem",
  },
  logTable: {
    marginBottom: theme.spacing(3),
    maxWidth: "800px",
    width: "100%", // Adjusted to fill the entire width
  },
  tableHeader: {
    fontWeight: "bold",
    border: "1px solid #000",
  },
  tableCell: {
    border: "1px solid #000",
  },
  optionsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.spacing(2),
  },
  select: {
    marginLeft: theme.spacing(2),
  },
  searchByTextButton: {
    backgroundColor: "#fff",
    color: "#000",
  },
  sortButton: {
    backgroundColor: "#fff",
    color: "#000",
  },
  appBar: {
    width: "100%",
    backgroundColor: "#002e41",
    top: 0,
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  tableContainer: {
    width: "100%", // Make the table container fill the entire width
    height: "100%", // Make the table container fill the entire height
  },
  table: {
    width: "100%", // Make the table fill the entire width
    height: "95%", // Make the table fill the entire height
  },
}));

const perPage = 5;

const AlarmLogPage = () => {
  const classes = useStyles();
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openCloseDialog, setOpenCloseDialog] = useState(false);
  const [items, setItems] = useState([]);
  const [id, setId] = useState(null); // Add id state
  const [addData, setAddData] = useState({
    phase: "",
    parameter: "",
    range_min: 0,
    range_max: 0,
    parameter_units: "",
  });
  const [addErrors, setAddErrors] = useState({});
  const [closeData, setCloseData] = useState({
    problem: "",
    status: "",
    remark: "",
  });
  const [closeErrors, setCloseErrors] = useState({});
  const [downloadFormat, setDownloadFormat] = useState("json");
  const [searchStatus, setSearchStatus] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchAnchorEl, setSearchAnchorEl] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleCloseDialog = (dialogType) => {
    if (dialogType === "add") {
      setOpenAddDialog(false);
      setAddErrors({});
    } else if (dialogType === "close") {
      setOpenCloseDialog(false);
      setCloseErrors({});
    }
  };

  const handleInputChange = (event, dataType) => {
    const data = dataType === "add" ? addData : closeData;
    const setData = dataType === "add" ? setAddData : setCloseData;
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = (dataType) => {
    const data = dataType === "add" ? addData : closeData;
    const setData = dataType === "add" ? setAddData : setCloseData;
    const errors = {};
    let hasErrors = false;

    // Check for empty fields
    for (const key in data) {
      if (!data[key]) {
        errors[key] = "Required";
        hasErrors = true;
      }
    }

    if (hasErrors) {
      if (dataType === "add") {
        setAddErrors(errors);
      } else if (dataType === "close") {
        setCloseErrors(errors);
      }
      return;
    }

    const endpoint =
      dataType === "add"
        ? "http://127.0.0.1:8000/conditions/add"
        : `http://127.0.0.1:8000/alarm/renew/${id}`;

    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
      })
      .catch((error) => {
        console.log(error.message);
      });

    // Clear form data and close dialog
    setData(
      dataType === "add"
        ? {
            phase: "",
            parameter: "",
            range_min: 0,
            range_max: 0,
            parameter_units: "",
          }
        : {
            problem: "",
            status: "",
            remark: "",
          }
    );
    handleCloseDialog(dataType);
  };

  useEffect(() => {
    // Fetch data
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/alarm/alarmdata");
        const data = await response.json();

        // Randomly assign statuses
        const statuses = ["Error", "Pending", "Resolved"];
        const newData = [];

        // Generate additional logs with 2025 timestamps
        for (let i = 0; i < 5; i++) {
          const randomStatus =
            statuses[Math.floor(Math.random() * statuses.length)];
          newData.push({
            id: i + 100, // Assuming 100 as the starting ID for new logs
            status: randomStatus,
            location: `Location ${i + 1}`,
            occurrence: `Occurrence ${i + 1}`,
            timeerror: `2025-04-16 12:00:0${i}`,
          });
        }

        // Concatenate the existing data with the new logs
        const updatedData = [...data, ...newData];

        setItems(updatedData);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  const handleSearchStatus = (status) => {
    setSearchStatus(status);
    setSearchAnchorEl(null);
  };

  const handleSortTime = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    // Implement sorting logic here
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const downloadLogs = () => {
    let logsContent = "";

    if (downloadFormat === "json") {
      logsContent = JSON.stringify(items);
    } else if (downloadFormat === "csv") {
      const header =
        Object.keys(items[0]).join(",") + "\n";
      const rows = items
        .map((item) => Object.values(item).join(","))
        .join("\n");
      logsContent = header + rows;
    }

    const blob = new Blob([logsContent], {
      type: downloadFormat === "json" ? "application/json" : "text/csv",
    });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `alarm_logs.${downloadFormat}`
    );
    document.body.appendChild(link);
    link.click();

    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Alarm className={classes.alarmIcon} />
            Alarm Log
          </Typography>
          <Button
            // variant="contained"
            color="primary"
            onClick={downloadLogs}
            style={{ backgroundColor: "transparent", color: "#fff" }}
          >
            Download Logs
          </Button>
          <Button
            component={Link}
            to="/logstore"
            color="primary"
            style={{ color: "#fff" }}
          >
            History
          </Button>
          <Button
            color="primary"
            onClick={() => setOpenAddDialog(true)}
            style={{ color: "#fff" }}
          >
            ADD
          </Button>
        </Toolbar>
      </AppBar>

      <Toolbar /> {/* To push the content below the AppBar */}
      <Container className={classes.container} maxWidth="md">
        <div className={classes.optionsContainer}>
          <Button
            className={classes.searchByTextButton}
            variant="contained"
            color="primary"
            onClick={(event) => setSearchAnchorEl(event.currentTarget)}
          >
            Search by Status
          </Button>
          <Menu
            anchorEl={searchAnchorEl}
            keepMounted
            open={Boolean(searchAnchorEl)}
            onClose={() => setSearchAnchorEl(null)}
          >
            <MenuItem onClick={() => handleSearchStatus("")}>
              All
            </MenuItem>
            <MenuItem onClick={() => handleSearchStatus("Error")}>
              Error
            </MenuItem>
            <MenuItem onClick={() => handleSearchStatus("Pending")}>
              Pending
            </MenuItem>
            <MenuItem onClick={() => handleSearchStatus("Resolved")}>
              Resolved
            </MenuItem>
          </Menu>

          <Button
            className={classes.sortButton}
            variant="contained"
            color="primary"
            onClick={handleSortTime}
          >
            Sort by Time {sortOrder === "asc" ? "▲" : "▼"}
          </Button>
        </div>

        <TableContainer component={Paper} className={classes.logTable}>
          <Table className={classes.table}> {/* Applied custom styles */}
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHeader}>
                  ID
                </TableCell>
                <TableCell className={classes.tableHeader}>
                  Status
                </TableCell>
                <TableCell className={classes.tableHeader}>
                  Location
                </TableCell>
                <TableCell className={classes.tableHeader}>
                  Occurrence
                </TableCell>
                <TableCell className={classes.tableHeader}>
                  Time
                  <Button
                    className={classes.sortButton}
                    onClick={handleSortTime}
                  >
                    {sortOrder === "asc" ? "▲" : "▼"}
                  </Button>
                </TableCell>
                <TableCell className={classes.tableHeader}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items
                .filter((item) =>
                  searchStatus ? item.status === searchStatus : true
                )
                .sort((a, b) => {
                  if (sortOrder === "asc") {
                    return a.timeerror.localeCompare(b.timeerror);
                  } else {
                    return b.timeerror.localeCompare(a.timeerror);
                  }
                })
                .slice((currentPage - 1) * perPage, currentPage * perPage)
                .map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className={classes.tableCell}>{item.id}</TableCell>
                    <TableCell className={classes.tableCell}>{item.status}</TableCell>
                    <TableCell className={classes.tableCell}>{item.location}</TableCell>
                    <TableCell className={classes.tableCell}>{item.occurrence}</TableCell>
                    <TableCell className={classes.tableCell}>{item.timeerror}</TableCell>
                    <TableCell className={classes.tableCell}>
                      <Button
                        onClick={() => {
                          setOpenCloseDialog(true);
                          setId(item.id);
                        }}
                        color="primary"
                      >
                        Update
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className={classes.optionsContainer}>
          {currentPage > 1 && (
            <Button
              className={classes.sortButton}
              variant="contained"
              color="primary"
              onClick={handlePrevPage}
            >
              Previous
            </Button>
          )}
          {items.length > currentPage * perPage && (
            <Button
              className={classes.sortButton}
              variant="contained"
              color="primary"
              onClick={handleNextPage}
            >
              Next
            </Button>
          )}
        </div>
      </Container>

      {/* ADD condition dialog */}
      <Dialog
        open={openAddDialog}
        onClose={() => handleCloseDialog("add")}
      >
        <DialogTitle>Add Condition</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Parameter"
            type="text"
            fullWidth
            name="parameter"
            value={addData.parameter}
            onChange={(event) => handleInputChange(event, "add")}
            error={!!addErrors.parameter}
            helperText={addErrors.parameter}
          />
          <TextField
            margin="dense"
            label="Phase"
            type="text"
            fullWidth
            name="phase"
            value={addData.phase}
            onChange={(event) => handleInputChange(event, "add")}
            error={!!addErrors.phase}
            helperText={addErrors.phase}
          />
          <TextField
            margin="dense"
            label="Range Min"
            type="number"
            fullWidth
            name="range_min"
            value={addData.range_min}
            onChange={(event) => handleInputChange(event, "add")}
            error={!!addErrors.range_min}
            helperText={addErrors.range_min}
          />
          <TextField
            margin="dense"
            label="Range Max"
            type="number"
            fullWidth
            name="range_max"
            value={addData.range_max}
            onChange={(event) => handleInputChange(event, "add")}
            error={!!addErrors.range_max}
            helperText={addErrors.range_max}
          />
          <TextField
            margin="dense"
            label="Range Unit"
            type="text"
            fullWidth
            name="parameter_units"
            value={addData.parameter_units}
            onChange={(event) => handleInputChange(event, "add")}
            error={!!addErrors.parameter_units}
            helperText={addErrors.parameter_units}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleCloseDialog("add")}
            color="primary"
          >
            Cancel
          </Button>
          <Button onClick={() => handleSubmit("add")} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Close dialog content */}
      <Dialog
        open={openCloseDialog}
        onClose={() => handleCloseDialog("update")}
      >
        <DialogTitle>Close Entry</DialogTitle>
        <DialogContent>
          <InputLabel shrink>Problem</InputLabel>
          <Select
            autoFocus
            margin="dense"
            fullWidth
            name="problem"
            onChange={(event) => handleInputChange(event, "update")}
            error={!!closeErrors.problem}
            helperText={closeErrors.problem}
          >
            <MenuItem value="">Select Problem</MenuItem>
            <MenuItem value="Overloaded LT Feeders">
              Overloaded LT Feeders
            </MenuItem>
            <MenuItem value="Loose connection on LT side">
              Loose connection on LT side
            </MenuItem>
            <MenuItem value="Fault on LT side">Fault on LT side</MenuItem>
            <MenuItem value="Low oil level">Low oil level</MenuItem>
            <MenuItem value="Oil leakage">Oil leakage</MenuItem>
            <MenuItem value="Reason 6">acb_3_current</MenuItem>
          </Select>

          <InputLabel shrink>Status</InputLabel>
          <Select
            autoFocus
            margin="dense"
            type="text"
            fullWidth
            name="status"
            onChange={(event) => handleInputChange(event, "close")}
            error={!!closeErrors.status}
            helperText={closeErrors.status}
          >
            <MenuItem value="">Select Status</MenuItem>
            <MenuItem value="Error">Error</MenuItem>
            <MenuItem value="Under Progress">Under Progress</MenuItem>
            <MenuItem value="Repair">Repair</MenuItem>
            <MenuItem value="Successfully Working">
              Successfully Working
            </MenuItem>
          </Select>

          <TextField
            margin="dense"
            label="Remark"
            type="text"
            fullWidth
            name="remark"
            onChange={(event) => handleInputChange(event, "close")}
            error={!!closeErrors.remark}
            helperText={closeErrors.remark}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseDialog("close")} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleSubmit("close")} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlarmLogPage;
