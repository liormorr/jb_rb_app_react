import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import * as React from 'react';
import ReservationForm from '../../Components/ReservationForm/ReservationForm';


export default function BusinessPage() {
  const { businessId } = useParams();
  const [business, setBusiness] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/restaurants/${businessId}`);
        setBusiness(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [businessId]);

  console.log('BusinessPage business',business)
  
  return (
    <ReservationForm restDetails={business}/>
  );
}

