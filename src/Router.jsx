import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import PageLoader from '@/components/ui/PageLoader';

const MainLayout = lazy(() => import('./components/layout/MainLayout'));
const Home = lazy(() => import('@pages/public/Home'));
const About = lazy(() => import('@pages/public/About'));
const Projects = lazy(() => import('@pages/public/Projects'));

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
        ],
    },
]);