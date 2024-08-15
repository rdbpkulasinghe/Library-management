import { Typography } from '@mui/material';
import React from 'react';

export default function SingleTypography({ label, value, isDescription, isGenre }) {
  return (
    <Typography sx={{ fontSize: isDescription ? '12px' : '15px', color: 'gray', py: '2px' }}>
      {label}:{' '}
      <b style={{ color: 'black' }}>
        {isGenre
          ? value.map((val, key) => {
              return (
                <span key={key}>
                  {val}
                  {key < value.length - 1 ? ',' : ''}{' '}
                </span>
              );
            })
          : value}
      </b>
    </Typography>
  );
}
