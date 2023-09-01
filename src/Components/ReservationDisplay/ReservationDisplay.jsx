import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { RESTAURANTS_LIST_URL } from '../../Infrastracture/urls';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/he';




const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export function convertToHebrewDate(inputDateStr) {
  try {
    dayjs.locale('he');
    const inputDate = dayjs(inputDateStr);
    const formattedDate = `בתאריך ה ${inputDate.format('D')} ל${inputDate.format('MMMM')} בשעה`;

    return formattedDate;
  } catch (error) {
    return error.toString();
  }
}

export default function ReservationDisplay({reservation}) {
  const [expanded, setExpanded] = React.useState(false);

  const [restaurant, setRestaurant] = useState(null);
  
  const reservationTime = new Date(`2000-01-01T${reservation.reservation_time}`);
  const formattedTime = reservationTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  useEffect(() => {
    if (!reservation) {
      return; 
    }

    const fetchRestaurantData = async () => {
      try {
        const response = await axios.get(`${RESTAURANTS_LIST_URL}/${reservation.restaurant_id}`);
        console.log('Restaurant data', response.data);
        setRestaurant(response.data); 
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
      }
    };

    fetchRestaurantData();
  }, [reservation]);


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  if (!restaurant || !reservation) {
    return null;
  }
  return (
    <Card sx={{ maxWidth: 800, padding: 0 }}>
      <CardHeader
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
          }}
          titleTypographyProps={{ align: 'center' }}
          subheaderTypographyProps={{ align: 'center' }}
          title={`הזמנה למסעדה: ${restaurant.name}`}
          subheader={`${convertToHebrewDate(reservation.reservation_date)} ${formattedTime}`}
        />
      <CardMedia
        component="img"
        height="100"
        image={restaurant.rest_picture}
      />
        <CardContent sx={{ textAlign: 'center', display: 'flex', alignItems: 'center' , padding: 1}}>
        <Typography variant="body1" color="text.secondary" >
          {restaurant.description}
        </Typography>
      </CardContent>
      <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 0  }}>
      <Typography variant="body1" style={{ color: reservation.approved ? 'green' : 'red' }} >
          {reservation.approved ? '✓' : '❌'}{' '}
          {reservation.approved ? 'בית העסק אישר את ההזמנה' : 'ההזמנה ממתינה לאישור בית העסק'}
        </Typography>
      </CardContent>
      <div onClick={(e) => e.stopPropagation()}>
      <CardActions disableSpacing style={{ flexDirection: 'row-reverse' }}>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      </div>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 0  }}>
          <Typography paragraph>פרטים על המסעדה</Typography>
          </CardContent>
          <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 0  }}>
          <Typography paragraph>
            {`כתובת: ${restaurant.address}`}
            <br/>
            {`טלפון לבירורים:  ${restaurant.phone_number}`}
            <br/>
            {reservation.user_comment ? `הערות שהשארתם לבית העסק: ${reservation.user_comment}` : `לא השארתם הערות לבית העסק`}
          </Typography>
          <Typography>
            
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}