import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import "../styles/Apply.css";

const Apply = () => {
    const [file, setFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const { jobId } = useParams();
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        const formData = new FormData();
        formData.append('file', file);
        formData.append('jobId', jobId);

        try {
            const token = localStorage.getItem('token'); 
            const response = await axios.post(`${import.meta.env.REACT_APP_BACKEND}/application/upload-resume`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                navigate('/profile');
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || "Failed to submit Application.")
                alert('Failed to submit application');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrorMessage("You have already applied to this job. Please continue your hunt.🫡")
            } else {
                alert('Error during application submission');
            }
        }
    };

    return (
        <div className=" parentCard min-h-screen flex items-center justify-center bg-gray-100">
        <div className=" applyCard bg-white p-10 rounded-lg shadow-lg shadow-gray-800 w-full max-w-md">
            <h2 className="text-3xl font-bold text-center mb-6">Apply for Job</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="file" className=" textColor block text-gray-700 font-semibold mb-2">Upload Resume:</label>
                    <input
                        type="file"
                        id="file"
                        onChange={handleFileChange}
                        required
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                </div>
                <button 
                    type="submit"
                    className=" submitField w-full bg-green-800 text-yellow-100 font-bold py-3 rounded-lg hover:bg-green-600 transition duration-200"
                >
                    Submit Application
                </button>
            </form>
            {errorMessage && <p className="text-red-600 mt-4">{errorMessage}</p>}
        </div>
    </div>
    );
};

export default Apply;
