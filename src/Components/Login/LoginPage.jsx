import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { LOGIN_URL, USER_DETAILS_URL } from '../../Infrastracture/urls';
import axios from "axios"
import { useContext } from 'react';
import { SetUserContext} from '../../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import { setNotificationContext } from '../../Context/NotificationContext';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


export default function LoginPage() {

  const navigate = useNavigate()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const setUser = useContext(SetUserContext)
  const notification = useContext(setNotificationContext)


  const handleSubmit = async(event) => {
    event.preventDefault();
    try {
    const response = await axios.post(LOGIN_URL, {username: email, password: password})
    localStorage.setItem('token', response.data.access)
    const token = localStorage.getItem('token')
    const userDetailsResponse = await axios.get(USER_DETAILS_URL,{headers: {Authorization: `Bearer ${token}`}})
    setUser({
      user: {...userDetailsResponse.data.results[0]}
    })
    navigate('/')
      } catch (e) {
        console.log(e)
        // notification.error(e.response.data.detail);
        notification.error('בדיקה');
      }
  };

  return(
    <ThemeProvider theme={darkTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
            היכנס
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1}}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="כתובת אימייל"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputLabelProps={{
                style: { textAlign: 'right'}, // Align label text to the right
              }}
   
              
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="סיסמה"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputLabelProps={{
                style: { textAlign: 'right'}, // Align label text to the right
              }}
              
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="זכור אותי"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              היכנס
            </Button>
            <Grid container >
              <Grid item xs>
                <Link href="#" variant="body2">
                  שכחת סיסמה?
                </Link>
              </Grid>
              <Grid item >
                <Link onClick={() => {navigate('/signup')}} variant="body2" sx={{
                    cursor: 'pointer',
                  }} >
                  {"עוד אין לך משתמש? הירשם כאן!"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

