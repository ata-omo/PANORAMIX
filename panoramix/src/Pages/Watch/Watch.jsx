import React from 'react'
import "./watch.scss"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Watch = () => {

    const flashtrailer = "https://drive.google.com/uc?export=view&id=14ax_DrJVqtWdUQnfO8IKezvn2MwLAMtl";
    return (

        <div className="playback">
            <div className="top">
                <ArrowBackIcon />
                <span>Home</span>
            </div>
            <video src={flashtrailer} autoPlay progress controls/>
        </div>
    )
}

export default Watch