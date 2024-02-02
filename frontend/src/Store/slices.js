import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY,TMDB_BASE_URL } from "../utils/constants";



// initialising state

const initialState={
  movies:[],
  genresLoaded: false,
  genres:[],
  favourites:[],
}

// some utility functions for data management

const getRawData = async (api, genres, paging = false) => {

  const moviesArray = [];

  for (let i = 1; moviesArray.length < 76 && i < 10; i++) {
    const {
      data: { results },
    } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);

    const processedMovies = results
      .filter((movie) => movie.backdrop_path) // filtering movies with no backdrop path
      .map((movie) => ({
        id: movie.id,
        name: movie.original_name || movie.original_title,
        image: movie.backdrop_path,
        genres: movie.genre_ids
          .map((genreId) => genres.find(({ id }) => id === genreId)?.name)
          .filter(Boolean)
          .slice(0, 3),
      }));

    moviesArray.push(...processedMovies);
  }

  return moviesArray;
};



// assembling all the reducers

export const getGenres = createAsyncThunk("panoramix/genres", async () => {
    const {
      data: { genres },
    } = await axios.get(
      `${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`
    );
    
    // console.log("hello ",genres)
    return genres;
});


export const fetchDataByGenre = createAsyncThunk(
  "panoramix/genre",
  async ({ genre, type }, thunkAPI) => {
    const {
      panoramix: { genres },
    } = thunkAPI.getState();
    return getRawData(
      `${TMDB_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre.id}`,
      genres
    );
  }
);

export const fetchMovies = createAsyncThunk(
  "panoramix/trending",
  async ({ type }, thunkAPI) => {
    const {
      panoramix: { genres },
    } = thunkAPI.getState();
    return getRawData(
      `${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
      genres,
      true
    );
  }
);


export const removeFromFavourite = createAsyncThunk(
  "panoramix/delete",
  async ({ movieId, email }) => {
    console.log(typeof(movieId));
    const {
      data: { movies },
    } = await axios.put("http://localhost:8800/panoramix/v1/user/remove", {
      email,
      movieId,
    });
    return movies;
  }
);


export const getAllFavourites = createAsyncThunk(
  "panoramix/favourites",
  async (email) => {
    const {data:{movies}} = await axios.get(`http://localhost:8800/panoramix/v1/user/favourites/${email}`);

    // console.log("movies",movies);
    // console.log("email",email)
  
    return movies;
  }
);



// creating slice


export const PanoramixSlice = createSlice({

    name: "panoramix",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getGenres.fulfilled, (state, action) => {
          state.genres = action.payload;
          state.genresLoaded = true;
        });
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
          state.movies = action.payload;
        });
        builder.addCase(fetchDataByGenre.fulfilled, (state, action) => {
          state.movies = action.payload;
        });

        builder.addCase(getAllFavourites.fulfilled, (state, action) => {
          state.favourites = action.payload;
        });
        // builder.addCase(removeFromFavourite.fulfilled, (state, action) => {
        //   state.movies = action.payload;
        //   console.log("remove fulfilled",state);
        // });
        builder.addCase(removeFromFavourite.rejected, (state, action) => {
          console.error("Error in removeFromFavourite:", action.error);
        });
        

      },
});


export default PanoramixSlice.reducer;


