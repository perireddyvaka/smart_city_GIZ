import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import LockIcon from '@mui/icons-material/Lock';

import { useNavigate } from 'react-router-dom'; // Import useNavigate

function MainListItems() {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleItemClick = (path) => {
    navigate(path); // Use navigate to navigate to the specified path
  };

  return (
    <>
      <ListItemButton onClick={() => handleItemClick('/')}>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>
      <ListItemButton onClick={() => handleItemClick('/private')}>
        <ListItemIcon>
          <LockIcon />
        </ListItemIcon>
        <ListItemText primary="Private" />
      </ListItemButton>
    </>
  );
}

export default MainListItems;
