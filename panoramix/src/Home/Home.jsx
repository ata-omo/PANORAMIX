import React from 'react'
import "./home.scss"
import Navbar from '../Components/navbar/Navbar'
import Featuring from '../Components/featuring/Featuring'
import Row from '../Components/row/Row'


const Home = () => {
  return (
    <div className='home'>
        <Navbar/>
        <Featuring/>
        <Row title={"Continue watching"}/>
        <Row title={"Trending"}/>
        <Row title={"title 3"}/>
        <Row title={"title 4"}/>
        <Row title={"title 5"}/>
    </div>
  )
}

export default Home
