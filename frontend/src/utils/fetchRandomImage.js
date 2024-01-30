import axios from 'react';
import {defaultBackground} from '../assets/defaultBackground.jpg'

let movieImage = defaultBackground;

const apiKey = '54b465ea2c4c75b19ce5b54be723132a';

const fetchRandomMovieImage = async () => {
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
        );

        const randomMovieIndex = Math.floor(
            Math.random() * response.data.results.length
        );

        if (response.data.results[randomMovieIndex].backdrop_path) {
            // setMovieImage(
            //     `https://image.tmdb.org/t/p/original${response.data.results[randomMovieIndex].backdrop_path}`
            // );
            movieImage =`https://image.tmdb.org/t/p/original${response.data.results[randomMovieIndex].backdrop_path}`
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

export default{backgroundStyles,fetchRandomMovieImage, movieImage}
