import React from 'react';
import { useDispatch } from 'react-redux';
import { updateItem, deleteItem } from '../redux/shoppingListSlice';
import { 
  List, ListItem, ListItemText, ListItemSecondaryAction,
  IconButton, Checkbox
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ShoppingList = ({ items }) => {
  const dispatch = useDispatch();

  const handleToggle = (item) => {
    dispatch(updateItem({ ...item, purchased: !item.purchased }));
  };

  const handleDelete = (id) => {
    dispatch(deleteItem(id));
  };

  return (
    <List>
      {items.map((item) => (
        <ListItem key={item.id} disablePadding>
          <Checkbox
            edge="start"
            checked={Boolean(item.purchased)} // Convert to boolean
            onChange={() => handleToggle(item)}
          />
          <ListItemText
            primary={item.name}
            secondary={`Quantity: ${item.quantity}`}
            style={{ textDecoration: item.purchased ? 'line-through' : 'none' }}
          />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(item.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default ShoppingList;
