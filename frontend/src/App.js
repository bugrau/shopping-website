import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from './redux/shoppingListSlice';
import { logout } from './redux/authSlice';
import ShoppingList from './components/ShoppingList';
import AddItemForm from './components/AddItemForm';
import Login from './components/Login';
import Register from './components/Register';
import { 
  Container, Typography, Box, AppBar, Toolbar, CssBaseline, 
  Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton,
  Paper, Tabs, Tab
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import backgroundImage from './assets/grocery-background.avif'; // Update this line

const theme = createTheme({
  palette: {
    primary: {
      main: '#4caf50', // Green color
    },
    secondary: {
      main: '#ff9800', // Orange color
    },
  },
});

function App() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.shoppingList);
  const auth = useSelector((state) => state.auth);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    if (auth.token) {
      dispatch(fetchItems());
    }
  }, [dispatch, auth.token]);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const drawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button onClick={() => dispatch(logout())}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );

  const pageStyle = {
    minHeight: '100vh',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  if (!auth.token) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box style={pageStyle}>
          <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{ mt: 8, p: 4, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <ShoppingCartIcon sx={{ m: 1, fontSize: 60, color: 'primary.main' }} />
                <Typography component="h1" variant="h5">
                  Shopping List App
                </Typography>
                <Box sx={{ width: '100%', mt: 3 }}>
                  <Tabs value={tabValue} onChange={handleTabChange} centered>
                    <Tab label="Login" />
                    <Tab label="Register" />
                  </Tabs>
                  <Box sx={{ mt: 2 }}>
                    {tabValue === 0 && <Login />}
                    {tabValue === 1 && <Register />}
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Container>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box style={pageStyle}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <ShoppingCartIcon sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Shopping List
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
        >
          {drawerList}
        </Drawer>
        <Container maxWidth="sm" sx={{ mt: 4 }}>
          <Paper elevation={3} sx={{ p: 3, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
            <AddItemForm />
            {status === 'loading' && <Typography>Loading...</Typography>}
            {error && <Typography color="error">{error}</Typography>}
            <ShoppingList items={items} />
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
