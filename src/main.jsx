import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { router } from './Router';
import { theme } from './theme/mainTheme'; // Seu tema dark/roxo

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Reseta o CSS padrão */}
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
);