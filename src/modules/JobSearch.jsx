import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const JobSearch = () => {
    const [keyword, setKeyword] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        try {
            const token = localStorage.getItem('token'); 
            if (!token) {
                setError('User is not authenticated');
                return;
            }

            const response = await axios.get('http://localhost:8080/jobs/search', {
                params: { keyword },
                headers: {
                    'Authorization': `Bearer ${token}` 
                }
            });
            setResults(response.data);
        } catch (error) {
            setError('Error fetching search results');
            console.error('Error:', error);
        }
    };

    return (
        <div className=" parentCard flex flex-col items-center justify-center bg-gray-100 py-6">
        <div className=" searchCard bg-white p-6 rounded-lg shadow-lg shadow-gray-400 w-full max-w-3xl">
            <h2 className="text-2xl font-bold text-center mb-4">Job Search</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="flex items-center">
                    <label htmlFor="keyword" className=" textColor block text-gray-700 font-semibold mr-4">Keyword:</label>
                    <input
                        type="text"
                        id="keyword"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        required
                        className="flex-grow p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    <button 
                        type="submit"
                        className=" searchButton ml-4 bg-green-800 text-yellow-100 font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition duration-200"
                    >
                        Search
                    </button>
                </div>
            </form>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div>
                {results.length > 0 ? (
                    <ul>
                        {results.map((job) => (
                            <Link to={`/apply/${job.jobId}`} key={job.jobId}>
                                <li className=" searchButton bg-gray-100 p-4 mb-4 rounded-lg shadow hover:bg-gray-200 transition duration-200">
                                    <h3 className="text-xl font-bold">{job.title}</h3>
                                    <p className="text-gray-700">{job.company}</p>
                                    <p className="text-gray-500">{job.location}</p>
                                </li>
                            </Link>
                        ))}
                    </ul>
                ) : (
                    <p className=" textColor text-gray-500">No results found</p>
                )}
            </div>
        </div>
    </div>
    );
};

export default JobSearch;

