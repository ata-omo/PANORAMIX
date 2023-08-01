import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route, Routes, Navigate } from "react-router-dom";
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Watch from './Pages/Watch/Watch';

function App() {

  const user = true;

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={user ? < Home /> : <Navigate replace to={"/register"} />} />

        <Route path="/register" element={!user ? < Register /> : <Navigate replace to={"/"} />} />

        <Route path="/login" element={!user ? < Login /> : <Navigate replace to={"/"} />} />

        {user &&
          <>
            <Route path="/movies" element={<Home type="movies" />} />
            <Route path="/series" element={<Home type="series" />} />

            <Route path="/watch" element={<Watch />} />
          </>
        }


        {/* {user ? (
          <>
            <Route path="/movies" element={<Home type="movies" />} />
            <Route path="/series" element={<Home type="series" />} />
            <Route path="/watch" element={<Watch />} />
          </>
        ) : (
          <Route path="/" element={<Register />} />
        )} */}
      </Routes>
    </Router>
  );
}

export default App;
