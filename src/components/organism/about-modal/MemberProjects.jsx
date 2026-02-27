import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import { TbExternalLink } from 'react-icons/tb';
import { getToolMeta } from '@/components/organism/aboutTeam.utils';

export default function MemberProjects({ selectedMember }) {
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
                {selectedMember.personalProjects.map((project) => (
                    <Box key={project.name} sx={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', p: 1.1, background: 'rgba(255,255,255,0.02)' }}>
                        <Box
                            sx={{
                                height: { xs: 96, md: 104 },
                                borderRadius: '10px',
                                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.16), rgba(0,0,0,0.62)), url(${project.cover})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                border: '1px solid rgba(255,255,255,0.1)'
                            }}
                        />

                        <Typography sx={{ mt: 1.1, color: '#fff', fontWeight: 700, fontSize: '0.9rem' }}>{project.name}</Typography>
                        <Typography sx={{ color: 'rgba(228,228,231,0.72)', fontSize: '0.84rem', lineHeight: 1.6, mt: 0.3 }}>{project.description}</Typography>

                        <Stack direction="row" flexWrap="wrap" gap={0.8} sx={{ mt: 0.95 }}>
                            {(project.tools ?? []).map((tool) => {
                                const toolMeta = getToolMeta(tool);
                                return (
                                    <Chip
                                        key={`${project.name}-${toolMeta.key || toolMeta.name}`}
                                        label={toolMeta.name}
                                        size="small"
                                        variant="outlined"
                                        sx={{
                                            color: 'rgba(255,255,255,0.88)',
                                            borderColor: 'rgba(255,255,255,0.2)',
                                            background: 'rgba(255,255,255,0.02)',
                                            '& .MuiChip-label': { fontWeight: 600, fontSize: '0.68rem' }
                                        }}
                                    />
                                );
                            })}
                        </Stack>

                        <Button
                            component="a"
                            href={project.href}
                            target="_blank"
                            rel="noreferrer"
                            variant="text"
                            endIcon={<TbExternalLink size={15} />}
                            sx={{
                                mt: 0.65,
                                px: 0.2,
                                color: '#fff',
                                fontWeight: 600,
                                justifyContent: 'flex-start',
                                '&:hover': { color: selectedMember.accent, background: 'transparent' }
                            }}
                        >
                            Ver projeto
                        </Button>
                    </Box>
                ))}
            </Box>
        </>
    );
}
