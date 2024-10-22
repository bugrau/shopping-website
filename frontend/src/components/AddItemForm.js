import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/shoppingListSlice';
import { TextField, Button, Box, Grid, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function AddItemForm() {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() !== '') {
      dispatch(addItem({ name, quantity, category }));
      setName('');
      setQuantity(1);
      setCategory('');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="name"
              label="Item Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="quantity"
              label="Quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              InputProps={{ inputProps: { min: 1 } }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="category"
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ mt: 3 }}
        >
          Add Item
        </Button>
      </Box>
    </Paper>
  );
}

export default AddItemForm;
