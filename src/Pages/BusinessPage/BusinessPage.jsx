import { useParams } from "react-router-dom"
import { RESTAURANTS_LIST_URL } from "../../Infrastracture/urls"
import { useEffect, useState } from "react"
import axios from "axios"


export default function BusinessPage() {
  const {BusinessId} = useParams()
  const [Business, setBusiness] = useState({})
  console.log(BusinessId)


  useEffect(() => {
    const fetchData = async () => {
        const response = await axios.get(`${RESTAURANTS_LIST_URL}/${BusinessId}`)
        setBusiness(response.data)
        console.log(response.data)
        console.log(`${RESTAURANTS_LIST_URL}/${BusinessId}`)
    }
    fetchData()
}, [BusinessId])

  return(
    <h2></h2>
  )
}