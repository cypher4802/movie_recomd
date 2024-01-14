// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieListComponent from './components/movieListComponent';
import OneMoviePage from './components/OneMoviePage';
import UserLogin from './components/UserLogin';
import UserSignup from './components/UserSignup';
import Favorites from './components/Favourites';
import './components/stylesheets/App.css'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import BasicExample from './components/Navbar';


const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleSignup = (userData) => {
    setUser(userData);
  };

  return (
    <div className='Bg'>
      <BasicExample/>
     
     

      <Router>
        <Routes>
          <Route exact path="/movies/" element={<MovieListComponent user={user} />} />
          <Route path="/movies/:id" element={<OneMoviePage />} />
          <Route path="/auth/login" element={<UserLogin onLogin={handleLogin} />} />
          <Route path="/auth/signup" element={<UserSignup onSignup={handleSignup} />} />
          <Route path="/favorites" element={<Favorites user={user} />} />
        </Routes>
      </Router>
    </div>



  );
};

export default App;
