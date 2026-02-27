import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from '@pages/public/Home';
import About from '@pages/public/About';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />, // O Layout envolve todas as rotas filhas
        children: [
            {
                index: true, // Isso diz que é a rota padrão "/"
                element: <Home />,
            },
            {
                path: 'sobre',
                element: <About />,
            },
            // Futuramente vocês podem adicionar:
            // { path: "projetos", element: <ProjectsPage /> },
        ],
    },
]);