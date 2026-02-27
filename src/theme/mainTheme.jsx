import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#7C3AED', // O Roxo Neon da The Wavem
            light: '#A78BFA',
            dark: '#5B21B6',
        },
        background: {
            default: '#050505', // Aquele preto quase absoluto
            paper: '#0A0A0A',   // Para os Cards
        },
        text: {
            primary: '#FFFFFF',
            secondary: '#A1A1AA', // Cinza sofisticado para textos de apoio
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: { fontWeight: 700, letterSpacing: '-0.02em' },
        button: { textTransform: 'none', fontWeight: 600 }, // Tira o CAPS LOCK padrão do MUI
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                ':root': {
                    '--page-scroll-start': '#7C3AED',
                    '--page-scroll-end': '#A78BFA'
                },
                'html, body': {
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'var(--page-scroll-start) rgba(255,255,255,0.12)'
                },
                '::-webkit-scrollbar': {
                    width: '10px',
                    height: '10px'
                },
                '::-webkit-scrollbar-track': {
                    background: 'rgba(255,255,255,0.06)'
                },
                '::-webkit-scrollbar-thumb': {
                    background: 'linear-gradient(180deg, var(--page-scroll-start), var(--page-scroll-end))',
                    borderRadius: '12px',
                    border: '2px solid rgba(5,5,5,0.78)'
                },
                '::-webkit-scrollbar-thumb:hover': {
                    background: 'linear-gradient(180deg, var(--page-scroll-end), var(--page-scroll-start))'
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px', // Bordas levemente arredondadas, não pílula total
                },
            },
        },
    },
});