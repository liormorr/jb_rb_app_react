import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, Container, Stack } from '@mui/material';
import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { isAfter } from 'date-fns'; 
import { useEffect } from 'react';
import dayjs from 'dayjs';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

function generateTimeSlots(selectedDate) {
  const timeSlots = [];
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();

  let startHour = currentHour;
  let startMinutes = (Math.ceil(currentMinutes / 30) * 30) % 60;

  if (startMinutes === 0) {
    startHour = (startHour + 1) % 24;
  }

  if (selectedDate && isAfter(selectedDate, now)) {
    startHour = 8;
    startMinutes = 0;
  }

  for (let hour = startHour; hour <= 23; hour++) {
    for (let minutes = startMinutes; minutes < 60; minutes += 30) {
      const formattedHour = hour.toString().padStart(2, '0');
      const formattedMinutes = minutes.toString().padStart(2, '0');
      const timeSlot = `${formattedHour}:${formattedMinutes}`;
      timeSlots.push(timeSlot);
    }
    startMinutes = 0; 
  }
  return timeSlots;
}


export default function ReservationForm() {
  const [partySize, setPartySize] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDate, setSelectedDate] = useState(null); 

  console.log(selectedDate)

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleChange = (event) => {
    setPartySize(event.target.value);
  };

  const handleDateChange = (date) => {
    const newDate = dayjs(date).toDate()
    setSelectedDate(newDate);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
  //   const reservationData = {
  //       email: data.get('email'),
  //       password: data.get('password'),
  //       first_name: data.get('firstName'),
  //       last_name: data.get('lastName'),
  //       phone_number: data.get('phone'),
  //   };
  //   console.log('data',data)
  //   try {
  //     const response = await axios.post(USER_REGISTRATION_URL, userData);
  
  //     if (response.status === 201) {
  //       console.log('success', response.data)
  //     } else {
  //       console.log('failure', response.data)
  //     }
  //   } catch (error) {
  //     console.log('error', error)
  //   }
  // };
  }

  useEffect(() => {
    setSelectedTime(''); 
  }, [selectedDate]);

  return (
    <CacheProvider value={cacheRtl}>
      <Container maxWidth="md">
        <Stack direction="row" spacing={4} justifyContent={'center'} margin={5}>
          <FormControl fullWidth variant="outlined" sx={{ width: '80%' }}>
            <InputLabel id="demo-simple-select-filled-label">כמות אנשים</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={partySize}
              label="partySize"
              onChange={handleChange}
            >
              {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((size) => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" sx={{ width: '80%' }}>
            <InputLabel id="demo-simple-select-filled-label">שעה</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={selectedTime}
              label="timeSlot"
              name='timeSlot'
              onChange={handleTimeChange}
            >
              {generateTimeSlots(selectedDate).map((timeSlot) => (
                <MenuItem key={timeSlot} value={timeSlot}>
                  {timeSlot}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="filled" sx={{ width: '80%' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs} weekStartsOn={0}>
              <DatePicker
                disablePast
                label='תאריך'
                format='DD/MM/YYYY'
                value={selectedDate} 
                onChange={handleDateChange} 
              />
            </LocalizationProvider>
          </FormControl>
          <Button 
          variant="contained" 
          endIcon={<TableRestaurantIcon />} 
          type="submit"
          sx={{ mt: 3, mb: 2, width: '30%'}}
          color='success'
          onClick={handleSubmit}>
            הזמנה
          </Button>
        </Stack>
      </Container>
    </CacheProvider>

  );
}
