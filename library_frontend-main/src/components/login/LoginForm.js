// LoginForm.js
import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box } from '@mui/material';
import * as yup from 'yup';

const LoginForm = ({ onSubmit, loading }) => {
  const { control, handleSubmit, formState } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        email: yup
          .string()
          .required('Email is required')
          .email('Enter a valid email address')
          .test('valid-email', 'Invalid email address', value => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value);
          }),
        password: yup.string().required('Password is required'),
      }),
    ),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Controller
          name='email'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <TextField
              {...field}
              label='Email'
              variant='outlined'
              fullWidth
              error={!!formState.errors.email}
              helperText={formState.errors.email?.message}
              autoComplete='username'
            />
          )}
        />
        <Controller
          name='password'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <TextField
              {...field}
              type='password'
              label='Password'
              variant='outlined'
              fullWidth
              error={!!formState.errors.password}
              helperText={formState.errors.password?.message}
              autoComplete='current-password'
            />
          )}
        />
        <Button type='submit' variant='contained' color='primary' disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </Box>
    </form>
  );
};

export default LoginForm;
