import { useState, useEffect, useRef } from 'react';
import "./register.scss"
import axios from 'axios';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import logo from "../../assets/finalogo_favicon.svg";
import {useNavigate} from "react-router-dom";
import { firebaseAuth } from '../../utils/Firebase/fireConfig.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { TMDB_BASE_URL, TMDB_POSTER_URL,API_KEY } from '../../utils/constants';



const Register = () => {

    const [movieImage, setMovieImage] = useState('');

    const navigate = useNavigate();

    const goToLogin = ()=>{

        return navigate("/login");
    }



    useEffect(() => {
        fetchRandomMovieImage();
    }, []);



    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const emailRef = useRef();
    const passRef = useRef();

    const handleContinue = () => {
        setEmail(emailRef.current.value);
        setPassword("");
    }

    const handleFinish = async () => {
        try{

            setPassword(passRef.current.value);
            console.log("hello ",password);
            await createUserWithEmailAndPassword(firebaseAuth,email,password);

            // await createUserWithEmailAndPassword(firebaseAuth,email,passRef.current.value);
            

            console.log("registration successful");
            goToLogin();
        }
        catch(err){
            if(err.code === 'auth/email-already-in-use'){
                console.log("email already used");
                goToLogin();
            }
            else{
                console.log("registration failed try again!!: ", err.message);
                navigate("/register");
            }
        }
    };



    const fetchRandomMovieImage = async () => {
        try {
            const response = await axios.get(
                `${TMDB_BASE_URL}/movie/popular?api_key=${API_KEY}`
            );

            const randomMovieIndex = Math.floor(
                Math.random() * response.data.results.length
            );

            if (response.data.results[randomMovieIndex].backdrop_path) {
                setMovieImage(
                    `${TMDB_POSTER_URL}${response.data.results[randomMovieIndex].backdrop_path}`
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
                    {/* <img src="https://drive.google.com/uc?export=view&id=1l1NlYCx8dKhv_ASyKEeSztUYSc6w7uzi
" alt="" className="logo" /> */}
                    
                    <img src={logo} alt="logo" />

                    {/* <button className='login'>
                        <PowerSettingsNewIcon />
                    </button> */}
                    <PowerSettingsNewIcon className='login' onClick={goToLogin}/> 
                    {/* // click to login */}

                </div>
            </div>

            {/* <img src={movieImage} alt="Random Movie Poster" className='poster'/> */}

            <div className="container">
                <h1>Get Unlimited Entertainment With Latest Movies, TV shows and many more only on PANORAMIX !!</h1>
                <h2>Watch anytime from anywhere without any hassel</h2>
                <p>Do not miss!! Enter your email or Phone to continue</p>

                {!email ? (<div className="input">
                    <input type='email' placeholder='email or phone' ref={emailRef}/>
                    <button className='signup' onClick={handleContinue}>Continue</button>
                </div>) : (<div className="input">
                    <input type='text' placeholder='password' ref={passRef} value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <button className='signup' onClick={handleFinish}>Continue</button>
                </div>)}

            </div>
        </div>
    );
}

export default Register