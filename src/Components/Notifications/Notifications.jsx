import { ToastContainer, toast as originalToast } from 'react-toastify';
import { setNotificationContext } from '../../Context/NotificationContext';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

export default function Notification({children}) {
  const options = {position: "bottom-left",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored"}


  const [notification, setNotification] = useState({
    success: (message) => originalToast.success(message, options),
    error: (message) => originalToast.error(message, options),
    warning: (message) => originalToast.warning(message, options),
    info: (message) => originalToast.info(message, options),
  });

    return(
      <>
      <setNotificationContext.Provider value={notification}>
      {children}
      <ToastContainer rtl pauseOnFocusLoss={false}/>
    </setNotificationContext.Provider>
        </>
    )
}
