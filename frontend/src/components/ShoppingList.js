import React from 'react';
import { useDispatch } from 'react-redux';
import { updateItem, deleteItem } from '../redux/shoppingListSlice';
import { 
  List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction,
  IconButton, Checkbox, Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function ShoppingList({ items }) {
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
        <ListItem key={item.id} dense button onClick={() => handleToggle(item)}>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={item.purchased}
              tabIndex={-1}
              disableRipple
            />
          </ListItemIcon>
          <ListItemText
            primary={item.name}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Quantity: {item.quantity}
                </Typography>
                {" — "}
                {item.category || 'Uncategorized'}
              </React.Fragment>
            }
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
}

export default ShoppingList;
