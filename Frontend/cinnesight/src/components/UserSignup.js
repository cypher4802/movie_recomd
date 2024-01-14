import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const UserSignup = ({ onSignup }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');
  const [goToMovies,setGoToMovies]=useState(false);

  if (goToMovies){
    return <Navigate to = "/auth/login"/>;
  }

  const handleSignup = async () => {
    try {
      // Validate the form inputs (add your own validation logic)

      // Make the signup API request
      const response = await axios.post('http://localhost:3000/auth/signup', {
        name,
        email,
        password,
        profilePhoto,
      });

      if (response.data.token) {
        // If signup is successful, call onSignup to update the user state in the parent component
        onSignup(response.data.user);
        console.log({response})
        setGoToMovies(true);
      } else {
        console.log('Signup failed:', response.data.message);
      }
    } catch (error) {
      console.error('Error during signup:', error.message);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="text" placeholder="Profile Photo URL" value={profilePhoto} onChange={(e) => setProfilePhoto(e.target.value)} />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
};

export default UserSignup;
