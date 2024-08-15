import { Box } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import React from 'react';
import SearchComponent from '../../components/home/SearchComponent';
import Filters from '../../components/home/Filters';

export default function SearchFilterLayout({ handleSearch, handleFilter, currentFilter }) {
  return (
    <Box>
      <Grid2 container justifyContent={'space-between'} spacing={2}>
        <Grid2 xs={12} md={8}>
          <SearchComponent handleSearch={handleSearch} />
        </Grid2>
        <Grid2 xs={12} md={3}>
          <Filters handleChange={handleFilter} value={currentFilter} />
        </Grid2>
      </Grid2>
    </Box>
  );
}
