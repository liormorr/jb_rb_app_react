import axios from "axios"
import { useEffect, useState } from "react"
import * as urls from "../../Infrastracture/urls";
import RestaurantList from "../../Components/RestaurantList/RestaurantList";
import { Divider, Stack } from "@mui/material";

export default function Barspage() {
  const [barsList, setBarsList] = useState({results:[]})

  const fetchData = async() => {
      let urlToSend = urls.BARS_LIST_URL
      if (barsList.results.length > 0) {
          urlToSend = barsList.next
      }
      try {
          const response = await axios.get(urlToSend)
          setBarsList({...barsList,
              next: response.data.next, 
              results: [...barsList.results,...response.data.results]})
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
      <RestaurantList restList={barsList} loadMore={fetchData} />
      </Stack>

  )
}