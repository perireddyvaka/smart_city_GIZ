import React, { useEffect, useState, useRef } from 'react';
// import logo from './logos.png';
// import IIITLogo from './iiith.png';
// import SCRCLogo from './scrc_logo.png';
// import BSESLogo from './BSES_logo1.png'
import {
    Dialog,
    Box,
    Typography,
    makeStyles,
    Button,
} from '@material-ui/core';
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ReplayIcon from "@mui/icons-material/Replay";
import { useNavigate } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import config from '../../config';

const useStyles = makeStyles((theme) => ({
    pagination: {
        color: "#fff",
        // Left: "30vw",
        position: "relative",
        left:"85vw",
        justifyContent: "right",
        display: "flex",
        width: "9vw",
        bottom: "2.vw"
      },
}));
const styles = {
    sessionTimeoutDialog: {
        width: "600px",
        padding: "48px",
        backgroundColor: "#f3e5f5",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    errorIcon: {
        fontSize: "96px",
        color: "#c51162",
        marginBottom: "24px",
    },
    sessionTimeoutText: {
        marginBottom: "16px",
        fontWeight: "bold",
    },
    loginAgainText: {
        display: "flex",
        alignItems: "center",
        marginBottom: "32px",
        fontSize: "18px",
    },
    loginAgainIcon: {
        marginRight: "8px",
    },
};

const AppBar = () => {
    const navigate = useNavigate();
   
    // const navigate = useNavigate();
    const appbarStyle = {
        // marginTop: '1vw',
        height: '3vw',
        backgroundColor: 'black',
        border: '1px solid #fff',
        color: '#ffffff',
        padding: '0.3vw 1.9vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        top: '10vw',
        width: '94.5vw',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
    };

    const titleStyle = {
        fontSize: '1.5rem',
    };

    return (
        <div style={appbarStyle}>
             <ArrowBackIcon
                style={{ cursor: 'pointer', marginRight: '10px' }} 
                onClick={() => navigate('/Alarmlog')} 
            />
           
            <div style={{ flex: '1', textAlign: 'center' }}>
                <span style={titleStyle}>Alarm Logs History</span>
            </div>
           
        </div>
    );
};

const perPage = 5;
const AlarmLogs = () => {
    
    const classes = useStyles();
    const [totalPages, setTotalPages] = useState(1);
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sessionTimeoutAlert, setSessionTimeoutAlert] = useState(false);
    const navigate = useNavigate();
    const sessionTimer = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${config.backendAPI}/alarm/alarmcloseddata`);
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
            const sessionDuration = 1 * 24 * 60 * 60 * 60 * 1000; // 1 day
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

    
    const tableStyle = {
        borderCollapse: 'collapse',
        width: '95vw',
    };

    const thStyle = {
        border: '1px solid #fff',
        textAlign: 'left',
        padding: '0.5vw',
        color: '#fff',
        backgroundColor: 'black',
    };

    const tdStyle = {
        border: '1px solid #fff',
        textAlign: 'left',
        padding: '0.5vw',
        color: '#fff',
        backgroundColor: 'black',
    };

    return (
        <div style={{backgroundColor: "black",}}>
            <AppBar />
            <div className="alarm-logs" 
            style={{ backgroundColor: 'black', padding: '2vw', height: '39.9vw', width: '94vw' }}>
                <table style={tableStyle}>
    <thead>
        <tr>
            <th style={thStyle}>Sl.No</th>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Location</th>
            <th style={thStyle}>Parameter: Threshold</th>
            <th style={thStyle}>Occurrence Count</th>
            <th style={thStyle}>Error Time</th>
            <th style={thStyle}>Resolved Time</th>
        </tr>
    </thead>
    <tbody>
        {items
        .slice((currentPage - 1) * perPage, currentPage * perPage)
        .map((log, index) => (
            <tr key={log.id}>
                <td style={tdStyle}>{(currentPage - 1) * perPage + index + 1}</td>
                <td style={tdStyle}>{log.id}</td>
                <td style={tdStyle}>{log.status}</td>
                <td style={tdStyle}>{log.Location}</td>
                <td style={tdStyle}>{log.occurrence}</td>
                <td style={tdStyle}>{log.occurrence_count}</td>
                <td style={tdStyle}>{log.record_time}</td>
                <td style={tdStyle}>{log.timeupdate}</td>
            </tr>
        ))}
    </tbody>
</table>

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
        <Typography style={{width: '10vw', right: '10vw', position: 'relative'}}
        className={ classes.pagination}>
          Page {currentPage} of {totalPages}
        </Typography>
     
        </div>
            {/* <Dialog
                open={sessionTimeoutAlert}
                onClose={handleSessionTimeoutAlertClose}
                PaperProps={{
                    style: styles.sessionTimeoutDialog,
                }}
            >
                <ErrorOutlineIcon style={styles.errorIcon} />
                <Typography variant="h5" gutterBottom style={styles.sessionTimeoutText}>
                    Oops!
                </Typography>
                <Typography variant="body1" gutterBottom style={styles.sessionTimeoutText}>
                    Your session is expired.
                </Typography>
                <Box style={styles.loginAgainText}>
                    <ReplayIcon style={styles.loginAgainIcon} />
                    <Typography variant="body1">Please kindly login again</Typography>
                </Box>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSessionTimeoutAlertClose}
                    autoFocus
                >
                    OK
                </Button>
            </Dialog> */}
        </div>
    );
}

export default AlarmLogs;
