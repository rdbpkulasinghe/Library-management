// LoginPage.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Box, Button, Typography } from '@mui/material';
import LoginForm from '../components/login/LoginForm';
import { clearError, loginConfirm, loginUser } from '../store/actions/authAction';

const LoginPage = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector(store => store.authReducer);

  const handleLogin = data => {
    dispatch(loginUser({ ...data }));
  };

  const handleContinue = () => {
    dispatch(loginConfirm());
  };

  useEffect(() => {
    if (error) {
      const timeoutId = setTimeout(() => {
        // Auto-hide the error after (2 second)
        dispatch(clearError());
      }, 2000);

      return () => clearTimeout(timeoutId); // Clear the timeout if the component unmounts
    }
  }, [error, dispatch]);

  return (
    <Box sx={{ minHeight: '200px', px: '20px', width: '500px' }}>
      {user ? (
        <Box sx={{ mx: 'auto', pt: '40px' }}>
          <Typography variant='h5'>Welcome, {user.name}!</Typography>
          <Button sx={{ mt: '20px' }} onClick={handleContinue} variant='contained' color='warning'>
            Continue
          </Button>
        </Box>
      ) : (
        <>
          <LoginForm onSubmit={handleLogin} errors={error} loading={loading} />
          {error && (
            <Alert severity='error' sx={{ my: '20px' }}>
              {error}
            </Alert>
          )}
          <Alert severity='warning' sx={{ mt: '20px' }}>
            <Typography sx={{ mb: '15px' }}> Warning: Unauthorized Access!</Typography>
            <Typography sx={{ mt: '10px', fontSize: '15px' }}>
              If you are the administrator of this system, please proceed to login. Unauthorized login attempts are
              strictly prohibited.
            </Typography>
            <Typography sx={{ mt: '10px', fontSize: '12px' }}>
              Note: If you are not the administrator, attempting to login is a violation of system policies. Please
              refrain from unauthorized access.
            </Typography>
          </Alert>
        </>
      )}
    </Box>
  );
};

export default LoginPage;
