import { React,useRef, useState } from 'react'
import "./row.scss"
import Card from '../rowitem/Card'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Row = ({title,data}) => {

  // const [moved,setMoved]= useState(false)
  const [slideCount,setSlideCount]= useState(0)

  const listRef = useRef()

  const handleClick = (direction) =>{
    
    let distance= listRef.current.getBoundingClientRect().x

    if(direction === "left" && slideCount > 0){
      listRef.current.style.transform= `translateX(${320 + distance}px)`
      // listRef.current.style.transform= `translateX(100vw)`
      setSlideCount(slideCount-1)
    }

    if(direction === "right" && slideCount < 8){
      listRef.current.style.transform= `translateX(${-350 + distance}px)`
      // listRef.current.style.transform= `translateX(-100vw)`
      setSlideCount(slideCount+1)
    }

    // console.log(distance)

  }
  // console.log("some",data);





  return (
    <div className='row'>
      <span className='title'>{title}</span>
      <div className="wrapper">
        <ArrowBackIosIcon className='arrow left' onClick={()=> handleClick("left")} style={{display : slideCount<=0 && "none"}}/>
        <div className="items" ref={listRef}>

          {data.map((movie, index) => {
            // console.log("hola",movie);
            // console.log(index);
            return <Card itemData={movie} index={index} key={movie.id} />;
          })}

        </div>
        <ArrowForwardIosIcon className='arrow right' onClick={()=> handleClick("right")} style={{display : slideCount===15 && "none"}}/>
      </div>
    </div>
  )
}

export default Row