
import './App.css';
import TopAppBar from './Components/AppBar/AppBar';
import { useState } from 'react';
import LeftDrawer from './Components/AppBar/Drawer';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { SetUserContext, UserContext } from './Context/UserContext';
import { ME_USER_URL } from './Infrastracture/urls';

function App() {
  const [open, setOpen] = useState(false);

  const setUser = useContext(SetUserContext)
  const user = useContext(UserContext)
  console.log(user)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const userDetailsResponse = await axios.get(ME_USER_URL, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser({
            user: { ...userDetailsResponse.data },
          });
        }
      } catch (error) {
        console.error('Error while fetching user details:', error);
      }
    };
    fetchData();
  }, [setUser]);
  

  return (
    <>
    <TopAppBar setOpen={setOpen} />
    <LeftDrawer setOpen={setOpen} open={open}/>
    <Outlet />
  </>
  );
}

export default App;
