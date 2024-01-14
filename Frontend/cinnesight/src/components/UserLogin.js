import React, { useState } from 'react';
import axios from 'axios';
import {Navigate} from 'react-router-dom';
import './stylesheets/UserLogin.css'

const UserLogin = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [goToMovies,setGoToMovies]=useState(false);

  if (goToMovies){
    return <Navigate to = "/movies/"/>;
  }




  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', { email, password });
      console.log({response})
      if (response.data.token) {
        // If login is successful, call onLogin to update the user state in the parent component
        onLogin(response.data.user);
        console.log("congrats login success");
        setGoToMovies(true);
      } else {
        console.log({response})
        console.log('Login failed:', response.data.message ||"Unknown error");
      }
    } catch (error) {
      // console.error('Error during login:', error.message);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log('Login failed:', error.response.data.message || 'Unknown error');
        console.log('Status code:', error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        console.log('No response received from the server');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error during login:', error.message);
      }
    }
  };

  return (
    <div className='Bg'>
      <h2>Login</h2>
      <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default UserLogin;
