import { useState, useEffect} from 'react';
import "./login.scss"
import axios from 'axios';
import logo from "../../assets/finalogo_favicon.svg";
// import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import {useNavigate} from "react-router-dom";
import { firebaseAuth } from '../../utils/Firebase/fireConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { TMDB_BASE_URL, TMDB_POSTER_URL,API_KEY } from '../../utils/constants';



const Login = () => {

    const [movieImage, setMovieImage] = useState('');


    useEffect(() => {
        fetchRandomMovieImage();
    }, []);



    const fetchRandomMovieImage = async () => {
        try {
            const response = await axios.get(
                `${TMDB_BASE_URL}/movie/popular?api_key=${API_KEY}`
            );

            console.log("hello", response.data.results);

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


    const navigate = useNavigate();
    const goToRegister = ()=>{
        return navigate("/register");
    }


    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");


    const handleSignIn= async ()=>{

        try {
            console.log(email, password);
            await signInWithEmailAndPassword(firebaseAuth, email, password);
            navigate("/");

        } catch (error) {
        console.log("login failed: ",error.message);
        }

    };




    return (
        <div className='wrapper' style={backgroundStyles} >
            <div className="top">
                <div className="bar">
                    <img src={logo} alt="logo" />
                </div>
            </div>


            <div className="container">
                <form className='formpage' onSubmit={(e)=>e.preventDefault()}>
                    <h1>Sign In</h1>
                    <input type="text" placeholder='email or phone' value={email} onChange={(e)=>setEmail(e.target.value)} />
                    <input type='text' placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <button className='loginbutton' onClick={handleSignIn}>Sign in</button>
                    <span>New Here? <a onClick={goToRegister}>Sign up now.</a></span>
                </form>

            </div>
        </div>
    );
}


export default Login