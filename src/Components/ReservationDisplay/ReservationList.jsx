import { List } from "@mui/material";
import ReservationItem from "./ReservationItem";


export default function ReservationList({Reservations}) {

    // const {count, next, results} = restList
    const items = Reservations.map((reservation) => {
      return <ReservationItem key={reservation.id} reservation={reservation} />
  })
    return(
        
      <List >
            {items}
      </List>
    
    )
}
    
