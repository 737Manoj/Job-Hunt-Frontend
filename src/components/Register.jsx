import React, { useState, useEffect } from 'react';
import RegistrationAnimation from '../modules/RegistrationAnimation';
import { useNavigate } from 'react-router-dom';
import "../styles/Register.css";
import LoadingAnimation from '../modules/LoadingAnimation';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    useEffect(() => {
        setTimeout(() => {
            document.querySelector(".parent-div")?.classList.add("myClass");
        }, 3000); 
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (!validateEmail(email)) {
            setError('Invalid email address');
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND}/user/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, email })
            });

            if (response.ok) {
                navigate('/jobs')
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Registration failed');
            }
        } catch (error) {
            setError('Error during registration');
        }finally{
            isLoading(false);
        }
    };

    return (
        <div className="h-[calc(100vh-96px)] parentRegister flex items-center justify-center bg-gray-100 overflow-hidden">
            { isLoading &&
            <div className="fixed top-0 left-0 w-full flex items-center justify-center bg-opacity-0 z-50">
                <LoadingAnimation />
                </div>

            }
        <div className=" registerCard left-35 max-sm:left-15 bg-white p-10 rounded-lg shadow-lg shadow-gray-400 w-full max-w-sm relative max-h-full">
            <h2 className="text-3xl font-bold text-center mb-6">Register</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
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
                <div className="mb-4">
                    <label htmlFor="password" className="textColor block text-gray-700 font-semibold mb-2">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="email" className=" textColor block text-gray-700 font-semibold mb-2">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                </div>
                <button 
                    type="submit"
                    className=" registerField w-full bg-green-900 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition duration-200"
                >
                    Register
                </button>
            </form>
        </div>

          {/* Animation Section */}
          <div className=" animationSection relative w-full md:w-1/4 left-35 h-full flex items-center justify-center bg-gray-0 parent-div">
                   <RegistrationAnimation />
                </div>
    </div>
    );
};

export default Register;
