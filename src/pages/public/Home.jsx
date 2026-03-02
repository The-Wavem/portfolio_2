import { useEffect } from 'react';
import { Box } from '@mui/material';

import Hero from '@/section/landing/Hero';
import Experience from '@/section/landing/Experience';
import Process from '@/section/landing/Process';
import Portfolio from '@/section/landing/Portfolio';
import Contact from '@/section/landing/Contact';
import FAQ from '@/section/landing/FAQ';
import { trackPageView } from '@/service/analytics/tracking.service';

export default function Home() {
    useEffect(() => {
        trackPageView('home');
    }, []);

    return (
        <Box component="main">
            {/* 1. Dobra Principal */}
            <Hero />
            <Portfolio />
            <Process />
            <Experience />
            <Contact />
            <FAQ />
           
        </Box>
    );
}