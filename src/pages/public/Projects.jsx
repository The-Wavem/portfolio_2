import { useEffect } from 'react';
import { Box } from '@mui/material';
import ProjectsHeroSection from '@/section/projects/ProjectsHeroSection';
import ProjectsCatalogSection from '@/section/projects/ProjectsCatalogSection';
import { trackPageView } from '@/service/analytics/tracking.service';

export default function Projects() {
    useEffect(() => {
        trackPageView('projects');
    }, []);

    return (
        <Box component="main">
            <ProjectsHeroSection />
            <ProjectsCatalogSection />
        </Box>
    );
}
