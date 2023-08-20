"use client"

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router'; 

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); 

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/login', {
        username: username,
        password: password,
      });

      if (response.status === 202) {
        router.push('/admin');
      } else {
        console.log('Login successful:', response.data);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <div className="inputFields">
      <form onSubmit={handleLogin} className="inputForm">
        <input 
          type="text"
          placeholder="Username"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <input 
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className='addButton'>Login</button>
      </form>
      </div>
    </div>
  );
}

export default Login;
