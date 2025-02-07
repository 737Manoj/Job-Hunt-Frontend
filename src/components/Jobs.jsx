import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import JobSearch from '../modules/JobSearch';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const token = localStorage.getItem('token'); 
                if (!token) {
                    console.error('No token found in localStorage');
                    return;
                }
                const response = await axios.get(`${import.meta.env.VITE_BACKEND}/jobs`, {
                    headers: {
                        'Authorization': `Bearer ${token}` 
                    }
                });
                if(response.status == 200){
                setJobs(response.data);
                setLoading(false);
            }
            } catch (error) {
                console.error("Error fetching jobs: ", error);
                setLoading(false);
            }
        }
        fetchJobs();
    }, []);

    return (
        <div className=" h-[calc(100vh-96px)] parentCard container mx-auto p-6 overflow-auto">
        <JobSearch />
        <h2 className="text-3xl font-semibold text-center mb-6">Job Listings</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (<SkeletonJobCard />) :   ( 
                    jobs.map((job) => (
                <li key={job.jobId} className="bg-green-900 shadow-lg shadow-gray-400 rounded-lg overflow-hidden">
                    <div className="p-6">
                        <h3 className="text-xl font-bold text-white">{job.title}</h3>
                        <p className="text-white mt-2">{job.description}</p>
                        <p className="text-white mt-2">Salary: ${job.salary}</p>
                        <Link to={`/apply/${job.jobId}`} className="block mt-4">
                            <button className="w-full bg-yellow-100 text-black py-2 px-4 rounded hover:bg-beige transition duration-200">
                                Apply
                            </button>
                        </Link>
                    </div>
                </li>
            )))} 
        
        </ul>
    </div>
    );
};

function SkeletonJobCard() {
    return (
        <li className="bg-gray-100 shadow-lg shadow-gray-400 rounded-lg overflow-hidden">
            <div className="p-6 animate-pulse">
                <div className="h-6 bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-700 rounded mt-4 w-1/2"></div>
                <div className="h-4 bg-gray-700 rounded mt-2 w-1/3"></div>
                <div className="h-10 bg-yellow-100 rounded mt-4 w-full"></div>
            </div>
        </li>
    );
}

export default Jobs;
