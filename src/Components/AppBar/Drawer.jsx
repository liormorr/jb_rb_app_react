import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import WineBarIcon from '@mui/icons-material/WineBar';
import NightlifeIcon from '@mui/icons-material/Nightlife';
import BreakfastDiningIcon from '@mui/icons-material/BreakfastDining';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';


const drawerWidth = 240;


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function LeftDrawer({open, setOpen}) {
  const navigation = useNavigate()
  const user = useContext(UserContext)

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleChangePage = (page) => {
    navigation(`${page}`)
    setOpen(false);
  };
  
  return (
    <Box sx={{ display: 'flex'}}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
            ArBe
            <TableRestaurantIcon />
          <IconButton onClick={handleDrawerClose} sx={{mr: 6}}>
            <KeyboardDoubleArrowRightIcon /> 
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
            <ListItem key={1} disablePadding>
              <ListItemButton onClick={() => handleChangePage('/Restaurants')}>
              <ListItemText sx={{textAlign: 'center', direction: 'rtl'}} primary={'מסעדות'} />
                <ListItemIcon sx={{justifyContent: 'left'}}>
                  <RestaurantIcon />
                </ListItemIcon>
                
              </ListItemButton>
            </ListItem>

            <ListItem key={2} disablePadding >
              <ListItemButton onClick={() => handleChangePage('/Bars')}>
              <ListItemText sx={{textAlign: 'center', direction: 'rtl'}} primary={'ברים'}/>
                <ListItemIcon sx={{justifyContent: 'left'}}>
                  <NightlifeIcon />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>

            <ListItem key={3} disablePadding >
              <ListItemButton onClick={() => handleChangePage('/Winerys')}>
              <ListItemText sx={{textAlign: 'center', direction: 'rtl'}} primary={'יקבים'} />
                <ListItemIcon sx={{justifyContent: 'left'}}>
                  <WineBarIcon />
                </ListItemIcon>
                
              </ListItemButton>
            </ListItem>

            <ListItem key={4} disablePadding >
              <ListItemButton onClick={() => handleChangePage('/Chefs')}>
              <ListItemText sx={{textAlign: 'center', direction: 'rtl'}} primary={'שפים'} />
                <ListItemIcon sx={{justifyContent: 'left'}}>
                  <BreakfastDiningIcon />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>

        </List>
        <Divider />
        <List>
        {user ? (
        <ListItem key={11} disablePadding >
              <ListItemButton onClick={() => handleChangePage('/MyReservations')}>
              <ListItemText sx={{textAlign: 'center', direction: 'rtl'}} primary={'ההזמנות שלי'} />
                <ListItemIcon sx={{justifyContent: 'left'}}>
                  <RoomServiceIcon />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            ) : null}

            <ListItem key={22} disablePadding >
              <ListItemButton onClick={() => handleChangePage('/Nearby')}>
              <ListItemText sx={{textAlign: 'center', direction: 'rtl'}} primary={'בקרבת מקום'} />
                <ListItemIcon sx={{justifyContent: 'left'}}>
                  <LocationOnIcon />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
