import React from 'react';

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
        <div className="alarm-logs">
            <h2>Alarm Logs History</h2>
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
    );
}

export default AlarmLogs;
