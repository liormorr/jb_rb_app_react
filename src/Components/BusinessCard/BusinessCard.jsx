import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import BusinessSocials from './BusinessSocials';




export default function BusinessCard({restList}) {

  return (
    <Card sx={{ maxWidth: 600, border: '1px solid #fff'}} variant="outlined">
      <CardActionArea>
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
        image={restList.rest_picture}
        alt={restList.name}
        sx={{
          border: '1px solid #fff',
        }}
        
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" textAlign="right" sx={{direction: 'rtl'}}>
          {restList.description}
        </Typography>
      </CardContent>
      </CardActionArea>
      <BusinessSocials Socials={restList}/>
    </Card>
  );
}
