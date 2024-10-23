import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

import { logout } from './authSlice'; // Add this import




const API_URL = 'http://localhost:8000/api';

// Helper function to get the auth token
// Commented out for now, but kept for potential future use
// const getAuthToken = () => {
//   const auth = JSON.parse(localStorage.getItem('auth'));
//   console.log('Auth from localStorage:', auth);
//   return auth ? auth.access_token : null;
// };





export const fetchItems = createAsyncThunk(
  'shoppingList/fetchItems',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      console.log('Fetching items with token:', auth.token);
      const response = await axios.get(`${API_URL}/shopping-list`, {
        headers: { Authorization: `Bearer ${auth.token}` }
      });
      console.log('Fetched items:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching items:', error);
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch items');
    }
  }
);





export const addItem = createAsyncThunk(
  'shoppingList/addItem',
  async (item, { getState }) => {
    const { auth } = getState();
    const response = await axios.post(`${API_URL}/shopping-list`, { ...item, purchased: false }, {
      headers: { Authorization: `Bearer ${auth.token}` }
    });
    return response.data;
  }
);





export const updateItem = createAsyncThunk(
  'shoppingList/updateItem',
  async (item, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await axios.put(`${API_URL}/shopping-list/${item.id}`, item, {
        headers: { Authorization: `Bearer ${auth.token}` }
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return rejectWithValue('Item not found');
      }
      throw error;
    }
  }
);





export const deleteItem = createAsyncThunk(
  'shoppingList/deleteItem',
  async (id, { getState }) => {
    const { auth } = getState();
    await axios.delete(`${API_URL}/shopping-list/${id}`, {
      headers: { Authorization: `Bearer ${auth.token}` }
    });
    return id;
  }
);





const shoppingListSlice = createSlice({

  name: 'shoppingList',

  initialState: {

    items: [],

    status: 'idle',

    error: null,

  },

  reducers: {},

  extraReducers: (builder) => {

    builder

      .addCase(fetchItems.pending, (state) => {

        state.status = 'loading';

      })

      .addCase(fetchItems.fulfilled, (state, action) => {

        state.status = 'succeeded';

        state.items = action.payload;

      })

      .addCase(fetchItems.rejected, (state, action) => {

        state.status = 'failed';

        state.error = action.error.message;

      })

      .addCase(addItem.fulfilled, (state, action) => {

        state.items.push(action.payload);

      })

      .addCase(updateItem.fulfilled, (state, action) => {

        const index = state.items.findIndex((item) => item.id === action.payload.id);

        if (index !== -1) {

          state.items[index] = action.payload;

        }

      })

      .addCase(deleteItem.fulfilled, (state, action) => {

        state.items = state.items.filter((item) => item.id !== action.payload);

      })

      .addCase(updateItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to update item';
      })

      .addCase(logout, (state) => {
        state.items = [];
        state.status = 'idle';
        state.error = null;
      });

  },

});





export default shoppingListSlice.reducer;





