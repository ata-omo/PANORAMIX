import "./card.scss"
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import AddIcon from '@mui/icons-material/Add';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { useState, useEffect} from "react";
import trailer from '../../assets/trailer.mp4'
import { useNavigate } from 'react-router-dom';
import { TMDB_ITEM_URL } from '../../utils/constants';
import { useDispatch } from "react-redux";
import { removeFromFavourite } from "../../Store/slices";
import axios from "axios";
import { onAuthStateChanged} from "firebase/auth";
import { firebaseAuth } from "../../utils/Firebase/fireConfig";

const Card = ({itemData,index}) => {

  const [isHovered, setIsHovered] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  
  const [isFavourite, setIsFavourite] = useState(false);

  const [email, setEmail] = useState(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        setEmail(currentUser.email);
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe(); 
  }, []);



  const addToFavourite = async () => {
    try {
      await axios.post("http://localhost:8800/panoramix/v1/user/add", {
        email,
        data: itemData,
      });

      // console.log("added successfully");
      // setIsFavourite(true);
    } catch (error) {
      console.log("Error Adding to favourites: ",error);
    }
  };


  const removeFromFavourites = async () => {
    try {
      

      dispatch(removeFromFavourite({ movieId: (itemData.id).toString(), email }));
      console.log("removed successfully");
    } catch (error) {
      console.log("Error Removing from favourites: ", error);
    }
  };


  const toggleAdd = () => {
    if(isFavourite){
      removeFromFavourites(); // remove from favourites
    }
    else{
      addToFavourite(); // add to favourites
      console.log("item added to favourites")
    }
    setIsFavourite(!isFavourite);
  }

  // console.log(itemData);

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
              {isFavourite?
              (<PlaylistAddCheckIcon className="icon add" onClick={toggleAdd}/>)
              :(<AddIcon className="icon add" onClick={toggleAdd}/>)}

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
