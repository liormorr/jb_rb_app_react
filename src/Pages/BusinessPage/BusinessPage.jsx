import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReservationForm from '../../Components/ReservationForm/ReservationForm';
import { BottomNavigation, BottomNavigationAction, Box, Grid } from '@mui/material';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { UserContext } from '../../Context/UserContext';
import { setNotificationContext } from '../../Context/NotificationContext';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};


export default function BusinessPage() {
  const { businessId } = useParams();
  const [business, setBusiness] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const user = useContext(UserContext)
  const notification = useContext(setNotificationContext)

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

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

  const claimBusiness = async () => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/restaurants/${business.id}/add_owner/`, {
      user_id: user?.user?.user?.id
    });
    
      console.log(response.data);
      notification.success(`נהדר, הבקשה אושרה ובית העסק ניתן למשתמש`)
    } catch (error) {
      console.error('Error fetching data:', error);
      notification.error(`משהו התחרבן`)
    }
  };

  const handleClaim = () => {
    claimBusiness()
    console.log('claim')
  }


  
  return (
    <>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: '25%' }}>
          <h2 id="child-modal-title">בקשת בעלות על בית העסק</h2>
          <p id="child-modal-description">
            אתה: {user?.user?.user?.first_name + ' ' + user?.user?.user?.last_name}<br/>
            מבקש לקחת בעלות על: {business?.name}<br/><br/>
            לאחר אישורך הבקשה תישלח למערכת וניצור איתך קשר בהקדם
          </p>
          <Button onClick={handleCloseModal}>אישור</Button>
          <Button onClick={handleClaim}>בדיקת בעלות</Button>
        </Box>
      </Modal>
    <ReservationForm restDetails={business}/>
    {user ? 
    <Grid xs={8}>
    <Box sx={{display: 'flex', justifyContent: 'center' }}>
      <BottomNavigation
        showLabels
      >
        <BottomNavigationAction label="זה בית העסק שלי" icon={<AddBusinessIcon />} onClick={handleOpenModal}/>
      </BottomNavigation>
    </Box>
    </Grid> : null }
    </>
  );
}

