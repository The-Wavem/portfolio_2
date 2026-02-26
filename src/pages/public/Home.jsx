import { Box } from '@mui/material';

import Hero from '@/section/landing/Hero';
import Experience from '@/section/landing/Experience';
import Process from '@/section/landing/Process';
import Portfolio from '@/section/landing/Portfolio';
import Contact from '@/section/landing/Contact';

export default function Home() {
    return (
        <Box component="main">
            {/* 1. Dobra Principal */}
            <Hero />
            <Portfolio />
            <Process />
            <Experience />
            <Contact />
           
        </Box>
    );
}