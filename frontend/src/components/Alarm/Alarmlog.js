import React, { useEffect, useState } from "react";
import {
  Typography,
  Container,
  makeStyles,
  // Hidden,
  
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
  
  TableHead,
  TableRow,
  
  Menu,
  AppBar,
  Toolbar,
} from "@material-ui/core";

import { Alarm } from "@material-ui/icons";
import { Link } from "react-router-dom";
// import yourImage from './logos.png';
import config from "../../config";

const useStyles = makeStyles((theme) => ({
  root: {
    // height: "44.2vw",
    width: '96.5vw',
    backgroundColor: "black",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex",
    padding: theme.spacing(3),
    position: "relative",
    overflow: "hidden", // Prevent scrolling
  },
  container: {
    maxWidth: "41.6vw",
    
    position: "relative",
  },
  
  addButton: {
    borderRadius: "30vw",
    backgroundColor: "#black", // Changed button color
    marginRight: theme.spacing(2),
  },
  closeButtonText: {
    color: "#fff",
  },
  alarmIcon: {
    marginRight: theme.spacing(1),
    fontSize: "2rem",
  },
  
  tableHeader: {
    fontWeight: "bold",
    padding: "1vw",
    height: "1vw",
    color: "white",
    border: "1px solid #fff",
    backgroundColor: "#black", // Changed table header color
  },
  tableCell: {
    border: "1px solid #fff",
    color: "white",
    padding: "1vw",
    width: '20vw',
    height: "-1vw",
    // position: '-webkit-sticky',
    backgroundColor: "black", // Changed table content color
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
  previousbutton:{
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
  select: {
    marginLeft: theme.spacing(2),
  },
  searchByTextButton: {
    backgroundColor: "#CCCCCC",
    bottom: '1vw',
    marginLeft: "-21.7vw",
    color: "#000",
  },
  sortButton: {
    bottom: '1vw',
    marginRight: "-21.3vw",
    backgroundColor: "#CCCCCC",
    color: "#000",
  },
  appBar: {
    top:'0.01vw',
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
    marginBottom: theme.spacing(1), // Move title slightly upwards
  },
  // tableContainer: {
  //   width: "100vw", 
  //   height: "100vw",
  // },
  table: {
    width: "90vw", // Make the table fill the entire width
    height: "9vw", // Make the table fill the entire height
    marginLeft: "-25vw",
  },
  // iconContainer: {
  //   marginTop: theme.spacing(-2), // Move icon container upwards
  // },
  

}));




const perPage = 5;

const AlarmLogPage = () => {
  const classes = useStyles();
  
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openCloseDialog, setOpenCloseDialog] = useState(false);
  const [items, setItems] = useState([]);
  const [id, setId] = useState(null);
  const [addData, setAddData] = useState({
    parameter: "",
    phase: "",
    range_min: "",
    range_max: "",
    parameter_units: "",
  });
  const [addErrors, setAddErrors] = useState({});
  const [closeData, setCloseData] = useState({
    occurrence: "",
    status: "",
    remarks: "",
    incharge: "",
  });
  const [closeErrors, setCloseErrors] = useState({});
  
  const [searchStatus, setSearchStatus] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchAnchorEl, setSearchAnchorEl] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
 
  useEffect(() => {
    

    

   
   

    return () => {
      
    };
  }, []);

  


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

  const [conditions, setConditions] = useState([]);
  const [showNewConditionInput, setShowNewConditionInput] = useState(false);
  const [newCondition, setNewCondition] = useState("");

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${config.backendAPI}/alarm/alarmdata`);
        const data = await response.json();
        const processedData = data.map(item => ({
          ...item,
          occurrence: item.occurrence || "", // Ensure occurrence is always a string
        }));
        setItems(processedData);
        setTotalPages(Math.ceil(processedData.length / perPage));
      } catch (error) {
        console.log(error.message);
      }
    };
  
    fetchData();
  }, []);

  const fetchConditions = async () => {
    try {
      const response = await fetch(`${config.backendAPI}/conditions`);
      const data = await response.json();
      // Process data if needed (e.g., filtering, mapping)
      setConditions(data);
    } catch (error) {
      console.error('Error fetching conditions:', error.message);
    }
  };
  
  fetchConditions();

  const handleAddNewCondition = () => {
    setShowNewConditionInput(true);
  };

  const handleSaveNewCondition = () => {
    if (newCondition.trim() !== "") {
      const newConditionData = { id: conditions.length + 1, parameter: newCondition };
      setConditions([...conditions, newConditionData]);
      setNewCondition("");
      setShowNewConditionInput(false);
    }
  };
  
  
const handleSubmit = async (dataType) => {
  const data = dataType === "add" ? addData : closeData;
  const setData = dataType === "add" ? setAddData : setCloseData;
  const errors = {};
  let hasErrors = false;

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
      ? `${config.backendAPI}/conditions/add`
      : `${config.backendAPI}/alarm/renew/${id}`;

  try {
    const response = await fetch(endpoint, {
      method: dataType === "add" ? "POST" : "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      if (dataType === "close" && data.status === "Resolved") {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
      } else if (dataType === "add") {
        const newItem = await response.json();
        setItems((prevItems) => [...prevItems, newItem]);
      }
      handleCloseDialog(dataType);
    } else {
      const errorData = await response.json();
      console.log("Error:", response.status, errorData);
    }
  } catch (error) {
    console.log(error.message);
  }

  setData(
    dataType === "add"
      ? {
          parameter: "",
          phase: "",
          range_min: "",
          range_max: "",
          parameter_units: "",
        }
      : {
          occurrence: "",
          status: "",
          remarks: "",
          incharge: "",
        }
  );
};


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

  // const downloadLogs = () => {
  //   let logsContent = "";

  //   if (downloadFormat === "json") {
  //     logsContent = JSON.stringify(items);
  //   } else if (downloadFormat === "csv") {
  //     const header = Object.keys(items[0]).join(",") + "\n";
  //     const rows = items
  //       .map((item) => Object.values(item).join(","))
  //       .join("\n");
  //     logsContent = header + rows;
  //   }

  //   const blob = new Blob([logsContent], {
  //     type: downloadFormat === "json" ? "application/json" : "text/csv",
  //   });

  //   const url = window.URL.createObjectURL(blob);
  //   const link = document.createElement("a");
  //   link.href = url;
  //   link.setAttribute(
  //     "download",
  //     `alarm_logs.${downloadFormat}`
  //   );
  //   document.body.appendChild(link);
  //   link.click();

  //   window.URL.revokeObjectURL(url);
  //   document.body.removeChild(link);
  // };

  return (
    <div className={classes.root} 
    style={{color: 'black'}}
    >
     <AppBar position="relative" className={classes.appBar}>
      <Toolbar>
      {/* <Hidden xsDown>
      <img
            src={yourImage}
            alt="Logo"
            className={classes.logo}
            onClick={() => navigate(-1)} // Navigate to previous page on click
          />
          </Hidden> */}
        <Button
          component={Link}
          to="/logstore"
          color="inherit"
          style={{ color: "#fff" }}
        >
          Alarm History
        </Button>
        <Button
          color="inherit"
          onClick={() => setOpenAddDialog(true)}
          style={{ color: "#fff" }}
        >
          ADD
        </Button>

        {/* <Button
          component={Link}
          to="/Conditions"
          color="inherit"
          style={{ color: "#fff" }}
        >
          Conditions
        </Button> */}
        
        <div className={classes.title} style={{ marginLeft: "auto", marginRight: "auto" }}>
          <Alarm className={classes.alarmIcon} />
          <Typography variant="h6" style={{ lineHeight: "2.4rem" }}>
            Alarm
          </Typography>
        </div>
        {/* <Button
          color="inherit"
          onClick={downloadLogs}
          style={{ color: "#fff" }}
        >
          Download Logs
        </Button> */}
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



        {/* <TableContainer component={Paper} className={classes.logTable}> */}
        <Table className={classes.table}>
  <TableHead>
    <TableRow>
      <TableCell className={classes.tableHeader}>Sl.No</TableCell>
      <TableCell className={classes.tableHeader}>Timestamp</TableCell>
      <TableCell className={classes.tableHeader}>Location</TableCell>
      <TableCell className={classes.tableHeader}>Name</TableCell>
      <TableCell className={classes.tableHeader}>Phase</TableCell>
      <TableCell className={classes.tableHeader}>Condition</TableCell>
      <TableCell className={classes.tableHeader}>Status</TableCell>
      <TableCell className={classes.tableHeader}>Action</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
  {items
    .filter((item) =>
      searchStatus ? item.status === searchStatus : true
    )
    .sort((a, b) => {
      const timeA = a.timeerror || ""; // Provide a default empty string if timeerror is undefined
      const timeB = b.timeerror || ""; // Provide a default empty string if timeerror is undefined

      if (sortOrder === "asc") {
        return timeA.localeCompare(timeB);
      } else {
        return timeB.localeCompare(timeA);
      }
    })
    .slice((currentPage - 1) * perPage, currentPage * perPage)
    .map((item, index) => (
      <TableRow key={item.id}>
        <TableCell className={classes.tableCell}>
          {(currentPage - 1) * perPage + index + 1}
        </TableCell>
        <TableCell className={classes.tableCell}>{item.record_time}</TableCell>
        <TableCell className={classes.tableCell}>{item.Location}</TableCell>
        <TableCell className={classes.tableCell}>
          {item.occurrence ? item.occurrence.split(", ").map((occ, idx) => (
            <div key={idx}>{occ}</div>
          )) : null}
        </TableCell>
        <TableCell className={classes.tableCell}>{item.phase}</TableCell>
        <TableCell className={classes.tableCell}>{item.condition}</TableCell>
        <TableCell className={classes.tableCell}>{item.status}</TableCell>
        
        <TableCell className={classes.tableCell}>
          <Button
            onClick={() => {
              setOpenCloseDialog(true);
              setId(item.id);
              setCloseData({
                occurrence: item.occurrence,
                status: item.status,
                remarks: item.remarks || "",
                incharge: item.incharge || "",
              });
            }}
            color="primary"
          >
            Change
          </Button>
        </TableCell>
      </TableRow>
    ))}
</TableBody>

</Table>

        {/* </TableContainer> */}
        <div className={classes.optionsContainer}>
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
        <Typography 
        className={ classes.pagination} style={{top: '1vw'}}>
          Page {currentPage} of {totalPages}
        </Typography>
     
      </Container>

      {/* ADD condition dialog */}
  <Dialog
    open={openAddDialog}
    onClose={() => handleCloseDialog("add")}
  >
    <DialogTitle>Add Condition</DialogTitle>
    <DialogContent>
     <InputLabel shrink>Name</InputLabel>
      <Select
        autoFocus
        margin="dense"
        fullWidth
        name="Name"
        onChange={(event) => handleInputChange(event, "add")}
        error={!!addErrors.parameter}
        helperText={addErrors.parameter}
      >
        <MenuItem value="">Select problem</MenuItem>
        <MenuItem value="oil_Temp">
          Oil_Temp
        </MenuItem>
        <MenuItem value="oil_low">
          Oil_Low
        </MenuItem>
        <MenuItem value="BatteryVoltage">Battery Voltage</MenuItem>
        <MenuItem value="SupplyOK">SupplyOK</MenuItem>
        <MenuItem value="THD">THD</MenuItem>
        <MenuItem value="PF">PF</MenuItem>
        <MenuItem value="DT Voltage">DT Voltage</MenuItem>
        <MenuItem value="ACB 1 Current">ACB 1 Current</MenuItem>
        <MenuItem value="ACB 2 Current">ACB 2 Current</MenuItem>
        <MenuItem value="ACB 3 Current">ACB 3 Current</MenuItem>
        <MenuItem value="ACB 4 Current">ACB 4 Current</MenuItem>
        <MenuItem value="ACB 5 Current">ACB 5 Current</MenuItem>
        <MenuItem value="ACB 6 Current">ACB 6 Current</MenuItem>
        <MenuItem value="ACB 7 Current">ACB 7 Current</MenuItem>
        <MenuItem value="ACB 8 Current">ACB 8 Current</MenuItem>
        <MenuItem value="Temperature">Temperature</MenuItem>
        {/* <MenuItem value="Phase">Phase</MenuItem> */}
        <MenuItem value="DTVolt/Current_Phase">DTVolt/Current_Phase</MenuItem>
        <MenuItem value="Current">Current</MenuItem>
      </Select>

     <InputLabel shrink>Phase</InputLabel>
      <Select
        autoFocus
        margin="dense"
        fullWidth
        name="phase"
        value={addData.phase}
        onChange={(event) => handleInputChange(event, "add")}
        error={!!addErrors.phase}
        helperText={addErrors.phase}
      >
        <MenuItem value="">Select Phase</MenuItem>
        <MenuItem value="R">R</MenuItem>
        <MenuItem value="Y">Y</MenuItem>
        <MenuItem value="B">B</MenuItem>
        <MenuItem value="N">N</MenuItem>

      </Select>

      <InputLabel shrink>Condition</InputLabel>
        <Select
          margin="dense"
          fullWidth
          name="condition"
          value={addData.condition}
          onChange={(event) => handleInputChange(event, "add")}
          error={!!addErrors.condition}
          helperText={addErrors.condition}
        >
          <MenuItem value="">Select Condition</MenuItem>
          {conditions.map((condition) => (
            <MenuItem key={condition.id} value={condition.parameter}>
              {condition.parameter}
            </MenuItem>
          ))}
          <MenuItem>
            <Button onClick={handleAddNewCondition}>Add Condition</Button>
          </MenuItem>
        </Select>

        {showNewConditionInput && (
          <div style={{ marginTop: 16 }}>
            <TextField
              margin="dense"
              label="New Condition"
              type="text"
              fullWidth
              value={newCondition}
              onChange={(event) => setNewCondition(event.target.value)}
            />
            <Button onClick={handleSaveNewCondition} color="primary" style={{ marginTop: 8 }}>
              Save
            </Button>
          </div>
        )}

      <TextField
        margin="dense"
        label="Min Range"
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
        label="Max Range"
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
        label="Parameter Units"
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
            onClick={() => handleSubmit("add")}
            color="primary"
          >
            Save
          </Button>
          <Button
            onClick={() => handleCloseDialog("add")}
            color="primary"
          >
            Cancel
          </Button>
        </DialogActions>
  </Dialog>

      {/* Close condition dialog */}
      <Dialog
        open={openCloseDialog}
        onClose={() => handleCloseDialog("close")}
      >
        <DialogTitle>Close Entry</DialogTitle>
        <DialogContent>
        <InputLabel shrink>Problem</InputLabel>
        <Select
            autoFocus
            margin="dense"
            fullWidth
            name="Problem"
            value={closeData.Problem}
            onChange={(event) => handleInputChange(event, "close")}
            error={!!closeErrors.Problem}
            helperText={closeErrors.Problem}
          >
            <MenuItem value="oil_Temp">
          Oil_Temp
        </MenuItem>
        <MenuItem value="oil_low">
          Oil_Low
        </MenuItem>
        <MenuItem value="BatteryVoltage">Battery Voltage</MenuItem>
        <MenuItem value="SupplyOK">SupplyOK</MenuItem>
        <MenuItem value="THD">THD</MenuItem>
        <MenuItem value="PF">PF</MenuItem>
        <MenuItem value="DT Voltage">DT Voltage</MenuItem>
        <MenuItem value="ACB 1 Current">ACB 1 Current</MenuItem>
        <MenuItem value="ACB 2 Current">ACB 2 Current</MenuItem>
        <MenuItem value="ACB 3 Current">ACB 3 Current</MenuItem>
        <MenuItem value="ACB 4 Current">ACB 4 Current</MenuItem>
        <MenuItem value="ACB 5 Current">ACB 5 Current</MenuItem>
        <MenuItem value="ACB 6 Current">ACB 6 Current</MenuItem>
        <MenuItem value="ACB 7 Current">ACB 7 Current</MenuItem>
        <MenuItem value="ACB 8 Current">ACB 8 Current</MenuItem>
        <MenuItem value="Temperature">Temperature</MenuItem>
        <MenuItem value="Phase">Phase</MenuItem>
        <MenuItem value="DTVolt/Current_Phase">DTVolt/Current_Phase</MenuItem>
        <MenuItem value="Current">Current</MenuItem>
           
          </Select>

          <InputLabel shrink>Status</InputLabel>
          <Select
            autoFocus
            margin="dense"
            fullWidth
            name="status"
            value={closeData.status}
            onChange={(event) => handleInputChange(event, "close")}
            error={!!closeErrors.status}
            helperText={closeErrors.status}
          >
            <MenuItem value="">Select Status</MenuItem>
            <MenuItem value="Error">Error</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Resolved">Resolved</MenuItem>
          </Select>

          <TextField
            margin="dense"
            label="Remarks"
            type="text"
            fullWidth
            name="remarks"
            value={closeData.remarks}
            onChange={(event) => handleInputChange(event, "close")}
            error={!!closeErrors.remarks}
            helperText={closeErrors.remarks}
          />
          <TextField
            margin="dense"
            label="Incharge"
            type="text"
            fullWidth
            name="incharge"
            value={closeData.incharge}
            onChange={(event) => handleInputChange(event, "close")}
            error={!!closeErrors.incharge}
            helperText={closeErrors.incharge}
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