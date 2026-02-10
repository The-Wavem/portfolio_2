import { Box } from '@mui/material';

import Hero from '@/section/landing/Hero';
import Experience from '@/section/landing/Experience';
import Process from '@/section/landing/Process';

export default function Home() {
    return (
        <Box component="main">
            {/* 1. Dobra Principal */}
            <Hero />
            <Process />
            <Experience />
           
        </Box>
    );
}