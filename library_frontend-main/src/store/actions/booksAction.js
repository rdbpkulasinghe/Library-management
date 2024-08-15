import * as actionTypes from '../actionTypes/booksActionTypes';
import * as bookServices from '../../services/bookServices';

export const fetchBooksRequest = () => ({
  type: actionTypes.FETCH_BOOKS_REQUEST,
});

export const fetchBooksSuccess = books => ({
  type: actionTypes.FETCH_BOOKS_SUCCESS,
  payload: books,
});

export const fetchBooksFailure = error => ({
  type: actionTypes.FETCH_BOOKS_FAILURE,
  payload: error,
});

export const getAllBooks =
  (filter = null) =>
  async dispatch => {
    dispatch(fetchBooksRequest());
    try {
      const filteredBooks = await bookServices.getAllBooks(filter);
      dispatch(fetchBooksSuccess(filteredBooks));
    } catch (error) {
      dispatch(fetchBooksFailure(error.message));
    }
  };

export const searchBooks = query => (dispatch, getState) => {
  dispatch({ type: actionTypes.SEARCH_BOOKS_REQUEST });

  const allBooks = getState().bookReducer.books;

  // Perform a case-insensitive search based on the title or author
  const searchResults = allBooks.filter(
    book =>
      book.title.toLowerCase().includes(query.toLowerCase()) || book.author.toLowerCase().includes(query.toLowerCase()),
  );

  dispatch({
    type: actionTypes.SEARCH_BOOKS_SUCCESS,
    payload: searchResults,
  });
};

export const changeBookFilter = newFilter => ({
  type: actionTypes.CHANGE_BOOKS_FILTER,
  payload: newFilter,
});

// create a book

export const createBookRequest = () => ({
  type: actionTypes.CREATE_BOOK_REQUEST,
});

export const createBookSuccess = book => ({
  type: actionTypes.CREATE_BOOK_SUCCESS,
  payload: book,
});

export const createBookFailure = error => ({
  type: actionTypes.CREATE_BOOK_FAILURE,
  payload: error,
});

export const createBook = newBook => async (dispatch, getState) => {
  const token = getState().authReducer.user.token;

  dispatch(createBookRequest());
  try {
    const createdBook = await bookServices.createBook(newBook, token);
    dispatch(createBookSuccess(createdBook));
  } catch (error) {
    dispatch(createBookFailure(error.message));
  }
};

// update book actions
export const updateBookRequest = () => ({
  type: actionTypes.UPDATE_BOOK_REQUEST,
});

export const updateBookSuccess = updatedBook => ({
  type: actionTypes.UPDATE_BOOK_SUCCESS,
  payload: updatedBook,
});

export const updateBookFailure = error => ({
  type: actionTypes.UPDATE_BOOK_FAILURE,
  payload: error,
});

// update book action creator
export const updateBook = (bookId, updatedBook) => async (dispatch, getState) => {
  const token = getState().authReducer.user.token;

  dispatch(updateBookRequest());
  try {
    const updatedBookData = await bookServices.updateBookById(bookId, updatedBook, token);
    dispatch(updateBookSuccess(updatedBookData));
  } catch (error) {
    dispatch(updateBookFailure(error.message));
  }
};

export const updateBookStatusCleanUp = () => ({
  type: actionTypes.UPDATE_BOOK_STATUS_CLEANUP,
});

export const createBookStatusCleanUp = () => ({
  type: actionTypes.CREATE_BOOK_STATUS_CLEANUP,
});

export const deleteBookStatusCleanUp = () => ({
  type: actionTypes.DELETE_BOOK_STATUS_CLEANUP,
});

// status
export const fetchStatsRequest = () => ({
  type: actionTypes.FETCH_STATS_REQUEST,
});

export const fetchStatsSuccess = stats => ({
  type: actionTypes.FETCH_STATS_SUCCESS,
  payload: stats,
});

export const fetchStatsFailure = error => ({
  type: actionTypes.FETCH_STATS_FAILURE,
  payload: error,
});

export const getAuthorsAndCounts = () => async (dispatch, getState) => {
  const token = getState().authReducer.user.token;
  dispatch(fetchStatsRequest());
  try {
    const stats = await bookServices.getAuthorsAndCounts(token);
    dispatch(fetchStatsSuccess(stats));
  } catch (error) {
    dispatch(fetchStatsFailure(error.message));
  }
};

// delete

export const deleteBookRequest = () => ({
  type: actionTypes.DELETE_BOOK_REQUEST,
});

export const deleteBookSuccess = bookId => ({
  type: actionTypes.DELETE_BOOK_SUCCESS,
  payload: bookId,
});

export const deleteBookFailure = error => ({
  type: actionTypes.DELETE_BOOK_FAILURE,
  payload: error,
});

export const deleteBookById = bookId => async (dispatch, getState) => {
  dispatch(deleteBookRequest());
  const token = getState().authReducer.user.token;
  try {
    await bookServices.deleteBookById(bookId, token);
    dispatch(deleteBookSuccess(bookId));
  } catch (error) {
    dispatch(deleteBookFailure(error.message));
  }
};
