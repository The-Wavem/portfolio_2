import { Box } from '@mui/material';

import AboutHeroSection from '@/section/about/AboutHeroSection';
import AboutTeamSection from '@/section/about/AboutTeamSection';

export default function About() {
    return (
        <Box component="main">
            <AboutHeroSection />
            <AboutTeamSection />
        </Box>
    );
}
