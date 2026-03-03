import { lazy, Suspense } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import PageLoader from '@/components/ui/PageLoader';

const MainLayout = lazy(() => import('./components/layout/MainLayout'));
const Home = lazy(() => import('@pages/public/Home'));
const About = lazy(() => import('@pages/public/About'));
const Projects = lazy(() => import('@pages/public/Projects'));
const Services = lazy(() => import('@pages/public/Services'));
const AdminAuthGuard = lazy(() => import('@pages/admin/AdminAuthGuard'));
const AdminLogin = lazy(() => import('@pages/admin/AdminLogin'));
const AdminLayout = lazy(() => import('@/components/layout/AdminLayout'));
const AdminOverview = lazy(() => import('@pages/admin/AdminOverview'));
const AdminSectionPlaceholder = lazy(() => import('@pages/admin/AdminSectionPlaceholder'));

function withSuspense(Component) {
    return (
        <Suspense fallback={<PageLoader />}>
            <Component />
        </Suspense>
    );
}

export const router = createBrowserRouter([
    {
        path: "/",
        element: withSuspense(MainLayout),
        children: [
            {
                index: true,
                element: withSuspense(Home),
            },
            {
                path: 'sobre',
                element: withSuspense(About),
            },
            {
                path: 'projetos',
                element: withSuspense(Projects),
            },
            {
                path: 'servicos',
                element: withSuspense(Services),
            },
        ],
    },
    {
        path: '/admin/login',
        element: withSuspense(AdminLogin)
    },
    {
        path: '/admin',
        element: withSuspense(AdminAuthGuard),
        children: [
            {
                element: withSuspense(AdminLayout),
                children: [
                    {
                        index: true,
                        element: withSuspense(AdminOverview)
                    },
                    {
                        path: ':page',
                        element: withSuspense(AdminSectionPlaceholder)
                    },
                    {
                        path: ':page/:section',
                        element: withSuspense(AdminSectionPlaceholder)
                    },
                    {
                        path: '*',
                        element: <Navigate to="/admin" replace />
                    }
                ]
            }
        ]
    }
]);