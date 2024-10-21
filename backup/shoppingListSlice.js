import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const fetchItems = createAsyncThunk('shoppingList/fetchItems', async () => {
  const response = await axios.get(`${API_URL}/items`);
  return response.data;
});

export const addItem = createAsyncThunk('shoppingList/addItem', async (item) => {
  const response = await axios.post(`${API_URL}/items`, item);
  return response.data;
});

export const updateItem = createAsyncThunk('shoppingList/updateItem', async (item) => {
  const response = await axios.put(`${API_URL}/items/${item.id}`, item);
  return response.data;
});

export const deleteItem = createAsyncThunk('shoppingList/deleteItem', async (id) => {
  await axios.delete(`${API_URL}/items/${id}`);
  return id;
});

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
      });
  },
});

export default shoppingListSlice.reducer;
