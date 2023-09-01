import { ListItem, ListItemButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ReservationDisplay from "./ReservationDisplay";

export default function ReservationItem({reservation}) {
  const navigate = useNavigate()

  const handleClick = () => {
      console.log('blabal')
      navigate(`/Restaurants/${reservation.id}`)
  }
 
  return(

    <ListItem sx={{height: '580px', '& .MuiButtonBase-root': { paddingLeft: '0px'
    , paddingRight: '0px', paddingTop: '0px', paddingBottom: '0px'
    }}}>
            <ListItemButton onClick={handleClick}>
                <ReservationDisplay reservation={reservation} />
            </ListItemButton>
        </ListItem>
  )
}