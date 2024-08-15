import React from 'react';
import { Alert, Box } from '@mui/material';
import SingleBook from '../../components/home/SingleBook';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import DialogBoxWrapper from '../../components/common/DialogBoxWrapper';
import ViewSingleBook from '../../components/books/ViewSingleBook';
import AddNewBookForm from '../../components/bookDashboard/AddNewBookForm';

export default function BookList({
  books,
  isOnEdit,
  handleEditMode,
  handleUpdateBook,
  handleDeleteBook,
  isLoginConfirm,
  isBookUpdated,
  cleanup,
  loading,
  deleteLoading,
  isBookDeleted,
}) {
  return (
    <Box>
      <Grid2 container spacing={4}>
        {books &&
          books.map((val, key) => {
            return (
              <Grid2 xs={6} sm={4} md={3} key={key} sx={{ my: '20px' }}>
                <DialogBoxWrapper
                  cleanup={isOnEdit && (isBookUpdated || isBookDeleted) ? cleanup : null}
                  extraButtons={
                    isLoginConfirm
                      ? isOnEdit && (isBookUpdated || isBookDeleted)
                        ? null
                        : [
                            isOnEdit
                              ? { title: 'Preview', handler: handleEditMode }
                              : { title: 'Edit', handler: handleEditMode },
                          ]
                      : null
                  }
                  dismissable
                  title={'View Book'}
                  mainComponent={
                    isLoginConfirm ? (
                      isOnEdit && (isBookUpdated || isBookDeleted) ? (
                        <Alert severity='success'> Book {isBookUpdated ? 'Updated' : 'Deleted'} successfully! </Alert>
                      ) : isOnEdit ? (
                        <AddNewBookForm
                          loading={loading}
                          deleteLoading={deleteLoading}
                          isOnEdit={isOnEdit}
                          initialValues={val}
                          onSubmit={handleUpdateBook}
                          handleDeleteBook={handleDeleteBook}
                        />
                      ) : (
                        <ViewSingleBook
                          title={val.title}
                          image={val.image}
                          author={val.author}
                          genre={val.genre}
                          description={val.description}
                          isAvailable={val.isAvailable}
                        />
                      )
                    ) : (
                      <ViewSingleBook
                        title={val.title}
                        image={val.image}
                        author={val.author}
                        genre={val.genre}
                        description={val.description}
                        isAvailable={val.isAvailable}
                      />
                    )
                  }
                >
                  <SingleBook
                    title={val.title}
                    image={val.image}
                    author={val.author}
                    genre={val.genre}
                    description={val.description}
                    isAvailable={val.isAvailable}
                  />
                </DialogBoxWrapper>
              </Grid2>
            );
          })}
      </Grid2>
    </Box>
  );
}
