import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { appData } from '../../config/constants';

export default function Filters({ handleChange, value }) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id='simple-select-label'>Availability</InputLabel>
        <Select
          labelId='simple-select-label'
          id='simple-select'
          value={value}
          label='Availability'
          onChange={e => handleChange(e.target.value)}
        >
          <MenuItem value={appData.filterValues[0]}>All</MenuItem>
          <MenuItem value={appData.filterValues[1]}>Availabile</MenuItem>
          <MenuItem value={appData.filterValues[2]}>Not Availabile</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
