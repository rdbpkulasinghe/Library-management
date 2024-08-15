import { Box } from '@mui/material';
import React from 'react';
import SingleTypography from './viewSingleBook/SingleTypography';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import BookImageWithAltImage from '../common/BookImageWithAltImage';

export default function ViewSingleBook({ title, image, author, genre, description, isAvailable }) {
  return (
    <Box sx={{ minWidth: '400px', p: '10px' }}>
      <Grid2 container spacing={2}>
        <Grid2 xs={8}>
          <SingleTypography label={'Title'} value={title} />
          <SingleTypography label={'Author'} value={author} />
          <SingleTypography label={'Genre'} value={genre} isGenre />
          <SingleTypography label={'Description'} value={description} isDescription />
        </Grid2>
        <Grid2 xs={4}>
          <BookImageWithAltImage image={image} title={title} />
        </Grid2>
      </Grid2>
    </Box>
  );
}
