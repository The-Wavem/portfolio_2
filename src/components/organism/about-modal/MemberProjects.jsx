import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import { TbExternalLink } from 'react-icons/tb';
import { getStackIcon, getToolMeta } from '@/components/organism/aboutTeam.utils';

export default function MemberProjects({ selectedMember }) {
    if (!selectedMember.projects || selectedMember.projects.length === 0) return null;

    const defaultAccent = '#38BDF8';
    const accent = selectedMember.accent || defaultAccent;

    return (
        <>
            <Typography sx={{ mt: 2.4, color: '#fff', fontWeight: 700, fontSize: '0.96rem' }}>Projetos pessoais</Typography>
            <Box
                sx={{
                    mt: 1.15,
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
                    gap: 1.2
                }}
            >
                {selectedMember.projects.map((project) => (
                    <Box key={project.id || project.title} sx={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', p: 1.1, background: 'rgba(255,255,255,0.02)' }}>
                        {project.image && (
                            <Box
                                sx={{
                                    height: { xs: 96, md: 104 },
                                    borderRadius: '10px',
                                    backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.16), rgba(0,0,0,0.62)), url(${project.image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    border: '1px solid rgba(255,255,255,0.1)'
                                }}
                            />
                        )}
                        <Typography sx={{ mt: project.image ? 1.1 : 0.6, color: '#fff', fontWeight: 700, fontSize: '0.96rem', px: 0.6 }}>{project.title}</Typography>
                        <Typography sx={{ color: 'rgba(228,228,231,0.72)', fontSize: '0.84rem', lineHeight: 1.6, mt: 0.3, px: 0.6 }}>{project.description}</Typography>

                        {project.link && (
                            <Button
                                component="a"
                                href={project.link}
                                target="_blank"
                                rel="noreferrer"
                                variant="text"
                                endIcon={<TbExternalLink size={15} />}
                                sx={{
                                    mt: 1.4,
                                    px: 0.2,
                                    color: '#fff',
                                    fontWeight: 600,
                                    justifyContent: 'flex-start',
                                    '&:hover': { color: accent, background: 'transparent' }
                                }}
                            >
                                Ver projeto
                            </Button>
                        )}
                    </Box>
                ))}
            </Box>
        </>
    );
}
