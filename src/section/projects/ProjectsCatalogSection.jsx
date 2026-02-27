import { useMemo, useState } from 'react';
import { Box, Container, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { getPortfolioProjects } from '@/service/content';
import ProjectCard from '@/components/organism/ProjectCard';
import ProjectDetailsModal from '@/components/organism/ProjectDetailsModal';

export default function ProjectsCatalogSection() {
    const theme = useTheme();
    const projects = useMemo(() => getPortfolioProjects(), []);
    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <Box component="section" sx={{ py: { xs: 4, md: 10 }, position: 'relative' }}>
            <Box
                aria-hidden
                sx={{
                    position: 'absolute',
                    left: { xs: -120, md: -160 },
                    bottom: { xs: 80, md: 40 },
                    width: { xs: 220, md: 320 },
                    height: { xs: 220, md: 320 },
                    borderRadius: '50%',
                    background: `${theme.palette.primary.main}20`,
                    filter: 'blur(88px)',
                    pointerEvents: 'none'
                }}
            />

            <Container maxWidth="lg">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.46, ease: 'easeOut' }}
                >
                    <Box sx={{ mb: { xs: 2.2, md: 2.8 }, maxWidth: 740, position: 'relative', zIndex: 2 }}>
                        <Typography variant="overline" sx={{ color: theme.palette.primary.main, letterSpacing: 2.3, fontWeight: 700, fontSize: '0.68rem' }}>
                            ESTUDOS DE PROJETO
                        </Typography>
                        <Typography sx={{ mt: 0.8, color: 'rgba(228,228,231,0.72)', lineHeight: 1.75, fontSize: { xs: '0.92rem', md: '0.97rem' } }}>
                            Abra cada card para ver contexto, direção técnica e como estruturamos entregas para resultados consistentes.
                        </Typography>
                    </Box>
                </motion.div>

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
