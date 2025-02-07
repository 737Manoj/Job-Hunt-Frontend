import { Navigate, Outlet } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext'; 
import LoadingAnimation from '../modules/LoadingAnimation';

const ProtectedRoutes = ({ component: Component, ...rest }) => {
    const { isAuthenticated } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        
        setTimeout(() => {
            setIsLoading(false);
        }, 1000); 
    }, []);

    if (isLoading) {
        return (
            <div className='parentCard  flex justify-center items-center h-screen overflow-hidden'>
            <div className=' p-10 rounded-lg w-full max-w-sm relative max-h-full'>
                <LoadingAnimation />
            </div>
            </div>
        ); 
    }

    return isAuthenticated ? (
        <>
            <Component {...rest} />
            <Outlet />
        </>
    ) : (
        <Navigate to='/login' />
    );
};

export default ProtectedRoutes;


