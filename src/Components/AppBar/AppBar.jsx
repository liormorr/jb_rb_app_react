import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Avatar, Container, Divider } from '@mui/material';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { SetUserContext, UserContext } from '../../Context/UserContext';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { RESTAURANTS_LIST_URL } from '../../Infrastracture/urls';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import { green, pink } from '@mui/material/colors';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  display: 'flex', // Add this line to make the flex layout
  alignItems: 'center', // Add this line to vertically align the content
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  display: 'flex', // Add this line to make the flex layout
  alignItems: 'center', // Add this line to vertically align the content
  justifyContent: 'center', // Center horizontally
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));





export default function TopAppBar({setOpen}) {
  const user = useContext(UserContext)
  const setUser = useContext(SetUserContext)
  const navigation = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleChangePage = (page) => {
    navigation(page);
    setAnchorEl(null);
    handleMobileMenuClose();

  }
  const handleLogout = () => {
    localStorage.removeItem('token')
    setUser({user: null})
    setAnchorEl(null)
    handleMobileMenuClose()

  }

  const handleSearch = async (searchValue) => {
    console.log(searchValue);
    const response = await axios.get(`${RESTAURANTS_LIST_URL}/?name=${searchValue}`);
    const searchData = response.data; 
    console.log('Search result:', searchData);
  
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => handleChangePage('/login')}><PermIdentityIcon/> היכנס </MenuItem>
      <MenuItem onClick={() => handleChangePage('/signup')}><AddIcon />  הירשם  </MenuItem>
      <MenuItem onClick={handleMenuClose}><SettingsIcon />  הגדרות  </MenuItem>
      <Divider />
      <MenuItem onClick={handleLogout}><ExitToAppIcon />  התנתק  </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={() => handleChangePage('/login')}><PermIdentityIcon/> היכנס </MenuItem>
      <MenuItem onClick={() => handleChangePage('/signup')}><AddIcon />  הירשם  </MenuItem>
      <MenuItem onClick={handleMenuClose}><SettingsIcon />  הגדרות  </MenuItem>
      <Divider />
      <MenuItem onClick={handleLogout}><ExitToAppIcon />  התנתק  </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ ml: 1 }}
            onClick={setOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="button"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <IconButton onClick={() => {navigation('/')}}>
            <Typography
            variant="button"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            ArBe
            </Typography>
            <TableRestaurantIcon />
            </IconButton>
          </Typography>
          <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: {xs:'100%', md: '40%'}}}>
            <Search sx={{ ml: 0, flex: 1}} >
              <SearchIconWrapper >
                  <SearchIcon />
              </SearchIconWrapper>
                <StyledInputBase
                  placeholder="חיפוש לפי מסעדה"
                  inputProps={{ 'aria-label': 'search' }}
                  onFocus={(e) => e.target.placeholder = ''}
                  onBlur={(e) => e.target.placeholder = 'חיפוש לפי מסעדה'}
                  sx={{display: 'flex', justifyContent: 'start', mr: 0, textAlign: 'start', paddingRight: 0}}
                  onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch(e.target.value);
                    }}}
                  onChange={(e) => {handleSearch(e.target.value)}}
                  
                />
            
            </Search>
          </Container>
          {/* <Box sx={{ flexGrow: 1 }} /> */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="medium"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar sx={{ bgcolor: user ? green[500] : pink[500] }} />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}



