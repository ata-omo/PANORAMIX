import SearchIcon from '@mui/icons-material/Search';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AttributionIcon from '@mui/icons-material/Attribution';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import "./navbar.scss"
import {React, useState} from 'react'


const Navbar = () => {


  const [scroll, setScroll]= useState(false);

  window.onscroll = () =>{
    setScroll(window.pageYOffset === 0 ? false : true);

    return ()=> (window.scroll = null);
  }


  return (
    <div className={scroll ? "navbar dusra" : "navbar"}>
        <div className="container">
            <div className="left">
                <img src="https://drive.google.com/uc?export=view&id=1ZGXdRSpcTRvGAN1FdsG3ersRUYwZnpJb" alt="logo..." />
                <span>Home</span>
                <span>Movies</span>
                <span>Series</span>
                <span>Trending</span>
                <span>Favourites</span>
            </div>
            <div className="right">
              
                <SearchIcon className='icons'/>
                <span className='icons'>KID</span>
                <NotificationsActiveIcon className='icons'/>
                {/* <AttributionIcon/> */}
                <InsertEmoticonIcon className='icons'/>
                {/* <ArrowDropDownIcon className='icons'/> */}


                <div className="profile">
                  <ArrowDropDownIcon className='icons'/>
                  <div className="options">
                    <span>settings</span>
                    <span>logout</span>
                  </div>
                </div>
              
            </div>
        </div>
    </div>
  )
}

export default Navbar