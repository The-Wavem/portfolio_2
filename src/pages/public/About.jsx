import { useEffect } from 'react';
import { Box } from '@mui/material';

import AboutHeroSection from '@/section/about/AboutHeroSection';
import AboutStorySection from '@/section/about/AboutStorySection';
import AboutTeamSection from '@/section/about/AboutTeamSection';
import { trackPageView } from '@/service/analytics/tracking.service';

export default function About() {
    useEffect(() => {
        trackPageView('about');
    }, []);

    return (
        <Box component="main">
            <AboutHeroSection />
            <AboutStorySection />
            <AboutTeamSection />
        </Box>
    );
}
