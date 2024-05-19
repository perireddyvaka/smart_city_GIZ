import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
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

const ExistingUsersTable = forwardRef((props, ref) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const rowsPerPage = 3;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/auth/");
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched users:", data); // Debug log
        setUsers(data);
        setFilteredUsers(data);
      } else {
        console.error('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useImperativeHandle(ref, () => ({
    fetchUsers,
  }));

  useEffect(() => {
    const filtered = users.filter(user =>
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [users, searchQuery]);

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

  return (
    <Box sx={{ border: '1px solid grey', padding: 2, borderRadius: 2, backgroundColor: '#f5f5f5' }}>
      <Typography variant="h5" align='center' component="div" gutterBottom style={{ color: '#333' }}>
        Existing Users
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
        <TextField
          label="Search by Role"
          variant="outlined"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
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
                <TableCell>{user.userid}</TableCell>
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
});

export default ExistingUsersTable;
