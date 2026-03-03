import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isAdminSessionValid } from '@/service/auth/adminAuth.service';

export default function AdminAuthGuard() {
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState(() => isAdminSessionValid());

    useEffect(() => {
        setIsAuthenticated(isAdminSessionValid());

        const intervalId = window.setInterval(() => {
            setIsAuthenticated(isAdminSessionValid());
        }, 60 * 1000);

        return () => {
            window.clearInterval(intervalId);
        };
    }, [location.pathname, location.search, location.hash]);

    if (!isAuthenticated) {
        return (
            <Navigate
                to="/admin/login"
                replace
                state={{ from: `${location.pathname}${location.search}${location.hash}` }}
            />
        );
    }

    return <Outlet />;
}
