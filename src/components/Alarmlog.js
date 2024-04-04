import React, { useState } from "react";
import { Typography, Container, makeStyles, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem } from "@material-ui/core";
import { Alarm } from "@material-ui/icons";

const gradientColors = [
  "#33539E",
  "#7FACD6",
  "#BFB8DA",
  "#E8B7D4",
  "#A5678E"
];

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "93vh", // Ensure full viewport height
    background: `linear-gradient(to bottom, ${gradientColors.join(", ")})`, // Gradient background
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(3),
    position: "relative", // Make the root element relative for positioning the add button
  },
  container: {
    maxWidth: "800px", // Increase max width for larger logs
    width: "100%",
  },
  alarmLogItem: {
    position: "relative",
    marginBottom: theme.spacing(3), // Increase space between log items
    padding: theme.spacing(3), // Increase padding for larger log items
    backgroundColor: "#092b4d", // Background color for log items
    borderRadius: theme.spacing(2), // Increase border radius for rounded corners
    color: "#fff",
    "&:hover": {
      backgroundColor: "#0f3a6e", // Darken background color on hover
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
    bottom: theme.spacing(2), // Adjust top position to push it down from top
    right: theme.spacing(7), // Adjust right position to place it at the right corner
    borderRadius: "30%", // Apply border radius to make it round
    backgroundColor: "#092b4d", // Set background color of the button
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
  const [addData, setAddData] = useState({
    id: "",
    status: "",
    location: "",
    occurrence: "",
    incharge: ""
  });
  const [closeData, setCloseData] = useState({
    Problem: "",
    Reason: "",
    Solution: ""
  });

  const handleAddButtonClick = () => {
    setOpenAddDialog(true);
  };

  const handleAddDialogClose = () => {
    setOpenAddDialog(false);
  };

  const handleInputChangeAdd = (event) => {
    setAddData({ ...addData, [event.target.name]: event.target.value });
  };

  const handleSubmitAdd = () => {
    // Send data to the backend and store it in the database
    console.log("Data to be stored:", addData);

    // Clear the form fields
    setAddData({
      id: "",
      status: "",
      location: "",
      occurrence: "",
      incharge: ""
    });

    // Close the dialog
    setOpenAddDialog(false);
  };

  const handleCloseButtonClick = () => {
    setOpenCloseDialog(true);
  };

  const handleCloseDialogClose = () => {
    setOpenCloseDialog(false);
  };

  const handleInputChangeClose = (event) => {
    setCloseData({ ...closeData, [event.target.name]: event.target.value });
  };

  const handleSubmitClose = () => {
    // Send data to the backend and store it in the database
    console.log("Data to be stored:", closeData);

    // Clear the form fields
    setCloseData({
      Problem: "",
      Reason: "",
      Solution: ""
    });

    // Close the dialog
    setOpenCloseDialog(true);
  };

  return (
    <div className={classes.root}>
      <Container className={classes.container} maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom>
          <Alarm className={classes.alarmIcon} />
          Alarm Log
        </Typography>
        
          <div className={classes.alarmLogItem}>
            <Typography variant="h6">Log 1</Typography>
            <Typography variant="body1">
              ID: 823af2fb-feba-4943-b714-65b7699f2114 <br />
              Status: Error <br />
              Location: Madhu Vihar DT-1 <br />
              Occurrence: Low voltages <br />
              Incharge: CHead
            </Typography>
            <Button className={classes.closeButton} onClick={handleCloseButtonClick}>
              <Typography className={classes.closeButtonText}>Close</Typography>
            </Button>
          </div>
          <div className={classes.alarmLogItem}>
            <Typography variant="h6">Log 2</Typography>
            <Typography variant="body1">
              ID: 6c858470-c14d-4721-a33b-d0d707210ac2 <br />
              Status: Error <br />
              Location: Building B <br />
              Occurrence: Low voltages <br />
              Incharge: DHead
            </Typography>
            <Button className={classes.closeButton} onClick={handleCloseButtonClick}>
              <Typography className={classes.closeButtonText}>Close</Typography>
            </Button>
          </div>
          {/* Add more logs here */}
        
      </Container>

      {/* ADD Button */}
      <Button className={classes.addButton} variant="contained" color="primary" onClick={handleAddButtonClick}>+</Button>

      {/* Dialog for ADD button */}
      <Dialog open={openAddDialog} onClose={handleAddDialogClose}>
        <DialogTitle>Add Entry</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="ID"
            type="text"
            fullWidth
            name="id"
            value={addData.id}
            onChange={handleInputChangeAdd}
          />
          <TextField
            margin="dense"
            label="Status"
            type="text"
            fullWidth
            name="status"
            value={addData.status}
            onChange={handleInputChangeAdd}
          />
          <TextField
            margin="dense"
            label="Location"
            type="text"
            fullWidth
            name="location"
            value={addData.location}
            onChange={handleInputChangeAdd}
          />
          <TextField
            margin="dense"
            label="Occurrence"
            type="text"
            fullWidth
            name="occurrence"
            value={addData.occurrence}
            onChange={handleInputChangeAdd}
          />
          <TextField
            margin="dense"
            label="Incharge"
            type="text"
            fullWidth
            name="incharge"
            value={addData.incharge}
            onChange={handleInputChangeAdd}
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

      {/* Dialog for CLOSE button */}
      <Dialog open={openCloseDialog} onClose={handleCloseDialogClose}>
        <DialogTitle>Close Entry</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Problem"
            type="text"
            fullWidth
            name="Problem"
            // value={closeData.field1}
            onChange={handleInputChangeClose}
          />
          <Select
  autoFocus        
  margin="dense"
  fullWidth
  name="Reason"
  // value={closeData.field2}
  onChange={handleInputChangeClose}
  label="Reason" // Add label here
>
  <MenuItem value="">Select Reason</MenuItem>
  <MenuItem value="Reason 1">Over loaded LT Feeders</MenuItem>
  <MenuItem value="Reason 2">Loose connection on LT side</MenuItem>
  <MenuItem value="Reason 3">Fault on LT side</MenuItem>
  <MenuItem value="Reason 4">Low oil level</MenuItem>
  <MenuItem value="Reason 5">Oil leakge</MenuItem>
  {/* <MenuItem value="Reason 6">Reason 6</MenuItem> */}
</Select>

          <TextField
            margin="dense"
            label="Solution"
            type="text"
            fullWidth
            name="Solution"
            // value={closeData.field3}
            onChange={handleInputChangeClose}
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
