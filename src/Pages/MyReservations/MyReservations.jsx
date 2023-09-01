import { Divider, Stack } from "@mui/material";
import { useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { useEffect } from "react";
import axios from "axios";
import { GET_USER_RESERVATIONS } from "../../Infrastracture/urls";
import ReservationList from "../../Components/ReservationDisplay/ReservationList";



export default function MyReservationsPage() {

  const [userReservations, setUserReservations] = useState([]);

  const user = useContext(UserContext)

  useEffect(() => {
    if (!user) {
      return; 
    }
  
    const fetchUserReservations = async () => {
      try {
        const response = await axios.get(`${GET_USER_RESERVATIONS}${user.user.user.id}`);
        console.log('response data', response.data)
        setUserReservations(response.data);
      } catch (error) {
        console.error('Error fetching user reservations:', error);
      }
    };
  
    fetchUserReservations();
  }, [user]);

  console.log('MURL', userReservations)

  return(
    <Stack 
    direction={'colum'} 
    alignItems={'center'} 
    justifyContent={'center'} 
    spacing={2} 
    divider={<Divider orientation="horizontal" flexItem />}>
    <ReservationList Reservations={userReservations} />
    </Stack>

  )
}