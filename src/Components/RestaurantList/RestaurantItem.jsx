import { ListItem, ListItemButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RestaurantCard from "../RestaurantCard/RestaurantCard";
import BusinessCard from "../BusinessCard/BusinessCard";

export default function RestaurantItem({restList}) {
  const navigate = useNavigate()

  const handleClick = () => {
      console.log('blabal')
      navigate(`/Restaurants/${restList.id}`)
  }
 
  return(

    <ListItem sx={{height: '500px', padding: '0px'}}>
            <ListItemButton onClick={handleClick}>
                <BusinessCard restList={restList} />
            </ListItemButton>
        </ListItem>
  )
}