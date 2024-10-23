import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { fetchItems, updateItem, deleteItem } from '../redux/shoppingListSlice';
import { useNavigate } from 'react-router-dom';
import AddItemForm from './AddItemForm';
import { 
  Container, 
  Paper, 
  Typography, 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  Checkbox,
  Box,
  AppBar,
  Toolbar,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DeleteIcon from '@mui/icons-material/Delete';

const Dashboard = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { items, status, error } = useSelector((state) => state.shoppingList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && status === 'idle') {
      dispatch(fetchItems());
    }
  }, [isAuthenticated, status, dispatch]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleTogglePurchased = (item) => {
    dispatch(updateItem({ ...item, purchased: !item.purchased }))
      .unwrap()
      .catch((error) => {
        console.error('Failed to update item:', error);
      });
  };

  const handleDeleteItem = (item) => {
    if (item.purchased) {
      // If the item is purchased, delete all purchased items
      items.forEach(i => {
        if (i.purchased) {
          dispatch(deleteItem(i.id));
        }
      });
    } else {
      // If the item is not purchased, delete only this item
      dispatch(deleteItem(item.id));
    }
  };

  const sortedItems = [...items].sort((a, b) => {
    if (a.purchased === b.purchased) return 0;
    return a.purchased ? 1 : -1;
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome, {user?.name}!
          </Typography>
          <Button color="inherit" onClick={handleLogout} startIcon={<ExitToAppIcon />}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={6} sx={{ p: 4 }}>
          <Typography component="h1" variant="h4" align="center" gutterBottom>
            Your Shopping List
          </Typography>
          {status === 'loading' && <p>Loading...</p>}
          {status === 'failed' && <p>Error: {error}</p>}
          {status === 'succeeded' && (
            <>
              <AddItemForm />
              <List sx={{ mt: 2 }}>
                {sortedItems.map((item) => (
                  <ListItem key={item.id} divider>
                    <Checkbox
                      checked={Boolean(item.purchased)}
                      onChange={() => handleTogglePurchased(item)}
                      color="primary"
                    />
                    <ListItemText 
                      primary={item.name} 
                      secondary={`Quantity: ${item.quantity}`}
                      sx={{ textDecoration: item.purchased ? 'line-through' : 'none' }}
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteItem(item)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default Dashboard;
