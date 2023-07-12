import React, { useState } from 'react';
import WelcomePage from './WelcomePage';
//--------------------------------------
// 24 may 2023 (a)
import { useNavigate, Route, Routes} from 'react-router-dom';

//------------------------------

const UserForm = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

//24 may 2023 (a)
const navigate = useNavigate();
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/api/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        console.log('User added successfully!');
        setUsername('');
        setPassword('');
         //24 may 2023 (a)
         navigate('/welcome');
      } else {
        console.error('Failed to add user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // 24 may 23, added action in the form onSubmit tag. 
  return (
    <div style={{ textAlign: "center" }}>

    <form onSubmit={handleSubmit} action="/welcome">
      <div>
      {/* 24 may 2023 (a) */}
        <Routes>
          <Route path="/welcome" element={<WelcomePage {...props} username={username} />} />
          <Route path="/" element={<h1>Welcome to the game</h1>}/>
        
        </Routes>
        
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Add User</button>
    </form>
    </div>
  );
};

export default UserForm;