import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { appData } from '../../config/constants';
import DialogBoxWrapper from './DialogBoxWrapper';
import LoginPage from '../../pages/LoginPage';

export default function TopNavigation({ isLoggedIn, handleLogout }) {
  return (
    <Grid2 container justifyContent={'space-between'} alignContent={'center'} alignItems={'center'}>
      <Grid2>
        <Box sx={{ bgcolor: 'pink', px: '20px', py: '10px' }}>
          <Typography sx={{ fontWeight: 'bold', fontSize: '25px' }}>{appData.productName} </Typography>
        </Box>
      </Grid2>
      <Grid2>
        {isLoggedIn ? (
          <Button sx={{ width: '160px' }} variant='contained' color='secondary' onClick={handleLogout}>
            LogOut
          </Button>
        ) : (
          <DialogBoxWrapper title={'Admin Login'} mainComponent={<LoginPage />}>
            <Button sx={{ width: '160px' }} variant='contained'>
              Login
            </Button>
          </DialogBoxWrapper>
        )}
      </Grid2>
    </Grid2>
  );
}
