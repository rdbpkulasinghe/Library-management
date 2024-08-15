import React from 'react';
import { Box, Typography } from '@mui/material';

export default function BookInfoSummeryCard({ authers, totalBooks, availableBooks }) {
  return (
    <Box
      sx={{
        height: '200px',
        width: '100%',
        bgcolor: '#1d7b80',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '20px',
      }}
    >
      <Box sx={{ p: '20px' }}>
        <Typography sx={{ fontSize: '18px', color: 'white' }}>Different authors : {authers}</Typography>
        <Typography sx={{ fontSize: '18px', color: 'white' }}>Number of books : {totalBooks}</Typography>
        <Typography sx={{ fontSize: '18px', color: 'white' }}>Number of available books : {availableBooks}</Typography>
      </Box>
    </Box>
  );
}
