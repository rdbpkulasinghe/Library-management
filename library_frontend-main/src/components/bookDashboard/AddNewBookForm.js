import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box, FormControlLabel, Checkbox } from '@mui/material';
import * as yup from 'yup';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

const AddNewBookForm = ({ onSubmit, loading, isOnEdit, initialValues, handleDeleteBook, deleteLoading }) => {
  const { control, handleSubmit, formState } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        title: yup.string().required('Title is required'),
        author: yup.string().required('Author is required'),
        genre: yup.string().required('Genre is required'),
        isAvailable: yup.boolean().required('Availability is required'),
        image: yup.string().required('Image is required').url('Enter a valid URL for the image'),
        description: yup.string().required('Description is required'),
      }),
    ),
    defaultValues: initialValues ? { ...initialValues, genre: initialValues.genre.join(',') } : {},
  });

  return (
    <Box sx={{ minWidth: '400px' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid2 container justifyContent={'space-between'} spacing={2}>
          <Grid2 xs={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Controller
                name='title'
                control={control}
                defaultValue=''
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Title'
                    variant='outlined'
                    fullWidth
                    error={!!formState.errors.title}
                    helperText={formState.errors.title?.message}
                  />
                )}
              />
              <Controller
                name='author'
                control={control}
                defaultValue=''
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Author'
                    variant='outlined'
                    fullWidth
                    error={!!formState.errors.author}
                    helperText={formState.errors.author?.message}
                  />
                )}
              />
              <Controller
                name='genre'
                control={control}
                defaultValue=''
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Genre'
                    variant='outlined'
                    fullWidth
                    error={!!formState.errors.genre}
                    helperText={formState.errors.genre?.message}
                  />
                )}
              />
              <Controller
                name='isAvailable'
                defaultValue={false}
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} />}
                    label='Is Available'
                    error={formState.errors.isAvailable ? true : undefined}
                  />
                )}
              />
              <Controller
                name='description'
                control={control}
                defaultValue=''
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Description'
                    variant='outlined'
                    fullWidth
                    multiline
                    rows={4}
                    error={!!formState.errors.description}
                    helperText={formState.errors.description?.message}
                  />
                )}
              />
            </Box>
          </Grid2>
          <Grid2 xs={6}>
            <Controller
              name='image'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <>
                  <TextField
                    {...field}
                    label='Image Link'
                    variant='outlined'
                    fullWidth
                    error={!!formState.errors.image}
                    helperText={formState.errors.image?.message}
                  />
                  {field.value && (
                    <img
                      src={field.value}
                      alt='Preview'
                      style={{ width: '100%', height: 'auto', maxHeight: '400px', marginTop: '8px' }}
                    />
                  )}
                </>
              )}
            />
          </Grid2>
          <Grid2 xs={6}>
            {isOnEdit && (
              <Button
                onClick={() => handleDeleteBook(initialValues._id)}
                fullWidth
                variant='contained'
                color='error'
                disabled={deleteLoading}
              >
                {deleteLoading ? 'Deleting Book...' : 'Delete Book'}
              </Button>
            )}
          </Grid2>
          <Grid2 xs={6}>
            <Button fullWidth type='submit' variant='contained' color='primary' disabled={loading}>
              {loading ? (isOnEdit ? 'Updating Book...' : 'Adding Book...') : 'Save Changes'}
            </Button>
          </Grid2>
        </Grid2>
      </form>
    </Box>
  );
};

export default AddNewBookForm;
