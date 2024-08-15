import axios from 'axios';
import { appData } from '../config/constants';

const BASE_URL = `${appData.apiBaseUrl}/api/books`; // Adjust the base URL according to your backend API

// Function to fetch all books
export const getAllBooks = async (filter = null) => {
  try {
    // Modify your API call to include the filter if provided
    const response = await axios.get(`${BASE_URL}/get-books`, { params: { isAvailable: filter } });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch books');
  }
};

// Function to fetch a single book by ID
export const getBookById = async bookId => {
  try {
    const response = await axios.get(`${BASE_URL}/${bookId}`);
    return response.data;
  } catch (error) {
    // Handle or log the error as needed
    throw error;
  }
};

// Function to create a new book
export const createBook = async (newBook, token) => {
  try {
    const response = await axios.post(BASE_URL, newBook, {
      headers: {
        Authorization: `${token}`, // Include the JWT token in the authorization header
      },
    });
    return response.data;
  } catch (error) {
    // Handle or log the error as needed
    throw error;
  }
};

// Function to update a book by ID
export const updateBookById = async (bookId, updatedBook, token) => {
  try {
    const response = await axios.put(`${BASE_URL}/${bookId}`, updatedBook, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return response.data;
  } catch (error) {
    // Handle or log the error as needed
    throw error;
  }
};

// Function to delete a book by ID
export const deleteBookById = async (bookId, token) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${bookId}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to delete the book');
  }
};

// get stats
export const getAuthorsAndCounts = async token => {
  try {
    const response = await axios.get(`${BASE_URL}/authors-and-counts`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch author counts');
  }
};
