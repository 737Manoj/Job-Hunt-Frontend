import "../styles/Header.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import DarkThemeButton from "../utils/DarkThemeButton";
import { Menu, X } from 'react-feather';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isPopupVisible, setPopupVisible] = useState(false);

    const handleClick = () => {
            setIsOpen(false);
    }

    const handleButtonClick = () => {
        setPopupVisible(true);
        setTimeout(() => {
            setPopupVisible(false);
        }, 4000);
    };

    return (
        <header className="bg-green-900 p-6 sticky top-0 left-0 w-full z-10">
            <div className="container mx-auto flex justify-between items-center max-sm:flex gap-x-16">
                
                {/* Logo */}
                <h1 className=" text-yellow-100 text-2xl font-semibold logo ">Job<br />Hunt</h1>

                {/* Mobile Menu Button */}
                <button className="mobile-menu-button md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Navigation Links */}
                <nav
                    className={`mobile-nav ${isOpen ? "open" : ""} max-sm:pt-40`}
                >
                    <Link to="/" className="block md:inline-block text-yellow-100 hover:text-black p-2" onClick={handleClick}>
                        Home
                    </Link>
                    <Link to="/jobs" className="block md:inline-block text-yellow-100 hover:text-black p-2" onClick={handleClick}>
                        Jobs
                    </Link>
                    <Link to="/profile" className="block md:inline-block text-yellow-100 hover:text-black p-2" onClick={handleClick}>
                        Profile
                    </Link>
                    <Link to="/login" className="block md:inline-block text-yellow-100 hover:text-black p-2" onClick={handleClick}>
                        Login
                    </Link>
                    <Link to="/register" className="block md:inline-block text-yellow-100 hover:text-black p-2" onClick={handleClick}>
                        Register
                    </Link>
                </nav>

                {/* Dark Mode Button */}
                <DarkThemeButton handleButtonClick={handleButtonClick} className="dark-theme-button hidden md:block" />
            </div>
            

            {/* Popup Message */}
            {isPopupVisible && (
                <div className="fixed top-15 right-10 bg-yellow-100 text-black p-4 rounded-lg shadow-lg">
                    Please allow your eyes to see some color they are meant for that.😇
                </div>
            )}
        </header>
    );
};

export default Header;
