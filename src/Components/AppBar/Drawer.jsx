import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
// import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
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

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleChangePage = (page) => {
    navigation(`${page}`)
    setOpen(false);
  };
  
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
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
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon /> 
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
            <ListItem key={1} disablePadding >
              <ListItemButton onClick={() => handleChangePage('/Restaurants')}>
                <ListItemIcon>
                  <RestaurantIcon />
                </ListItemIcon>
                <ListItemText primary={'מסעדות'} />
              </ListItemButton>
            </ListItem>

            <ListItem key={2} disablePadding>
              <ListItemButton onClick={() => handleChangePage('/Bars')}>
                <ListItemIcon >
                  <NightlifeIcon />
                </ListItemIcon>
                <ListItemText primary={'ברים'} />
              </ListItemButton>
            </ListItem>

            <ListItem key={3} disablePadding>
              <ListItemButton onClick={() => handleChangePage('/Winerys')}>
                <ListItemIcon>
                  <WineBarIcon />
                </ListItemIcon>
                <ListItemText primary={'יקבים'} />
              </ListItemButton>
            </ListItem>

            <ListItem key={4} disablePadding>
              <ListItemButton onClick={() => handleChangePage('/Chefs')}>
                <ListItemIcon>
                  <BreakfastDiningIcon />
                </ListItemIcon>
                <ListItemText primary={'שפים'} />
              </ListItemButton>
            </ListItem>

        </List>
        <Divider />
        <List>

        <ListItem key={11} disablePadding>
              <ListItemButton onClick={() => handleChangePage('/MyReservations')}>
                <ListItemIcon>
                  <RoomServiceIcon />
                </ListItemIcon>
                <ListItemText primary={'ההזמנות שלי'} />
              </ListItemButton>
            </ListItem>

            <ListItem key={22} disablePadding>
              <ListItemButton onClick={() => handleChangePage('/Nearby')}>
                <ListItemIcon>
                  <LocationOnIcon />
                </ListItemIcon>
                <ListItemText primary={'בקרבת מקום'} />
              </ListItemButton>
            </ListItem>


            {/* (// maybe more items here) */}
        </List>
      </Drawer>
    </Box>
  );
}
