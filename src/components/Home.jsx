import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import animationData from '../animations/home-animation.json'; 
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/jobs')
    }

    return (
        <div className="h-[calc(100vh-96px)] bg-gray-100 flex flex-col">
            <div className="flex flex-col md:flex-row h-screen">
                {/* Hero Section */}
                <div className="relative w-full md:w-1/2 h-full bg-cover bg-center flex items-center justify-center text-center text-white parent-div">
                    <div className="bg-green-900 bg-opacity-50 p-10 rounded-xl">
                        <h1 className="text-5xl font-bold mb-4">Find Your Dream Job</h1>
                        <p className="text-lg mb-6">Thousands of opportunities are waiting for you</p>
                        <div className="flex justify-center">
                            <button onClick={handleClick} className="bg-yellow-100 p-3 w-48 rounded-lg text-black hover:bg-yellow-200">Search</button>
                        </div>
                    </div>
                </div>

                {/* Animation Section */}
                <div className="relative w-full md:w-1/2 h-full flex items-center justify-center bg-gray-0 parent-div">
                    <Player
                        autoplay
                        loop
                        src={animationData}
                        style={{ height: '400px', width: '400px' }}
                    />
                </div>
            </div>

            {/* Features Section */}
            <div className="py-20 text-center parent-div ">
                <h2 className="textStyle text-4xl font-bold text-gray-800">Why Choose Us?</h2>
                <div className="mt-10 grid md:grid-cols-3 gap-6 px-10">
                    <div className=" cards p-6 bg-white shadow-lg shadow-gray-400 rounded-lg">
                        <h3 className="text-2xl font-semibold mb-2">Top Companies</h3>
                        <p className=" textStyle text-gray-600">Find jobs from the best employers around the world.</p>
                    </div>
                    <div className=" cards p-6 bg-white shadow-lg shadow-gray-400 rounded-lg">
                        <h3 className="text-2xl font-semibold mb-2">Easy Application</h3>
                        <p className=" textStyle text-gray-600">Apply with a single click and track your progress.</p>
                    </div>
                    <div className=" cards p-6 bg-white shadow-lg shadow-gray-400 rounded-lg">
                        <h3 className="text-2xl font-semibold mb-2">AI-Powered Matches</h3>
                        <p className="textStyle text-gray-600">Get personalized job recommendations based on your profile.</p>
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="bg-green-900 text-yellow-100 py-16 text-center">
                <h2 className="text-3xl font-bold">Start Your Job Search Today</h2>
                <p className=" pb-3 text-lg mt-2">Join thousands of job seekers and land your next opportunity</p>
                <Link to="/jobs" className=" mt-6 px-6 py-3 bg-white text-black font-bold rounded-lg shadow-md hover:bg-gray-200">Get Started</Link>
            </div>
        </div>
    );
};

export default Home;
