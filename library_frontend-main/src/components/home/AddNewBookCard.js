import React from 'react';
import { Box, Typography } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';

export default function AddNewBookCard() {
  return (
    <Box
      sx={{
        height: '200px',
        width: '100%',
        bgcolor: '#2740b0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '20px',
        cursor: 'pointer',
      }}
    >
      <AddBoxIcon sx={{ color: 'white' }} />
      <Typography sx={{ fontSize: '20px', color: 'white', fontWeight: 'bold' }}>Add New Book</Typography>
    </Box>
  );
}
