import SearchIcon from '@mui/icons-material/Search';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AttributionIcon from '@mui/icons-material/Attribution';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import "./navbar.scss"
import { React, useState } from 'react'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { firebaseAuth } from '../../utils/Firebase/fireConfig';
import { signOut } from 'firebase/auth';
import logo from '../../assets/panoramixLogo.svg';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataByGenre } from '../../Store/slices';


const Navbar = ({displayGenre}) => {


  const [scroll, setScroll] = useState(false);

  const [showSearch, setShowSearch] = useState(false);

  window.onscroll = () => {
    setScroll(window.pageYOffset === 0 ? false : true);

    return () => (window.scroll = null);
  }


  const navigate = useNavigate();

  const goToLogin = async ()=>{

      try{
        await signOut(firebaseAuth);
        return navigate("/login");
      }
      catch(err){
        console.log("failed to logout: ", err.message);
      }
  }


  const genreList = useSelector((state)=>{
    return state.panoramix.genres;
  })

  const dispatch = useDispatch();


  // const [showGenreDropdown, setShowGenreDropdown] = useState(false);

  // const toggleGenreDropdown = () => {
  //   setShowGenreDropdown(!showGenreDropdown);
  // }


  return (
    <div className={scroll ? "navbar dusra" : "navbar"}>
      <div className="container">
        <div className="left">
          <img src={logo} alt="logo..." />
        
          <Link to="/" className='link'><span>Home</span></Link>
          <Link to="/movies" className='link'><span>Movies</span></Link>
          <Link to="/series" className='link'><span>Series</span></Link>
          {(displayGenre==="movie" || displayGenre ==="tv")?
          (<span>
            <a >Categories</a>
            <div className="categories">
                  {genreList.map((currGenre) => (
                    <span key={currGenre.id} value={currGenre.id} onClick={
                      (e)=>{
                        e.preventDefault();

                        dispatch(fetchDataByGenre({
                          genres:genreList,
                          genre: currGenre,
                          type: displayGenre,
                        }));
                        // console.log(currGenre, displayGenre);
                      }
                    }>{currGenre.name}</span>
                  ))}
                </div>
            </span>)
          :null}
          <span>Favourites</span>
        </div>
        <div className="right">

          <SearchIcon className='icons' />
          <span className='icons'>KID</span>
          <NotificationsActiveIcon className='icons' />
          {/* <AttributionIcon/> */}
          <InsertEmoticonIcon className='icons' />
          {/* <ArrowDropDownIcon className='icons'/> */}


          <div className="profile">
            <ArrowDropDownIcon className='icons' />
            <div className="options">
              <span><a>settings</a></span>
              <span><a onClick={goToLogin}>logout</a></span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Navbar