import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';

const ExistingUsersTable = () => {
  const [page, setPage] = useState(0);
  const rowsPerPage = 3; // Set the rows per page to a fixed value of 3

  // Function to generate random user ID based on role
  const generateUserId = (role) => {
    const prefix = role.charAt(0).toUpperCase();
    const randomNumber = Math.floor(Math.random() * 90000) + 10000;
    return `${prefix}${randomNumber}`;
  };

  const users = [
    {
      userId: generateUserId('Admin'),
      username: 'john_doe',
      email: 'john@example.com',
      role: 'Admin',
      password: '******', // Replace with actual password if needed
    },
    {
      userId: generateUserId('Manager'),
      username: 'jane_smith',
      email: 'jane@example.com',
      role: 'Manager',
      password: '******', // Replace with actual password if needed
    },
    {
      userId: generateUserId('User'),
      username: 'bob_johnson',
      email: 'bob@example.com',
      role: 'User',
      password: '******', // Replace with actual password if needed
    },
    // Add more users as needed
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage);

  return (
    <>
      <TableContainer component={Paper}>
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
            {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.userId}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.password}</TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={5} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </>
  );
};

export default ExistingUsersTable;