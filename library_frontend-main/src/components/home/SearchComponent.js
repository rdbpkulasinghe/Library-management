import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Box, OutlinedInput } from '@mui/material';

export default function SearchComponent({ handleSearch }) {
  return (
    <Box>
      <OutlinedInput
        placeholder='Search with title or auther'
        fullWidth
        endAdornment={<SearchIcon />}
        onChange={e => handleSearch(e.target.value)}
      />
    </Box>
  );
}
