import { useMemo, useState } from 'react';
import { Box, Container } from '@mui/material';
import { getPortfolioProjects } from '@/service/content';
import ProjectCard from '@/components/organism/ProjectCard';
import ProjectDetailsModal from '@/components/organism/ProjectDetailsModal';

export default function ProjectsCatalogSection() {
    const projects = useMemo(() => getPortfolioProjects(), []);
    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <Box component="section" sx={{ py: { xs: 4, md: 10 } }}>
            <Container maxWidth="lg">
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
                        gap: { xs: 2.2, md: 3 }
                    }}
                >
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                            onOpen={setSelectedProject}
                            variant="projects"
                            minHeight={{ xs: 320, md: 370 }}
                            transition={{ duration: 0.48, delay: index * 0.06 }}
                            titleSx={{
                                fontSize: { xs: '1.25rem', md: '1.55rem' },
                                lineHeight: 1.1,
                                letterSpacing: '-0.02em'
                            }}
                            summarySx={{
                                mt: 1.2,
                                color: 'rgba(228,228,231,0.78)',
                                lineHeight: 1.65,
                                fontSize: { xs: '0.92rem', md: '0.97rem' }
                            }}
                        />
                    ))}
                </Box>
            </Container>

            <ProjectDetailsModal
                project={selectedProject}
                open={Boolean(selectedProject)}
                onClose={() => setSelectedProject(null)}
                actionLabel="Ver projeto publicado"
                coverMinHeight={{ xs: 230, md: 320 }}
            />
        </Box>
    );
}
