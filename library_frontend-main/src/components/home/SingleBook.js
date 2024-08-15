import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import BookImageWithAltImage from '../common/BookImageWithAltImage';

export default function SingleBook({ title, image, author, genre, isAvailable }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      sx={{
        cursor: 'pointer',
        height: '100%',
        position: 'relative',
        '&:hover .overlay': {
          height: isHovered ? '100%' : '0',
        },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <BookImageWithAltImage image={image} title={title} />
      <Grid2 container justifyContent={'space-between'} alignItems={'center'}>
        <Grid2 xs={11}>
          <Typography sx={{ color: 'grey' }}>{title}</Typography>
        </Grid2>
        <Grid2>
          <Box
            sx={{ width: '20px', height: '20px', bgcolor: isAvailable ? 'green' : 'red', borderRadius: '100px' }}
          ></Box>
        </Grid2>
      </Grid2>
      <Box
        className='overlay'
        sx={{
          position: 'absolute',
          height: '0',
          overflow: 'hidden',
          bgcolor: 'rgba(217,217,217,0.9)',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          transition: 'height 0.3s ease',
        }}
      >
        <Box sx={{ pl: '10px', pt: '150px', pr: '10px' }}>
          <Box sx={{ mb: '30px' }}>
            {genre &&
              genre.map((val, key) => {
                return (
                  <Typography sx={{ fontWeight: 'bold', fontSize: '15px' }} key={key}>
                    {val}
                  </Typography>
                );
              })}
          </Box>
          <Typography sx={{ fontWeight: 'bold', fontSize: '25px' }}>{title}</Typography>
          <Typography sx={{ fontWeight: 'bold', fontSize: '15px' }}>{author}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
