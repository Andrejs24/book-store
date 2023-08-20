import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter(); // Get the router object from Next.js

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/auth/login', { username, password });
            console.log('Logged in:', response.data);
            // Redirect to the appropriate route based on the user's role
            if (response.data.role === 'ADMIN') {
                router.push('/admin');
            } else if (response.data.role === 'USER') {
                router.push('/user');
            }
        } catch (error: any) { // Explicitly specify the type as 'any'
            if (error instanceof Error) {
                console.error('Login failed:', error.message);
            } else {
                console.error('Login failed:', 'An unknown error occurred');
            }
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
