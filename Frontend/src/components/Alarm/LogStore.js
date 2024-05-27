import React from 'react';
import logo from './logos.png'

const AppBar = () => {
    const appbarStyle = {
        backgroundColor: '#003366',
        color: '#ffffff',
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center', // Align items to the center horizontally
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Add shadow for depth
    };

    const titleStyle = {
        fontSize: '1.5rem', // Adjust font size
    };

    // const backButtonStyle = {
    //     cursor: 'pointer',
    //     textDecoration: 'underline',
    // };

    // const handleGoBack = () => {
    //     // Go back to the previous page
    //     window.history.back();
    // };

    return (
        <div style={appbarStyle}>
            <div>
                {/* Replace 'Logo' with your actual logo image */}
                <img src={logo} alt="" style={{ width: '100px', marginRight: '1px' }} />
            </div>
            <div style={{ flex: '1', textAlign: 'center' }}>
                <span style={titleStyle}>Alarm Logs History</span>
            </div>
            {/* <div>
                <span style={backButtonStyle} onClick={handleGoBack}>Back</span>
            </div> */}
        </div>
    );
};



const AlarmLogs = () => {
    // Dummy data for demonstration
    const alarmLogs = [
        { id: 1, status: "Resolved", location: "Location 1", problem: "Description 1", occurrenceCount: 3, resolvedTime: "2024-04-01T15:37:42.887Z", errorTime: "2024-04-01T14:00:00.000Z" },
        { id: 2, status: "Resolved", location: "Location 2", problem: "Description 2", occurrenceCount: 1, resolvedTime: "2024-04-02T10:20:30.123Z", errorTime: "2024-04-02T09:45:00.000Z" },
        { id: 3, status: "Resolved", location: "Location 3", problem: "Description 3", occurrenceCount: 2, resolvedTime: "2024-04-03T12:45:00.555Z", errorTime: "2024-04-03T12:15:00.000Z" },
        // Add more alarm logs here
    ];

    const tableStyle = {
        borderCollapse: 'collapse',
        width: '100%',
    };

    const thStyle = {
        border: '1px solid #dddddd',
        textAlign: 'left',
        padding: '8px',
        backgroundColor: '#f2f2f2',
    };

    const tdStyle = {
        border: '1px solid #dddddd',
        textAlign: 'left',
        padding: '8px',
    };

    return (
        <div>
            <AppBar />
            <div className="alarm-logs" style={{ backgroundColor: '#f5f5f5', padding: '20px' }}>
              
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thStyle}>ID</th>
                            <th style={thStyle}>Status</th>
                            <th style={thStyle}>Location</th>
                            <th style={thStyle}>Problem</th>
                            <th style={thStyle}>Occurrence Count</th>
                            <th style={thStyle}>Error Time</th>
                            <th style={thStyle}>Resolved Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alarmLogs.map(log => (
                            <tr key={log.id}>
                                <td style={tdStyle}>{log.id}</td>
                                <td style={tdStyle}>{log.status}</td>
                                <td style={tdStyle}>{log.location}</td>
                                <td style={tdStyle}>{log.problem}</td>
                                <td style={tdStyle}>{log.occurrenceCount}</td>
                                <td style={tdStyle}>{log.errorTime}</td>
                                <td style={tdStyle}>{log.resolvedTime}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AlarmLogs;
