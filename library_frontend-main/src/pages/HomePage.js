import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import TopNavigation from '../components/common/TopNavigation';
import SearchFilterLayout from '../layouts/home/SearchFilterLayout';
import BookList from '../layouts/home/BookList';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllBooks,
  searchBooks,
  changeBookFilter,
  createBook,
  updateBook,
  updateBookStatusCleanUp,
  getAuthorsAndCounts,
  deleteBookById,
  createBookStatusCleanUp,
  deleteBookStatusCleanUp,
} from '../store/actions/booksAction';
import { logout } from '../store/actions/authAction';
import { appData } from '../config/constants';
import BookDashboardLayout from '../layouts/home/BookDashboardLayout';

export default function HomePage() {
  const dispatch = useDispatch();

  const [isOnEdit, setIsOnEdit] = useState(false);

  const {
    displayBooks: books,
    loading,
    error,
    currentFilter,
    isBookAdded,
    isBookUpdated,
    isBookDeleted,
    stats,
    deleteLoading,
    updateBookLoading,
  } = useSelector(store => store.bookReducer);
  const { isLoginConfirm } = useSelector(store => store.authReducer);

  useEffect(() => {
    if (currentFilter === appData.filterValues[0]) {
      dispatch(getAllBooks());
    } else if (currentFilter === appData.filterValues[1]) {
      dispatch(getAllBooks(true));
    } else {
      dispatch(getAllBooks(false));
    }
  }, [currentFilter, dispatch]);

  useEffect(() => {
    if (isLoginConfirm) {
      dispatch(getAuthorsAndCounts());
    }
  }, [isLoginConfirm, dispatch]);

  const handleSearch = query => {
    dispatch(searchBooks(query));
  };

  const handleFilter = value => {
    dispatch(changeBookFilter(value));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleAddBook = data => {
    dispatch(createBook(data));
  };

  const handleEditMode = () => {
    setIsOnEdit(!isOnEdit);
  };

  const handleUpdateBook = data => {
    dispatch(updateBook(data._id, data));
  };

  const bookUpdatedStateCleanUp = () => {
    setTimeout(() => {
      dispatch(updateBookStatusCleanUp());
    }, 100);
  };

  const bookAddedStateCleanUp = () => {
    setTimeout(() => {
      dispatch(createBookStatusCleanUp());
    }, 100);
  };

  const bookDeletedStateCleanUp = () => {
    setTimeout(() => {
      dispatch(deleteBookStatusCleanUp());
    }, 100);
  };

  const bookUpdateOrDeleteStatusCleanUp = () => {
    bookUpdatedStateCleanUp();
    bookDeletedStateCleanUp();
  };

  const handleDeleteBook = id => {
    dispatch(deleteBookById(id));
  };
  return (
    <Box sx={{ mx: 'auto', maxWidth: 'lg', mt: '30px', px: '10px' }}>
      <TopNavigation isLoggedIn={isLoginConfirm} handleLogout={handleLogout} />
      <Box sx={{ mt: '40px' }}>
        <SearchFilterLayout handleSearch={handleSearch} handleFilter={handleFilter} currentFilter={currentFilter} />
      </Box>
      <Box sx={{ mt: '30px' }}>
        {isLoginConfirm && (
          <BookDashboardLayout
            loading={loading}
            handleAddBook={handleAddBook}
            isBookAdded={isBookAdded}
            stats={stats}
            bookAddedStateCleanUp={bookAddedStateCleanUp}
          />
        )}
        {loading ? (
          <Typography>Loading....</Typography>
        ) : error ? (
          <Typography>Error</Typography>
        ) : books && books.length > 0 ? (
          <BookList
            loading={updateBookLoading}
            deleteLoading={deleteLoading}
            cleanup={bookUpdateOrDeleteStatusCleanUp}
            isBookUpdated={isBookUpdated}
            isBookDeleted={isBookDeleted}
            isLoginConfirm={isLoginConfirm}
            books={books}
            isOnEdit={isOnEdit}
            handleEditMode={handleEditMode}
            handleUpdateBook={handleUpdateBook}
            handleDeleteBook={handleDeleteBook}
          />
        ) : (
          !loading && loading !== '' && <Typography> No books found</Typography>
        )}
      </Box>
    </Box>
  );
}
