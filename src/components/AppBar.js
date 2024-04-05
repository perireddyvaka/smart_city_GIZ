import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  makeStyles,
  Menu,
  MenuItem,
  Badge,
} from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AlarmIcon from "@material-ui/icons/Alarm";
import { Link } from "react-router-dom";
import PersonIcon from "@material-ui/icons/Person";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import yourImage from "./logos.png"; // Import your image


const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    textAlign: "center",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  dropdownButton: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    padding: theme.spacing(0.5, 2),
    borderRadius: "20px", // Rounded border
    backgroundColor: "transparent",
    marginRight: theme.spacing(1),
    border: "1px solid transparent",
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: theme.palette.grey[200], // Change background color on hover
    },
  },
  iconButton: {
    marginRight: theme.spacing(1),
  },
  menu: {
    marginTop: "40px",
  },
  appBar: {
    background: "#155F82", // Change background color of AppBar
  },
  image: {
    width: "auto",
    height: "50px", // Adjust the height of the image as needed
    marginRight: theme.spacing(2),
  },
}));

const CustomAppBar = () => {
  const classes = useStyles();
  const [ncount, setNcount] = useState(0);
  const [acount, setAcount] = useState(0);
  const [issue, setIssue] = useState([]);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [dropdownAnchorEl, setDropdownAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState("DTR"); // State variable to track selected option

  const handleNotificationOpen = async (event) => {
    setNotificationAnchorEl(event.currentTarget);
    await fetch("http://127.0.0.1:8000/alarm/getdata", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data[0]["Age"])
        setIssue(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleDropdownOpen = (event) => {
    setDropdownAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = (option) => {
    setSelectedOption(option); // Update selected option
    setDropdownAnchorEl(null); // Close the dropdown
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/alarm/ncount", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data[0]["Age"])
        setNcount(data[0]);
      })
      .catch((err) => {
        console.log(err.message);
      });

      fetch("http://127.0.0.1:8000/alarm/acount", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data[0]["Age"])
        setAcount(data[0]);
      })
      .catch((err) => {
        console.log(err.message);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(issue);
  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <IconButton color="inherit" className={classes.menuButton}>
          <MenuIcon />
        </IconButton>
        <img
          src={yourImage}
          alt="Your company logo"
          className={classes.image}
        />
        <Typography variant="h6" className={classes.title}>
          SUBDIVISIONHEAD DASHBOARD
            <br />
          {selectedOption}
        </Typography>
        <div className={classes.dropdownButton} onClick={handleDropdownOpen}>
          {selectedOption} {/* Display selected option */}
          <ArrowDropDownIcon />
        </div>
        <Menu
          anchorEl={dropdownAnchorEl}
          keepMounted
          open={Boolean(dropdownAnchorEl)}
          onClose={() => handleDropdownClose(selectedOption)} // Pass selected option to handleDropdownClose
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          className={classes.menu}
        >
          <MenuItem onClick={() => handleDropdownClose("DTR")}>DTR</MenuItem>
          <MenuItem onClick={() => handleDropdownClose("ACB")}>ACB</MenuItem>
        </Menu>

        <div
          className={classes.dropdownButton}
          onClick={handleNotificationOpen}
        >
          <Badge badgeContent={ncount.count} color="secondary">
            <NotificationsIcon />
          </Badge>
        </div>
        <Menu
          anchorEl={notificationAnchorEl}
          keepMounted
          open={Boolean(notificationAnchorEl)}
          onClose={handleNotificationClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          className={classes.menu}
        >
          {
            issue.map((item, index) => {
              return (
                <MenuItem key={index}>
                  <Typography variant="body1">
                    <br />
                    Status:- {item["status"]}
                    <br />
                    occurrence:- {item["occurrence"]}
                    <br />
                    location:- {item["location"]}
                  </Typography>
                </MenuItem>
              );
            })
          }
        </Menu>

        <IconButton component={Link} to="/Alarmlog" color="inherit">
        <Badge badgeContent={acount.count}>
          <AlarmIcon />
          </Badge>
        </IconButton>
        <IconButton color="inherit" className={classes.iconButton}>
          <PersonIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
