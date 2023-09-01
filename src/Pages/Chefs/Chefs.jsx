import axios from "axios"
import { useEffect, useState } from "react"
import * as urls from "../../Infrastracture/urls";
import RestaurantList from "../../Components/RestaurantList/RestaurantList";
import { Divider, Stack } from "@mui/material";

export default function ChefsPage() {
  const [chefsList, setChefsList] = useState({results:[]})

  const fetchData = async() => {
      let urlToSend = urls.PRIVATE_CHEFS_LIST_URL
      if (chefsList.results.length > 0) {
          urlToSend = chefsList.next
      }
      try {
          const response = await axios.get(urlToSend)
          setChefsList({...chefsList,
              next: response.data.next, 
              results: [...chefsList.results,...response.data.results]})
          } catch (e) {
              console.error(e)
          }
  }

  useEffect(
    () => {
        fetchData()
    }
    
  )

  return(
      <Stack 
      direction={'colum'} 
      alignItems={'center'} 
      justifyContent={'center'} 
      spacing={2} 
      divider={<Divider orientation="horizontal" flexItem />}>
      <RestaurantList restList={chefsList} loadMore={fetchData} />
      </Stack>

  )
}