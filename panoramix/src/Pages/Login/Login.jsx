import React, { useState, useEffect } from 'react';
import "./login.scss"
import axios from 'axios';
// import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';


const Login = () => {

    const [movieImage, setMovieImage] = useState('');

    const apiKey = '54b465ea2c4c75b19ce5b54be723132a';


    useEffect(() => {
        fetchRandomMovieImage();
    }, []);



    const fetchRandomMovieImage = async () => {
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
            );

            const randomMovieIndex = Math.floor(
                Math.random() * response.data.results.length
            );

            if (response.data.results[randomMovieIndex].backdrop_path) {
                setMovieImage(
                    `https://image.tmdb.org/t/p/original${response.data.results[randomMovieIndex].backdrop_path}`
                );
            }
        } catch (error) {
            console.error('Error fetching movie image:', error);
        }
    };

    const backgroundStyles = {
        backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0,0)), url(${movieImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
    };




    return (
        <div className='wrapper' style={backgroundStyles} >
            <div className="top">
                <div className="bar">
                    <img src="https://drive.google.com/uc?export=view&id=1l1NlYCx8dKhv_ASyKEeSztUYSc6w7uzi
" alt="" className="logo" />


                </div>
            </div>


            <div className="container">
                <form className='formpage'>
                    <h1>Sign In</h1>
                    <input type="text" placeholder='email or phone' />
                    <input type='text' placeholder='password'/>
                    <button className='loginbutton'>Sign in</button>
                    <span>New Here? <b>Sign up now.</b></span>
                </form>

            </div>
        </div>
    );
}


export default Login