import axios from "axios"
import { useEffect, useState } from "react"
import * as urls from "../../Infrastracture/urls";
import RestaurantList from "../../Components/RestaurantList/RestaurantList";
import { Divider, Stack } from "@mui/material";

export default function WineryPage() {
  const [wineryList, setWineryList] = useState({results:[]})

  const fetchData = async() => {
      let urlToSend = urls.WINERIES_LIST_URL
      if (wineryList.results.length > 0) {
          urlToSend = wineryList.next
      }
      try {
          const response = await axios.get(urlToSend)
          setWineryList({...wineryList,
              next: response.data.next, 
              results: [...wineryList.results,...response.data.results]})
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
      <RestaurantList restList={wineryList} loadMore={fetchData} />
      </Stack>

  )
}