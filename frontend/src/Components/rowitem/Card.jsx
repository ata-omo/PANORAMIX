import "./card.scss"
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { useState ,useEffect} from "react";
import trailer from '../../assets/trailer.mp4'
import { useNavigate } from 'react-router-dom';
import { TMDB_ITEM_URL } from '../../utils/constants';

const Card = ({itemData,index}) => {

  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();
  

  return (
    <div
      className='card'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >



      <img src={`${TMDB_ITEM_URL}${itemData.image}`} alt="temp..." />
      {isHovered && (

        <>

          <video src={trailer} autoPlay={true} muted loop onClick={()=>navigate("/watch")} />

          <div className="cardinfo">

            <div className="icons">
              <PlayCircleIcon className="icon play" onClick={()=>navigate("/watch")}/>
              <span>Play</span>
              <AddIcon className="icon add"/>

            </div>



            <div className="about">
              <span className="name">{itemData.name}</span>
              <span className="year abut">1991</span>
              <span className="duration abut">2 hours 40 mins</span>
              <span className="agelimit abut">14+</span>
              {/* <span className="genre">Action</span> */}

              <div className="genre">
                <span className="type">{itemData.genres[0]}</span>
              </div>
            </div>



            <div className="desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, enim accusamus earum ducimus magnam exercitationem.
            </div>


          </div>
        </>
      )}

    </div>


  )
}

export default Card
