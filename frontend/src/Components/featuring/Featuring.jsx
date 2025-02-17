import React from 'react'
import "./featuring.scss"
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import featuringImg from '../../assets/featuringTempImage.png';
import featuringTitle from '../../assets/featuringTempTitle.png';
import { useNavigate } from 'react-router-dom';

const Featuring = () => {

  const navigate = useNavigate();

  return (
    <div className="featuring">
      {/* <img src="https://drive.google.com/uc?export=view&id=1mlAV1f1RnP3MEvVg9rS6jjJEVmvNGB3W" alt="" className='frontwala'/> */}
      <img src={featuringImg} alt="" className='frontwala'/>

      <div className="info">
        {/* <img src="https://drive.google.com/uc?export=view&id=1hiMDlhg5yf7rgxUlBzxXUTOT9aCPpH1K" alt="" /> */}
        <img src={featuringTitle} alt="" />

        <span className="desc">Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>

        <div className="buttons">
          <button className="play" onClick={()=>navigate("/watch")}>
            <PlayCircleIcon className='icon'/>
            <span>Play</span>
          </button>
          <button className="add">
            <LibraryAddIcon className='icon' />
          </button>
          <button className="more">
            <InfoOutlinedIcon className='icon'/>
          </button>
        </div>

      </div>


    </div>


  )
}

export default Featuring