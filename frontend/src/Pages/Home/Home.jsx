import "./home.scss"
import Navbar from '../../Components/navbar/Navbar'
import Featuring from '../../Components/featuring/Featuring'
import Row from '../../Components/row/Row'
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchMovies, getGenres } from "../../Store/slices"


const Home = ({content}) => {


  if(content === "series") content = "tv";
  if(content === "movies") content = "movie";

  const moviesList = useSelector((state)=>{
    return state.panoramix.movies ;
  })

  const genreList = useSelector((state)=>{
    return state.panoramix.genres;
  })

  const isGenreLoaded = useSelector((state)=>{
    return state.panoramix.genresLoaded;
  })


  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (isGenreLoaded) {
      dispatch(fetchMovies({ genreList, type: `${content}` }));
    }
    // console.log("useeffect");
  }, [isGenreLoaded,content]);


  
  // console.table(moviesList);

  // console.log("genre list", genreList);
  // console.log(isGenreLoaded);

  // slicing from the entire final data

  const getDataInRange = (start,end)=>{
    return moviesList.slice(start,end);
  }




  return (
    <div className='home'>
      <Navbar displayGenre ={content}/>
      <Featuring />
      <Row title="Continue watching" data={getDataInRange(0,15)} />
      <Row title="Trending" data={getDataInRange(15,30)}/>
      <Row title="New Releases" data={getDataInRange(30,45)}/>
      <Row title="Recommended" data={getDataInRange(45,60)}/>
      <Row title="Upcoming" data={getDataInRange(60,75)}/>
    </div>
  )
}

export default Home

