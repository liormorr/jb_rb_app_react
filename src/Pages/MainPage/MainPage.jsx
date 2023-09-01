import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";


export const MainPage = () => {
  const navigate = useNavigate()

  const imageMap = {
    chefs: "https://storage.googleapis.com/jb-test2/pchefs.jpg",
    wineries: "https://storage.googleapis.com/jb-test2/wineries.jpg",
    bars: "https://storage.googleapis.com/jb-test2/bars.jpg",
    rests: "https://storage.googleapis.com/jb-test2/rests.jpg"
  };

  const handleClick = (category) => {
    // Handle the click event for the specified category
    switch (category) {
      case "chefs":
        navigate('/Chefs')
        break;
      case "rests":
        navigate('/Restaurants')
        break;
      case "wineries":
        navigate('/Winerys')
        break;
      case "bars":
        navigate('/Bars')
        break;
    }
  };


  return(
    <>
    <h3>Main Page</h3>
    <Grid container justifyContent="center" alignItems="flex-start">
      {/* <Grid item xs={12}>
      </Grid> */}
      <Grid item xs={8} className="slide-container" style={{ height: "100px" }}>
        <Fade>
        {Object.entries(imageMap).map(([category, imageUrl]) => (
              <div key={category} className="each-fade">
                <img
                  src={imageUrl}
                  alt={`Image ${category}`}
                  style={{ height: "350px", width: "100%", cursor: "pointer" }}
                  onClick={() => handleClick(category)}
                  
                />
            </div>
          ))}
        </Fade>
      </Grid>
    </Grid>
    </>
  )

}