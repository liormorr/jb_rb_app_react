import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';




export default function BusinessCard({restList}) {
const navigate = useNavigate()
const logoPath = '../../RestaurantsPics/' + restList.id + 'l';
const bannerPath = '../../RestaurantsPics/' + restList.id + 'b';

  const isValidPath = (path) => {
    const allowedExtensions = ['jpg', 'jpeg', 'png'];
    for (const extension of allowedExtensions) {
    try {
      require(`${path}.${extension}`);
      return true;
    } catch (error) {
      console.log(error)
      return false;
    }
  }};

  return (
    <Card sx={{ maxWidth: 600 }} variant="outlined">
      <CardHeader
        title={restList.name}
        titleTypographyProps={{
          sx: {
            fontSize: '24px', 
            fontWeight: 'bold',
          },
        }}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingRight: '16px',
        }}
      />
      <Typography
        variant="body1"
        sx={{
          textAlign: 'right',
          paddingRight: '16px',
          marginBottom: '8px',
          fontSize: '16px',
        }}
      >
        {restList.address}
      </Typography>
      <CardMedia
        component="img"
        height="194"
        image={isValidPath(bannerPath) ? require(bannerPath) : ''}
        alt={restList.name}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" textAlign="right">
          {restList.description}
        </Typography>
      </CardContent>
    </Card>
  );
}
