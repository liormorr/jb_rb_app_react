import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter} from 'react-router-dom'
import RestaurantsPage from './Pages/RestaurantsPage/Restaurants';
import { MainPage } from './Pages/MainPage/MainPage';
import WineryPage from './Pages/WineryPage/WineryPage';
import Barspage from './Pages/BarsPage/BarsPage';
import ChefsPage from './Pages/Chefs/Chefs';
import MyReservationsPage from './Pages/MyReservations/MyReservations';
import NearbyPage from './Pages/Nearby/Nearby';
import LoginPage from './Components/Login/LoginPage'
import UserProvider from './Context/UserContext';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import BusinessPage from './Pages/BusinessPage/BusinessPage';
import SignUp from './Components/Login/SignUp';
import Notification from './Components/Notifications/Notifications';




const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  },
});


const router = createBrowserRouter([
  {
  path: '/',
  element: <App />,
  children:[
    {
      path: '/',
      element: <MainPage />
    },
    {
      path: '/Restaurants',
      element: <RestaurantsPage />
    },
    {
      path: '/Restaurants/:businessId',
      element: <BusinessPage />
    },
    {
      path: '/Winerys',
      element: <WineryPage />
    },
    {
      path: '/Bars',
      element: <Barspage />
    },
    {
      path: '/Chefs',
      element: <ChefsPage />
    },
    {
      path: '/Nearby',
      element: <NearbyPage />
    },
    {
      path: '/MyReservations',
      element: <MyReservationsPage />
    },
  ]
},
{
  path: '/login',
  element: <LoginPage />

},
{
  path: '/signup',
  element: <SignUp />

},
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <Notification>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </Notification>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
