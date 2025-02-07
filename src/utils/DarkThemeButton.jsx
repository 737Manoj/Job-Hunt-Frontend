import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext'; 
import themeIcon from '../images/theme.svg'

const DarkThemeButton = ({ handleButtonClick }) => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    const handleClick = () => {
        toggleTheme();
        if(handleButtonClick){
            handleButtonClick();
        }
    };

    return (
        <button 
            onClick={handleClick}
            className="bg-yellow-100 text-green-900 rounded-full w-12 h-12 flex items-center justify-center hover:bg-yellow-200 transition duration-200"
        >
            <img src={themeIcon} alt="Icon" className="w-6 h-6" />
        </button>
    );
};

export default DarkThemeButton;


