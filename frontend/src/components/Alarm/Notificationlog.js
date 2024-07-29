import React, { useEffect, useState, useRef } from 'react';
// import logo from './logos.png';
import {
    Dialog,
    Box,
    Typography,
    makeStyles,
    Button,
} from '@material-ui/core';
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ReplayIcon from "@mui/icons-material/Replay";
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import config from '../../config';

const useStyles = makeStyles((theme) => ({
    pagination: {
        color: "#fff",
        position: "relative",
        left:"85vw",
        justifyContent: "right",
        display: "flex",
        width: "9vw",
        bottom: "2.5vw"
      },
    
}));
const styles = {
    body: {
        backgroundColor: 'black',
        color: 'black', // Optional: to ensure text is visible on a black background
    },
    sessionTimeoutDialog: {
        width: "60vw",
        padding: "2vw",
        backgroundColor: "#f3e5f5", // Light purple background color
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      },
      errorIcon: {
        fontSize: "7vw", // Increased icon size
        color: "#c51162", // Attractive red color
        marginBottom: "2vw",
      },
      sessionTimeoutText: {
        marginBottom: "1.5vw",
        fontWeight: "bold", // Bold text for better visibility
      },
      loginAgainText: {
        display: "flex",
        alignItems: "center",
        marginRight: "3vw",
        marginBottom: "1.7vw", // Increased bottom margin for better spacing
        fontSize: "1.8vw", // Increased font size for better readability
      },
      loginAgainIcon: {
        marginRight: "1vw",
      },
    };

const AppBar = () => {
    // const navigate = useNavigate();
    const appbarStyle = {
        border: '1px solid #fff',
        position: "relative",
        backgroundColor: 'black',
        color: '#fff',
        padding: '0.5vw 1vw',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '1vw',
        justifyContent: 'center',
        width: '97.3vw',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    };

    const titleStyle = {
        fontSize: '1.5rem',
    };

    return (
        <div style={appbarStyle}>
           {/* <ArrowBackIcon
                style={{ cursor: 'pointer', marginRight: '10px' }} 
                onClick={() => navigate('/Alarmlog')} 
            /> */}
            <div style={{ flex: '1', textAlign: 'center' }}>
                <span style={titleStyle}>Notification Log</span>
            </div>
        </div>
    );
};

const perPage = 5;
const Notificationlog = () => {
    const classes = useStyles();
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [items, setItems] = useState([]);
    const [sessionTimeoutAlert, setSessionTimeoutAlert] = useState(false);
    const navigate = useNavigate();
    const sessionTimer = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${config.backendAPI}/alarm/notidata`);
                const data = await response.json();
                setItems(data);
                setTotalPages(Math.ceil(data.length / perPage));
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const startSessionTimer = () => {
            const sessionDuration = 1 * 24 *60 * 60 * 60 * 60 * 1000; // 1 day
            return setTimeout(() => {
                setSessionTimeoutAlert(true);
            }, sessionDuration);
        };

        const resetTimer = () => {
            clearTimeout(sessionTimer.current);
            sessionTimer.current = startSessionTimer();
        };

        sessionTimer.current = startSessionTimer();

        document.addEventListener("mousemove", resetTimer);
        document.addEventListener("keypress", resetTimer);

        return () => {
            clearTimeout(sessionTimer.current);
            document.removeEventListener("mousemove", resetTimer);
            document.removeEventListener("keypress", resetTimer);
        };
    }, []);

    const handleSessionTimeoutAlertClose = () => {
        setSessionTimeoutAlert(false);
        navigate("/login");
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
      };
    
    const handlePrevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
      };

    const markAsRead = async (id) => {
        try {
            const response = await fetch(`${config.backendAPI}/alarm/markAsRead/${id}`, {
                method: 'PUT',
            });
            if (response.ok) {
                const closedNotification = items.find((item) => item.id === id);
                setItems((prevItems) => prevItems.filter((item) => item.id !== id));
                localStorage.setItem(`notification_${id}`, JSON.stringify(closedNotification));
                console.log('Notification marked as read successfully');
            } else {
                console.error('Failed to mark notification as read');
            }
        } catch (error) {
            console.error('Error marking notification as read:', error.message);
        }
    };

    const tableStyle = {
        borderCollapse: 'collapse',
        width: '97vw',
    };

    const thStyle = {
        border: '1px solid #fff',
        textAlign: 'center',
        color: '#fff',
        padding: '8px',
        backgroundColor: '#black',
    };

    const tdStyle = {
        border: '1px solid #fff',
        color: '#fff',
        textAlign: 'center',
        padding: '8px',
    };

    const buttonStyle = {
        padding: '6px 12px',
        backgroundColor: 'black',
        color: '#007bff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    };

    return (
        <div style={styles.body}>
            <AppBar />
            <div className="alarm-logs" style={{ backgroundColor: 'black', padding: '1.5vw' , height: '40.2vw'}}>
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thStyle}>Status</th>
                            <th style={thStyle}>Occurrence</th>
                            <th style={thStyle}>Location</th>
                            <th style={thStyle}>Timestamp</th>
                            <th style={thStyle}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items
                        .slice((currentPage - 1) * perPage, currentPage * perPage)
                        .map(log => (
                            <tr key={log.id}>
                                <td style={tdStyle}>{log.status}</td>
                                <td style={tdStyle}>{log.location}</td>
                                <td style={tdStyle}>{log.occurrence}</td>
                                <td style={tdStyle}>{log.timeerror}</td>
                                <td style={tdStyle}>
                                    <button
                                        style={buttonStyle}
                                        onClick={() => markAsRead(log.id)}
                                    >
                                        Mark As Read
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        <div style={{marginTop:"1vw"}}>
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
        <Typography style={{width: '10vw', right: '10vw'}}
        className={ classes.pagination}>
          Page {currentPage} of {totalPages}
        </Typography>
     
            </div>
           
        </div>
    );
}

export default Notificationlog;
