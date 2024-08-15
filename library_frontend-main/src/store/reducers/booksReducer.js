// reducer.js
import { appData } from '../../config/constants';
import * as actionTypes from '../actionTypes/booksActionTypes';

const initialState = {
  books: [],
  displayBooks: [],
  loading: false,
  error: null,
  isBookAdded: '',
  currentFilter: appData.filterValues[0],
  updateBookLoading: false,
  isBookUpdated: '',
  statsLoading: false,
  stats: null,
  statsError: null,
  deleteLoading: false,
  deleteError: '',
  isBookDeleted: '',
};

const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_BOOKS_REQUEST:
      return { ...state, loading: true, error: null };
    case actionTypes.FETCH_BOOKS_SUCCESS:
      return { ...state, loading: false, books: action.payload, displayBooks: action.payload, error: null };
    case actionTypes.FETCH_BOOKS_FAILURE:
      return { ...state, loading: false, books: [], error: action.payload };
    case actionTypes.SEARCH_BOOKS_SUCCESS:
      return { ...state, loading: false, displayBooks: action.payload, error: null };
    case actionTypes.CHANGE_BOOKS_FILTER:
      return { ...state, currentFilter: action.payload };
    case actionTypes.CREATE_BOOK_REQUEST:
      return { ...state, loading: true, error: null, isBookAdded: false };
    case actionTypes.CREATE_BOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        isBookAdded: true,
        books: [...state.books, action.payload], // Update books array with the new book
        displayBooks: [action.payload, ...state.displayBooks], // Update displayBooks array with the new book
        error: null,
      };
    case actionTypes.CREATE_BOOK_FAILURE:
      return { ...state, loading: false, error: action.payload, isBookAdded: false };

    case actionTypes.CREATE_BOOK_STATUS_CLEANUP:
      return { ...state, isBookAdded: false };

    case actionTypes.UPDATE_BOOK_REQUEST:
      return {
        ...state,
        updateBookLoading: true,
        error: null,
        isBookUpdated: false,
      };
    case actionTypes.UPDATE_BOOK_SUCCESS:
      // Find and update the existing book in the state
      const updatedBooks = state.books.map(book =>
        book._id === action.payload._id ? { ...book, ...action.payload } : book,
      );
      return {
        ...state,
        updateBookLoading: false,
        books: updatedBooks,
        displayBooks: updatedBooks,
        error: null,
        isBookUpdated: true,
      };
    case actionTypes.UPDATE_BOOK_FAILURE:
      return { ...state, updateBookLoading: false, error: action.payload, isBookUpdated: false };

    case actionTypes.UPDATE_BOOK_STATUS_CLEANUP:
      return { ...state, isBookUpdated: false };

    case actionTypes.FETCH_STATS_REQUEST:
      return { ...state, statsLoading: true, statsError: null };
    case actionTypes.FETCH_STATS_SUCCESS:
      return { ...state, statsLoading: false, stats: action.payload, statsError: null };
    case actionTypes.FETCH_STATS_FAILURE:
      return { ...state, statsLoading: false, stats: null, statsError: action.payload };

    case actionTypes.DELETE_BOOK_REQUEST:
      return { ...state, deleteLoading: true, deleteError: null, isBookDeleted: false };
    case actionTypes.DELETE_BOOK_SUCCESS:
      const updatedBooksAfterDeletion = state.books.filter(book => book._id !== action.payload);
      return {
        ...state,
        deleteLoading: false,
        books: updatedBooksAfterDeletion,
        displayBooks: updatedBooksAfterDeletion,
        deleteError: null,
        isBookDeleted: true,
      };
    case actionTypes.DELETE_BOOK_FAILURE:
      return { ...state, deleteLoading: false, deleteError: action.payload, isBookDeleted: false };

    case actionTypes.DELETE_BOOK_STATUS_CLEANUP:
      return { ...state, isBookDeleted: false };
    default:
      return state;
  }
};

export default bookReducer;
