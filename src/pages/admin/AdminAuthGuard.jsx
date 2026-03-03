import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isCurrentAdminAuthenticated } from '@/service/auth/adminAuth.service';

export default function AdminAuthGuard() {
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        let isMounted = true;

        async function checkAuthentication() {
            const authenticated = await isCurrentAdminAuthenticated();
            if (isMounted) {
                setIsAuthenticated(authenticated);
                setIsChecking(false);
            }
        }

        checkAuthentication();

        const intervalId = window.setInterval(() => {
            checkAuthentication();
        }, 60 * 1000);

        return () => {
            isMounted = false;
            window.clearInterval(intervalId);
        };
    }, [location.pathname, location.search, location.hash]);

    if (isChecking) {
        return null;
    }

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
