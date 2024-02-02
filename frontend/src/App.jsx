import './App.scss'
import { BrowserRouter as Router ,Route, Routes, Navigate} from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Watch from './Pages/Watch/Watch';
import { firebaseAuth } from './utils/Firebase/fireConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import Favourites from './Pages/Favourites/Favourites';

function App() {
 
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      setUser(currentUser);
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []);


  return (

    <Router>
      <Routes>
        <Route exact path="/" element={user ? < Home content="all"/> : <Navigate replace to={"/register"} />} />

        <Route path="/register" element={!user ? < Register /> : <Navigate replace to={"/"} />} />

        <Route path="/login" element={!user ? < Login /> : <Navigate replace to={"/"} />} />
        <Route path="/movies" element={!user ? < Login /> : <Home content="movies" />} />
        <Route path="/series" element={!user ? < Login /> : <Home content="series" />} />
        <Route path="/watch" element={!user ? < Login /> : <Watch/>} />
        <Route path="/favourites" element={!user ? < Login /> : <Favourites />}/>

      </Routes>
    </Router>
    
  )
}

export default App
