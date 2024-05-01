// ExistingUsersTable.js
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
} from '@mui/material';


// const existingUsers = [
//   { userId: 1, username: 'user1', email: 'user1@example.com', role: 'admin', password: 'password1' },
//   { userId: 2, username: 'user2', email: 'user2@example.com', role: 'user', password: 'password2' },
//   { userId: 3, username: 'user3', email: 'user3@example.com', role: 'user', password: 'password3' },
// ];

const ExistingUsersTable = ({ users }) => {
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const rowsPerPage = 3; // Fixed rows per page

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  const filteredUsers = users.filter((user) =>
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

  return (
    <Box sx={{ border: '1px solid grey', padding: 2, borderRadius: 2, backgroundColor: '#f5f5f5' }}>
      <Typography variant="h5" component="div" gutterBottom style={{ color: '#333' }}>
        Existing Users
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
        <TextField
          label="Search by Role"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearch}
          size="small"
          style={{ maxWidth: '200px' }}
        />
      </Box>
      <TableContainer component={Paper} style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <Table aria-label="existing users table">
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Password</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => (
              <TableRow key={index} hover>
                <TableCell>{user.userId}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.password}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
        <Typography variant="body1" style={{ color: '#333' }}>
          Page {page + 1} of {totalPages}
        </Typography>
        <Box>
          <Button
            variant="contained"
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
            style={{ backgroundColor: '#333', color: '#fff' }}
          >
            Prev
          </Button>
          <Button
            variant="contained"
            disabled={page === totalPages - 1}
            onClick={() => setPage(page + 1)}
            style={{ backgroundColor: '#333', color: '#fff', marginLeft: '8px' }}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
};


export default ExistingUsersTable;