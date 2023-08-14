
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Stack } from '@mui/material';
import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


export default function ReservationForm() {
  const [partySize, setPartySize] = useState('');


  const handleChange = (event) => {
    setPartySize(event.target.value);
  };

  return (
  <Stack direction="row" spacing={4} justifyContent={'center'}>
    <FormControl variant="filled" sx={{ width: 220 }}>
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DatePicker disablePast label='תאריך' />
  </LocalizationProvider>
  </FormControl>
  <FormControl fullWidth variant="outlined" sx={{ width: 220 }}>
    <InputLabel id="demo-simple-select-filled-label">כמות אנשים</InputLabel>
    <Select
      labelId="demo-simple-select-filled-label"
      id="demo-simple-select-filled"
      value={partySize}
      label="partySize"
      onChange={handleChange}
    >
      <MenuItem value={2}>2</MenuItem>
      <MenuItem value={3}>3</MenuItem>
      <MenuItem value={4}>4</MenuItem>
      <MenuItem value={5}>5</MenuItem>
      <MenuItem value={6}>6</MenuItem>
      <MenuItem value={7}>7+</MenuItem>
    </Select>
  </FormControl>
  <FormControl variant="outlined" sx={{ width: 220 }}>
    <InputLabel id="demo-simple-select-filled-label">כמות אנשים</InputLabel>
    <Select
      labelId="demo-simple-select-filled-label"
      id="demo-simple-select-filled"
      value={partySize}
      label="partySize"
      onChange={handleChange}
    >
      <MenuItem value={2}>2</MenuItem>
      <MenuItem value={3}>3</MenuItem>
      <MenuItem value={4}>4</MenuItem>
      <MenuItem value={5}>5</MenuItem>
      <MenuItem value={6}>6</MenuItem>
      <MenuItem value={7}>7+</MenuItem>
    </Select>
  </FormControl>
  
</Stack> 
)}