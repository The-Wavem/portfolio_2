import { Box } from '@mui/material';

import Hero from '@/section/landing/Hero';
import Experience from '@/section/landing/Experience';

export default function Home() {
    return (
        <Box component="main">
            {/* 1. Dobra Principal */}
            <Hero />
            <Experience />
           
        </Box>
    );
}