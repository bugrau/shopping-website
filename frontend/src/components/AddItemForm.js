import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/shoppingListSlice';
import { TextField, Button, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const AddItemForm = () => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      dispatch(addItem({ name, quantity: Number(quantity) }));
      setName('');
      setQuantity(1);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, mt: 2 }}>
      <TextField
        label="Item name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        fullWidth
      />
      <TextField
        type="number"
        label="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        inputProps={{ min: "1" }}
        sx={{ width: '100px' }}
      />
      <Button type="submit" variant="contained" startIcon={<AddIcon />}>
        Add Item
      </Button>
    </Box>
  );
};

export default AddItemForm;
