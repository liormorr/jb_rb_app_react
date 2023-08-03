import axios from "axios"
import { useEffect } from "react"
import * as urls from "../../Infrastracture/urls";

export default function RestaurantsPage() {

  useEffect(
      () => {
          const fetchData = async () => {
              try {
                  const response = await axios.get(urls.RESTAURANTS_LIST_URL)
                  console.log(response)
              } catch (e) {
                  console.error(e)
              }
          }
          fetchData()
      }
      ,[]
  )

  return(
      <h2>Restaurants page</h2>

  )
}