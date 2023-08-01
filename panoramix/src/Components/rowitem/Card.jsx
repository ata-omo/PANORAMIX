import React from 'react'
import "./card.scss"
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { useState ,useEffect} from "react";
import axios from 'axios';

const Card = () => {

  const [isHovered, setIsHovered] = useState(false);


  // const [trailer, setTrailer] = useState('');

    const apiKey = '54b465ea2c4c75b19ce5b54be723132a';


//     useEffect(() => {
//         fetchRandomMovieTrailer();
//     }, []);


//   const fetchRandomMovieTrailer = async () => {
//     try {
//         const response = await axios.get(
//             `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
//         );

//         const randomMovieIndex = Math.floor(
//             Math.random() * response.data.results.length
//         );

//         if (response.data.results[randomMovieIndex].backdrop_path) {
//             setTrailer(
//                 // `https://image.tmdb.org/t/p/original${response.data.results[randomMovieIndex].backdrop_path}`
//                 `http://api.themoviedb.org/3/movie/${response.data.results[randomMovieIndex]}/videos?api_key=${apiKey}`
//             );
//         }
//     } catch (error) {
//         console.error('Error fetching movie image:', error);
//     }
// };




  const flashtrailer = "https://drive.google.com/uc?export=view&id=14ax_DrJVqtWdUQnfO8IKezvn2MwLAMtl";

  const trailer1= `http://api.themoviedb.org/3/movie/157336/videos?api_key=${apiKey}`;
  
  // const trailer= `https://www.youtube.com/watch?v=hebWYacbdvc`;

  

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
