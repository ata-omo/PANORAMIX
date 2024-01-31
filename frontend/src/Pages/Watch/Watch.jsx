import "./watch.scss"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import flashtrailer from "../../assets/trailer.mp4";

const Watch = () => {

  const navigate = useNavigate();

  // const flashtrailer ="https://vimeo.com/907813019?share=copy";

  // const flashtrailer = "https://drive.google.com/uc?export=view&id=14ax_DrJVqtWdUQnfO8IKezvn2MwLAMtl";
  return (

      <div className="playback">
          <div className="top">
              <ArrowBackIcon onClick={()=>navigate(-1)} />
              <span>Home</span>
          </div>
          <video src={flashtrailer} autoPlay loop controls/>
      </div>
  )

}

export default Watch