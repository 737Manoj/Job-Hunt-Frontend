import {AuthContext} from "./AuthContext";
import {jwtDecode} from 'jwt-decode';
import { useState,useEffect } from "react";


const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const[isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            const decodedToken = jwtDecode(storedToken);
            setUser(decodedToken);
            setIsAuthenticated(true);
        }
    }, []);

    
    const login = (token) => {
        localStorage.setItem('token', token);
        const decodedToken = jwtDecode(token);
        setUser(decodedToken);
        setIsAuthenticated(true);
    };

    
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
    };

    

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated,  }}>
            {children}
        </AuthContext.Provider>
    );
};



export default AuthContextProvider;