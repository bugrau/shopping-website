import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';



const API_URL = 'http://localhost:8000/api';



export const fetchItems = createAsyncThunk(
  'shoppingList/fetchItems',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const response = await axios.get(`${API_URL}/items`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);





export const addItem = createAsyncThunk(
  'shoppingList/addItem',
  async (item, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const response = await axios.post(`${API_URL}/items`, item, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);





export const updateItem = createAsyncThunk(
  'shoppingList/updateItem',
  async (item, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const response = await axios.put(`${API_URL}/items/${item.id}`, item, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);





export const deleteItem = createAsyncThunk(
  'shoppingList/deleteItem',
  async (id, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      await axios.delete(`${API_URL}/items/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
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

        state.error = action.payload?.message || 'Could not fetch items';

      })

      .addCase(addItem.fulfilled, (state, action) => {

        state.items.push(action.payload);

      })

      .addCase(addItem.rejected, (state, action) => {

        state.error = action.payload?.message || 'Could not add item';

      })

      .addCase(updateItem.fulfilled, (state, action) => {

        const index = state.items.findIndex((item) => item.id === action.payload.id);

        if (index !== -1) {

          state.items[index] = action.payload;

        }

      })

      .addCase(updateItem.rejected, (state, action) => {

        state.error = action.payload?.message || 'Could not update item';

      })

      .addCase(deleteItem.fulfilled, (state, action) => {

        state.items = state.items.filter((item) => item.id !== action.payload);

      })

      .addCase(deleteItem.rejected, (state, action) => {

        state.error = action.payload?.message || 'Could not delete item';

      });

  },

});





export default shoppingListSlice.reducer;





