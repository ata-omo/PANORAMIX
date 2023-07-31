import React from 'react'
import "./card.scss"
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { useState } from "react";

const Card = () => {

  const [isHovered, setIsHovered] = useState(false);




  const flashtrailer = "https://drive.google.com/uc?export=view&id=14ax_DrJVqtWdUQnfO8IKezvn2MwLAMtl";




  return (
    <div
      className='card'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >



      {/* <img src="https://drive.google.com/uc?export=view&id=1LBM-72zdkC-m-4hy1h_lBrAFnQayn1zS" alt="temp.." /> */}


      <img src="https://drive.google.com/uc?export=view&id=137CgvKDtU6mfKhF1UqKaK47EmXTvwjXh" alt="temp..." />
      {isHovered && (

        <>

          <video src={flashtrailer} autoPlay={true} loop />

          <div className="cardinfo">

            <div className="icons">
              <PlayCircleIcon className="icon play"/>
              <span>Play</span>
              <AddIcon className="icon add"/>

            </div>



            <div className="about">
              <span className="name">Awesome Movie</span>
              <span className="year abut">1947</span>
              <span className="duration abut">2 hours 20 mins</span>
              <span className="agelimit abut">14+</span>
              {/* <span className="genre">Action</span> */}

              <div className="genre">
                <span className="type">Action</span>
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
