import axios from "axios"
import { useEffect, useState } from "react"
import * as urls from "../../Infrastracture/urls";
import RestaurantList from "../../Components/RestaurantList/RestaurantList";
import { Divider, Stack } from "@mui/material";

export default function RestaurantsPage() {

    const [restList, setRestList] = useState({results:[]})

    const fetchData = async() => {
        let urlToSend = urls.RESTAURANTS_LIST_URL
        if (restList.results.length > 0) {
            urlToSend = restList.next
        }
        try {
            const response = await axios.get(urlToSend)
            setRestList({...restList,
                next: response.data.next, 
                results: [...restList.results,...response.data.results]})
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
    <RestaurantList restList={restList} loadMore={fetchData} />
    </Stack>
  )
}