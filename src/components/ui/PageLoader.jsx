import { Box, CircularProgress, Typography } from '@mui/material';
import BrandNetworkMark from './BrandNetworkMark';

export default function PageLoader() {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: 1.25,
                background: 'radial-gradient(circle at 50% 30%, rgba(124,58,237,0.16), rgba(5,5,5,0.98) 42%)'
            }}
        >
            <BrandNetworkMark size={100} textColor="#F5F5F5" />

            <CircularProgress size={32} thickness={4.6} />
            <Typography sx={{ color: 'rgba(228,228,231,0.76)', fontSize: '0.9rem', letterSpacing: '0.01em' }}>
                Carregando experiência...
            </Typography>
        </Box>
    );
}
