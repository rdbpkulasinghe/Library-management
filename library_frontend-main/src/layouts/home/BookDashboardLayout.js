import React from 'react';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Alert, Box } from '@mui/material';
import AddNewBookCard from '../../components/home/AddNewBookCard';
import BookInfoSummeryCard from '../../components/home/BookInfoSummeryCard';
import DialogBoxWrapper from '../../components/common/DialogBoxWrapper';
import AddNewBookForm from '../../components/bookDashboard/AddNewBookForm';

export default function BookDashboardLayout({ handleAddBook, isBookAdded, stats, bookAddedStateCleanUp, loading }) {
  return (
    <Box>
      <Grid2 container spacing={4}>
        <Grid2 xs={6} sm={4} md={3}>
          <DialogBoxWrapper
            cleanup={bookAddedStateCleanUp}
            mainComponent={
              isBookAdded ? (
                <Alert severity='success'> Book Added Successfully!</Alert>
              ) : (
                <AddNewBookForm onSubmit={handleAddBook} loading={loading} />
              )
            }
            title={'Add new Book'}
          >
            <AddNewBookCard />
          </DialogBoxWrapper>
        </Grid2>
        <Grid2 xs={6} sm={8} md={9}>
          {stats && Object.keys(stats).length > 0 && (
            <BookInfoSummeryCard
              authers={stats.availableBooksCount}
              totalBooks={stats.totalBooksCount}
              availableBooks={stats.availableBooksCount}
            />
          )}
        </Grid2>
      </Grid2>
    </Box>
  );
}
