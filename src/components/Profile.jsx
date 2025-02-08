import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Avatar from '../modules/Avatar';
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FiLogOut } from "react-icons/fi"; 
import "../styles/Profile.css";



const Profile = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();




    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token'); 
                if (!token) {
                    return;
                }

                const response = await axios.get(`${import.meta.env.VITE_BACKEND}/user/profile`, {
                    headers: {
                        'Authorization': `Bearer ${token}` 
                    }
                });
                setUserProfile(response.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    const handleLogout = () => {
        logout(); 
        navigate("/login"); 
    };

    return (
        <div className='parentProfile h-[calc(100vh-96px)]'>
    <div className="profileCard max-w-sm mx-auto bg-white shadow-lg shadow-gray-400 rounded-lg overflow-auto">
        <button
            onClick={handleLogout}
            className="absolute top-30 right-15 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200 flex items-center">
            <FiLogOut className="mr-2" /> Logout
        </button>

        {loading ? (
            <SkeletonProfile />
        ) : (
            <div className="p-6 flex flex-col items-center">
                <div className="w-39 h-24 pb-30 pt-1 mb-4">
                    <Avatar />
                </div>
                <h2 className="textColor text-2xl font-semibold text-gray-800 mb-2">{userProfile.username}</h2>
                <h3 className="textColor text-lg font-medium text-gray-600 mb-4">Job Applications</h3>
            </div>
        )}
    </div>

    <div className=" profileCard applicationsList max-w-sm mx-auto bg-white shadow-lg shadow-gray-400 rounded-lg overflow-auto mt-6">
        {loading ? (
            <SkeletonProfile />
        ) : (
            <div className="  p-6">
                <ul className="w-full">
                    {userProfile.applications.map((application) => (
                        <li key={application.id} className="jobCard bg-gray-100 p-4 mb-4 rounded-lg shadow">
                            <p className="text-gray-800"><strong>Job Title:</strong> {application.jobTitle}</p>
                            <p className="text-gray-600"><strong>Status:</strong> {application.status}</p>
                            <p className="text-blue-500">
                                Resume: <a href={application.resumeUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-700">View Resume</a>
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        )}
    </div>
</div>

    );
};

function SkeletonProfile(){
    return (
    <div className="p-6 flex flex-col items-center animate-pulse">
                    <div className="w-24 h-24 mb-4 bg-gray-300 rounded-full"></div>
                    <div className="h-6 w-32 mb-2 bg-gray-300 rounded"></div>
                    <div className="h-4 w-24 mb-4 bg-gray-300 rounded"></div>
                    <ul className="w-full space-y-4">
                        <li className="bg-gray-100 p-4 rounded-lg shadow">
                            <div className="h-4 bg-gray-300 rounded mb-2"></div>
                            <div className="h-4 bg-gray-300 rounded"></div>
                        </li>
                        <li className="bg-gray-100 p-4 rounded-lg shadow">
                            <div className="h-4 bg-gray-300 rounded mb-2"></div>
                            <div className="h-4 bg-gray-300 rounded"></div>
                        </li>
                    </ul>
                </div>
    )
}

export default Profile;
