import { Box } from '@mui/material';
import ProjectsHeroSection from '@/section/projects/ProjectsHeroSection';
import ProjectsCatalogSection from '@/section/projects/ProjectsCatalogSection';

export default function Projects() {
    return (
        <Box component="main">
            <ProjectsHeroSection />
            <ProjectsCatalogSection />
        </Box>
    );
}
