import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import LoginAnimation from '../modules/LoginAnimation';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

     useEffect(() => {
            setTimeout(() => {
                document.querySelector(".parent-div")?.classList.add("myClass");
            }, 3000); 
        }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        try {
            const response = await fetch(`${import.meta.env.REACT_APP_BACKEND}/user/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token); 
                login(data.token); 
                navigate('/profile');
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Login failed');
            }
        } catch (error) {
            console.log(error);
            setErrorMessage("An error occurred during login. Please try again after some time.")
        }
    };

    return (
        
        <div className="h-[calc(100vh-96px)] parentLogin flex items-center justify-center bg-gray-100 overflow-auto ">
        <div className=" loginCard left-35 bg-white p-10 rounded-lg shadow-lg shadow-gray-400 w-full max-w-sm relative max-h-full">
            <div className="absolute -top-25 left-1/4 transform -translate-x-1/8 bg-yellow-100 text-black py-2 px-4 rounded-lg shadow-lg shadow-gray-400 mt-0">
                <p className="text-center">Please login to start your hunt</p>
            </div>
            <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="username" className=" textColor block text-gray-700 font-semibold mb-2">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className=" textColor block text-gray-700 font-semibold mb-2">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                </div>
                <button 
                    type="submit"
                    className="loginField w-full bg-green-900 text-yellow-100 font-bold py-3 rounded-lg hover:bg-green-800 transition duration-200"
                >
                    Login
                </button>
            </form>
            
                {errorMessage && <p className="text-red-600 mt-4">{errorMessage}</p>}
        </div>
         {/* Animation Section */}
         <div className="relative w-full md:w-1/4 left-35 h-full flex items-center justify-center bg-gray-0 parent-div">
                <LoginAnimation />
            </div>
    </div>
    );
};

export default Login;


