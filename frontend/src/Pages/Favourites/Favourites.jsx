// import Navbar from "../../Components/navbar/Navbar";
// import { useDispatch, useSelector } from "react-redux";
// import Card from "../../Components/rowitem/Card";
// import { useEffect, useState } from "react";
// import { getAllFavourites } from "../../Store/slices";
// import "./favourites.scss";
// import { onAuthStateChanged } from "firebase/auth";
// import { firebaseAuth } from "../../utils/Firebase/fireConfig";
// import { useNavigate } from "react-router-dom";



// const Favourites = () => {

//     const itemList = useSelector((state)=>state.panoramix.favourites);
//     const dispatch = useDispatch();

//     // const [email, setEmail] = useState(undefined);

//     // const navigate = useNavigate();

//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
//         // if (currentUser) {
//         //     setEmail(currentUser.email);
//         // } else {
//         //     navigate('/login');
//         // }
//         // });
//         if(currentUser){
//             dispatch(getAllFavourites(currentUser.email));
//         }
    
//     })

//     return () => unsubscribe(); 
//   }, []);

//     // useEffect(()=>{
//     //     if(email){
//     //         dispatch(getAllFavourites(email));
//     //     }
//     // },[email]);

//     console.log("hello",itemList);

//   return (
//     <div className="home">
//         <Navbar/>
//         <div className="container">
//             <h1>My List</h1>
//             <div className="cards">
//                 {itemList.map((item,index)=>{
//                     return(
//                         <Card 
//                         itemData = {item}
//                         index = {index}
//                         key={item.id}
//                         isLiked={true}/>
//                     )
//                 })}
//             </div>
//         </div>
//     </div>
//   )
// }

// export default Favourites



import React from 'react'

const Favourites = () => {
  return (
    <div>Favourites</div>
  )
}

export default Favourites