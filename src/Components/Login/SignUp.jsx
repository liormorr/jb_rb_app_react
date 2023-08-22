import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_REGISTRATION_URL } from '../../Infrastracture/urls';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});



export default function SignUp() {
  const navigate = useNavigate()
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
        email: data.get('email'),
        password: data.get('password'),
        first_name: data.get('firstName'),
        last_name: data.get('lastName'),
        phone_number: data.get('phone'),
    };
    console.log('data',data)
    try {
      const response = await axios.post(USER_REGISTRATION_URL, userData);
  
      if (response.status === 201) {
        console.log('success', response.data)
      } else {
        console.log('failure', response.data)
      }
    } catch (error) {
      console.log('error', error)
    }
  };


  return (
    <CacheProvider value={cacheRtl}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <TableRestaurantIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            יצירת משתמש חדש
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="firstName"
                  label="שם"
                  name="firstName"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="lastName"
                  required
                  fullWidth
                  id="lastName"
                  label="שם משפחה"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="אימייל"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="phone"
              label="מספר טלפון"
              name='phone'
            />
               </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="סיסמה"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
            הרשמה
            </Button>
            <Grid container justifyContent="center">
            <Grid item >
                <Link onClick={() => {navigate('/login')}} variant="body2" 
                sx={{
                      cursor: 'pointer',
                    }} >
                  {"!יש לך כבר משתמש? היכנס/י כאן"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      </CacheProvider>
  );
}