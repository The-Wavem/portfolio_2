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
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px', // Bordas levemente arredondadas, não pílula total
                },
            },
        },
    },
});