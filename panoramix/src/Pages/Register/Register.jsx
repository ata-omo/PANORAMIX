import React, { useState, useEffect, useRef } from 'react';
import "./register.scss"
import axios from 'axios';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';


const Register = () => {

    const [movieImage, setMovieImage] = useState('');

    const apiKey = '54b465ea2c4c75b19ce5b54be723132a';

    const [email, setEmail] = useState("");
    const [password, setPassword]= useState("");

    const emailRef = useRef();
    const passRef = useRef();

    const handleContinue = () => {
        setEmail(emailRef.current.value);
    }

    const handleFinish= ()=>{
        setPassword(passRef.current.value);
    }


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

                    {/* <button className='login'>
                        <PowerSettingsNewIcon />
                    </button> */}
                    <PowerSettingsNewIcon className='login' />

                </div>
            </div>

            {/* <img src={movieImage} alt="Random Movie Poster" className='poster'/> */}

            <div className="container">
                <h1>Get Unlimited Entertainment With Latest Movies, TV shows and many more only on PANORAMIX !!</h1>
                <h2>Watch anytime from anywhere without any hassel</h2>
                <p>Do not miss!! Enter your email or Phone to continue</p>

                {!email ? (<div className="input">
                    <input type='text' placeholder='email or phone' ref={emailRef} />
                    <button className='signup' onClick={handleContinue}>Continue</button>
                </div>) : (<form className="input">
                    <input type='text' placeholder='password' ref={passRef} />
                    <button className='signup' onClick={handleFinish}>Continue</button>
                </form>)}

            </div>
        </div>
    );
}

export default Register