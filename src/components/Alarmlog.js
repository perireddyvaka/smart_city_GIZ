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
} from "@material-ui/core";
import { Alarm } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "93vh",
    backgroundColor: "#6EB1D6",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(3),
    position: "relative",
  },
  container: {
    maxWidth: "800px",
    width: "100%",
  },
  alarmLogItem: {
    position: "relative",
    marginBottom: theme.spacing(3),
    padding: theme.spacing(3),
    backgroundColor: "#092b4d",
    borderRadius: theme.spacing(2),
    color: "#fff",
    "&:hover": {
      backgroundColor: "#0f3a6e",
    },
  },
  closeButton: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    color: "#fff",
  },
  addButton: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(7),
    borderRadius: "30%",
    backgroundColor: "#092b4d",
  },
  closeButtonText: {
    color: "#fff",
  },
  alarmIcon: {
    marginRight: theme.spacing(1),
    fontSize: "2rem",
    color: "#fff",
  },
}));

const AlarmLogPage = () => {
  const classes = useStyles();
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openCloseDialog, setOpenCloseDialog] = useState(false);
  const [items, setItems] = useState(null);
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

  const handleAddDialogClose = () => {
    setOpenAddDialog(false);
    setAddErrors({});
  };

  const handleInputChangeAdd = (event) => {
    setAddData({ ...addData, [event.target.name]: event.target.value });
  };

  const handleSubmitAdd = () => {
    const errors = {};
    let hasErrors = false;
    // Check for empty fields
    for (const key in addData) {
      if (!addData[key]) {
        errors[key] = "Required";
        hasErrors = true;
      }
    }
    console.log("object")
    
    if (hasErrors) {
      setAddErrors(errors);
    }
    fetch("http://127.0.0.1:8000/conditions/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });

    // Proceed with submission if no errors
    // console.log("Data to be stored:", addData);
    setAddData({
      phase: "",
      parameter: "",
      range_min: 0,
      range_max: 0,
      parameter_units: "",
    });
    setOpenAddDialog(false);
    setAddErrors({});
  };

  const handleCloseDialogClose = () => {
    setOpenCloseDialog(false);
    setCloseErrors({});
  };

  const handleInputChangeClose = (event) => {
    setCloseData({ ...closeData, [event.target.name]: event.target.value });
  };

  const handleSubmitClose = () => {
    const errors = {};
    let hasErrors = false;

    // Check for empty fields
    for (const key in closeData) {
      if (!closeData[key]) {
        errors[key] = "Required";
        hasErrors = true;
      }
    }

    if (hasErrors) {
      setCloseErrors(errors);
      return;
    }

    // Proceed with submission if no errors
    console.log("Close Data to be stored:", closeData);
    setCloseData({
      problem: "",
      status: "",
      remark: "",
    });
    setOpenCloseDialog(false);
    setCloseErrors({});
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/alarm/alarmdata", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className={classes.root}>
      <Container className={classes.container} maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom>
          <Alarm className={classes.alarmIcon} />
          Alarm Log
        </Typography>
        {items &&
          items.map((item, index) => {
            return (
              <div className={classes.alarmLogItem} key={index}>
                <Typography variant="h6">Log 4</Typography>
                <Typography variant="body1">
                  ID: {item["id"]} <br />
                  Status: {item["status"]} <br />
                  Location: {item["location"]} <br />
                  Occurrence: {item["occurrence"]} <br />
                  Time : {item["timeerror"]}
                  <br />
                </Typography>
                <Button
                  className={classes.closeButton}
                  onClick={() => setOpenCloseDialog(true)}
                >
                  <Typography className={classes.closeButtonText}>
                    Close
                  </Typography>
                </Button>
              </div>
            );
          })}
      </Container>

      <Button
        className={classes.addButton}
        variant="contained"
        color="primary"
        onClick={() => setOpenAddDialog(true)}
      >
        ADD
      </Button>

      <Dialog open={openAddDialog} onClose={handleAddDialogClose}>
        <DialogTitle>Add Condition</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Parameter"
            type="text"
            fullWidth
            name="parameter"
            value={addData.operation}
            onChange={handleInputChangeAdd}
            error={!!addErrors.operation}
            helperText={addErrors.operation}
          />
          <TextField
            margin="dense"
            label="Phase"
            type="text"
            fullWidth
            name="phase"
            value={addData.operation}
            onChange={handleInputChangeAdd}
            error={!!addErrors.operation}
            helperText={addErrors.operation}
          />
          <TextField
            margin="dense"
            label="Range Min"
            type="number"
            fullWidth
            name="range_min"
            value={addData.range_min}
            onChange={handleInputChangeAdd}
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
            onChange={handleInputChangeAdd}
            error={!!addErrors.range_max}
            helperText={addErrors.range_max}
          />
          <TextField
            margin="dense"
            label="Range Unit"
            type="text"
            fullWidth
            name="parameter_units"
            value={addData.rangeUnit}
            onChange={handleInputChangeAdd}
            error={!!addErrors.rangeUnit}
            helperText={addErrors.rangeUnit}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmitAdd} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openCloseDialog} onClose={handleCloseDialogClose}>
        <DialogTitle>Close Entry</DialogTitle>
        <DialogContent>
          <InputLabel shrink>Problem</InputLabel>
          <Select
            autoFocus
            margin="dense"
            fullWidth
            name="problem"
            onChange={handleInputChangeClose}
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
            <MenuItem value="Reason 6">Reason 6</MenuItem>
          </Select>

          <InputLabel shrink>Status</InputLabel>
          <Select
            autoFocus
            margin="dense"
            type="text"
            fullWidth
            name="status"
            onChange={handleInputChangeClose}
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
            onChange={handleInputChangeClose}
            error={!!closeErrors.remark}
            helperText={closeErrors.remark}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmitClose} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlarmLogPage;
