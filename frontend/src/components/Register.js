import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { register } from '../redux/authSlice';

import { TextField, Button, Box, Typography, Alert } from '@mui/material';

import axios from 'axios';

const API_URL = 'http://localhost:8000/api';



function Register() {

  const [name, setName] = useState('');

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const [localError, setLocalError] = useState(null);

  const [emailAvailable, setEmailAvailable] = useState(true);

  const dispatch = useDispatch();

  const { error, status } = useSelector((state) => state.auth);



  useEffect(() => {

    const checkEmailAvailability = async () => {

      if (email.length > 0) {

        try {

          const response = await axios.post(`${API_URL}/check-email`, { email });

          setEmailAvailable(response.data.available);

        } catch (error) {

          console.error('Error checking email availability:', error);

        }

      }

    };



    const debounceTimer = setTimeout(checkEmailAvailability, 500);

    return () => clearTimeout(debounceTimer);

  }, [email]);



  const handleSubmit = (e) => {

    e.preventDefault();

    setLocalError(null);



    if (password.length < 8) {

      setLocalError('Password must be at least 8 characters long');

      return;

    }



    if (password !== passwordConfirmation) {

      setLocalError('Passwords do not match');

      return;

    }



    if (!emailAvailable) {

      setLocalError('This email is already in use');

      return;

    }



    dispatch(register({ name, email, password, password_confirmation: passwordConfirmation }));

  };



  return (

    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

      <TextField

        margin="normal"

        required

        fullWidth

        id="name"

        label="Name"

        name="name"

        autoComplete="name"

        autoFocus

        value={name}

        onChange={(e) => setName(e.target.value)}

      />

      <TextField

        margin="normal"

        required

        fullWidth

        id="email"

        label="Email Address"

        name="email"

        autoComplete="email"

        value={email}

        onChange={(e) => setEmail(e.target.value)}

        error={!emailAvailable}

        helperText={!emailAvailable ? "This email is already in use" : ""}

      />

      <TextField

        margin="normal"

        required

        fullWidth

        name="password"

        label="Password"

        type="password"

        id="password"

        autoComplete="new-password"

        value={password}

        onChange={(e) => setPassword(e.target.value)}

      />

      <TextField

        margin="normal"

        required

        fullWidth

        name="passwordConfirmation"

        label="Confirm Password"

        type="password"

        id="passwordConfirmation"

        autoComplete="new-password"

        value={passwordConfirmation}

        onChange={(e) => setPasswordConfirmation(e.target.value)}

      />

      <Typography variant="caption" color="textSecondary">

        Password must be at least 8 characters long

      </Typography>

      {(localError || error) && (

        <Alert severity="error" sx={{ mt: 2 }}>

          {localError || (typeof error === 'string' ? error : error?.message || 'Registration failed')}

        </Alert>

      )}

      <Button

        type="submit"

        fullWidth

        variant="contained"

        sx={{ mt: 3, mb: 2 }}

        disabled={status === 'loading'}

      >

        {status === 'loading' ? 'Registering...' : 'Register'}

      </Button>

    </Box>

  );

}



export default Register;
