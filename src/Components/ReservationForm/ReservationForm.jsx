import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { isAfter } from 'date-fns';
import dayjs from 'dayjs';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import SmokingRoomsIcon from '@mui/icons-material/SmokingRooms';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { UserContext } from '../../Context/UserContext';

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

export default function ReservationForm({business}) {
  const [partySize, setPartySize] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDate, setSelectedDate] = useState(null); 
  const [smoking, isSmoking] = useState(false);
  const [barSeat, setBarSeat] = useState(false);
  const [outside, setOutside] = useState(false);
  const [userComment, setUserComment] = useState('');

  const user = useContext(UserContext)

  console.log('Reservation Form user',user)
  console.log('Reservation Form business',business)


  const handleChangeUserComment = (event) => {
    setUserComment(event.target.value);
  };


  const handleChange = (event) => {
    setPartySize(event.target.value);
  };

  const handleDateChange = (date) => {
    const newDate = dayjs(date).toDate();
    setSelectedDate(newDate);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const toggleOutside = () => {
    setOutside((prevState) => !prevState);
  };

  const toggleSmoking = () => {
    isSmoking((prevState) => !prevState);
  };

  const toggleBar = () => {
    setBarSeat((prevState) => !prevState);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const reservationData = {
      restaurant_id: business.id,
      user_id: user.user.id,
      phone_number: user.phone_number,
      email_address: user.email_address,
      party_size: partySize,
      reservation_time: selectedTime,
      reservation_date: selectedDate,
      user_comment: userComment,
      is_smoking: smoking,
      bar: barSeat,
      outside: outside
    };
    console.log(reservationData)
  
  };

  useEffect(() => {
    setSelectedTime('');
  }, [selectedDate]);

  return (
    <CacheProvider value={cacheRtl}>
      <Container maxWidth="md">
        <Stack direction="row" spacing={4} justifyContent="center" margin={5}>
          {/* Party Size */}
          <FormControl fullWidth variant="outlined" sx={{ width: '80%' }}>
            <InputLabel>כמות אנשים</InputLabel>
            <Select
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
          {/* Date */}
          <FormControl variant="filled" sx={{ width: '80%' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs} weekStartsOn={0}>
              <DatePicker
                disablePast
                label="תאריך"
                format="DD/MM/YYYY"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </LocalizationProvider>
          </FormControl>
          {/* Time */}
          <FormControl variant="outlined" sx={{ width: '80%' }}>
            <InputLabel>שעה</InputLabel>
            <Select
              value={selectedTime}
              label="timeSlot"
              onChange={handleTimeChange}
            >
              {generateTimeSlots(selectedDate).map((timeSlot) => (
                <MenuItem key={timeSlot} value={timeSlot}>
                  {timeSlot}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
        <Stack direction="row" spacing={2} justifyContent="center" margin={5}>
          {/* Additional Comments */}
          <Box sx={{ width: '100%' }}>
            <TextField 
            fullWidth 
            label="הערות נוספות" 
            id="userComment" 
            value={userComment}
            onChange={handleChangeUserComment} />
          </Box>
          {/* Submit Button */}
          <Button
            variant="outlined"
            endIcon={<TableRestaurantIcon />}
            type="submit"
            sx={{ mt: 3, mb: 2, width: '30%' }}
            color="success"
            onClick={handleSubmit}
          >
            הזמנה
          </Button>
        </Stack>
        {/* Seating Preferences */}
        <Stack direction="row" spacing={10} justifyContent="center" margin={5} alignItems="center" display="flex">
      <Button
        variant={smoking ? 'contained' : 'outlined'}
        size="large"
        color={smoking ? 'success' : 'error'}
        onClick={toggleSmoking}
      >
        מעשנים
        <SmokingRoomsIcon style={{ marginRight: '8px' }} />
      </Button>
      <Button
        variant={barSeat ? 'contained' : 'outlined'}
        size="large"
        color={barSeat ? 'success' : 'error'}
        onClick={toggleBar}
      >
        על הבר
        <LocalBarIcon style={{ marginRight: '8px' }} />
      </Button>
      <Button
        variant={outside ? 'contained' : 'outlined'}
        size="large"
        color={outside ? 'success' : 'error'}
        onClick={toggleOutside}
      >
        בחוץ
        <WbSunnyIcon style={{ marginRight: '8px' }} />
      </Button>
    </Stack>
      </Container>
    </CacheProvider>
  );
}
