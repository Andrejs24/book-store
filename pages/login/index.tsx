"use client"

import React, { useState } from 'react';
import axios from '@/node_modules/axios/index';



function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
          const response = await axios.post('http://localhost:8080/login', { username, password });
          console.log('Logged in:', response.data);
      } catch (error: any) { 
          console.error('Login failed:', error.response ? error.response.data : error.message);
      }
  };
  
  

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
export default Login;