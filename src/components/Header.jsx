import { useState } from "react";
import { Link } from "react-router-dom";
import DarkThemeButton from "../utils/DarkThemeButton";


const Header = () => {
    const [isPopupVisible, setPopupVisible] = useState(false);

    const handleButtonClick = () => {
        setPopupVisible(true);
        setTimeout(() => {
            setPopupVisible(false);
        }, 4000);
    };

    return (
        <header className="bg-green-900 p-6 sticky top-0 left-0 w-full z-1 ">
            <div className="container mx-auto flex justify-between items-center ">
                <h1 className="text-yellow-100 text-2xl font-semibold">Job Hunt</h1>
                <nav className="space-x-4">
                    <Link to="/" className="text-yellow-100 hover:text-black">Home</Link>
                    
                    <Link to="/jobs" className="text-yellow-100 hover:text-black">Jobs</Link>
                    <Link to="/profile" className="text-yellow-100 hover:text-black">Profile</Link>
                    <Link to="/login" className="text-yellow-100 hover:text-black">Login</Link>
                    <Link to="/register" className="text-yellow-100 hover:text-black">Register</Link>
                </nav>
                <DarkThemeButton handleButtonClick={handleButtonClick} />
            </div>
            {isPopupVisible && (
                <div className="fixed top-15 right-10 bg-yellow-100 text-black p-4 rounded-lg shadow-lg">
                    Please allow your eyes to see some color they are meant for that.😇
                </div>
            )}
        </header>
    );
};

export default Header;




