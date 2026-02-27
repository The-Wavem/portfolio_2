import { useState } from 'react';
import {
    Box,
    Button,
    Chip,
    Container,
    Dialog,
    DialogContent,
    IconButton,
    Stack,
    Tooltip,
    Typography,
    useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import { TbArrowUpRight, TbBrandWhatsapp, TbExternalLink, TbX } from 'react-icons/tb';
import {
    SiAdobe,
    SiCypress,
    SiDart,
    SiDocker,
    SiExpo,
    SiFigma,
    SiFirebase,
    SiFlutter,
    SiGithub,
    SiGithubactions,
    SiGrafana,
    SiKubernetes,
    SiMui,
    SiNestjs,
    SiNextdotjs,
    SiNodedotjs,
    SiNotion,
    SiPostgresql,
    SiPostman,
    SiPrometheus,
    SiRabbitmq,
    SiReact,
    SiRedis,
    SiStorybook,
    SiSupabase,
    SiSwift,
    SiTerraform,
    SiTypescript
} from 'react-icons/si';
import { getAboutMembers } from '@/service/content';

const stackIconMap = {
    react: SiReact,
    'react expo': SiExpo,
    'framer motion': SiReact,
    figma: SiFigma,
    firebase: SiFirebase,
    'node.js': SiNodedotjs,
    nestjs: SiNestjs,
    postgresql: SiPostgresql,
    redis: SiRedis,
    docker: SiDocker,
    figjam: SiFigma,
    'adobe cc': SiAdobe,
    notion: SiNotion,
    maze: SiFigma,
    'react native': SiReact,
    swift: SiSwift,
    flutter: SiFlutter,
    expo: SiExpo,
    'github actions': SiGithubactions,
    azure: SiGithub,
    terraform: SiTerraform,
    kubernetes: SiKubernetes,
    playwright: SiCypress,
    cypress: SiCypress,
    'owasp zap': SiPostman,
    snyk: SiGithub,
    postman: SiPostman,
    reanimated: SiReact,
    supabase: SiSupabase,
    dart: SiDart,
    'ci/cd': SiGithubactions,
    'cloud apis': SiGithub,
    grafana: SiGrafana,
    prometheus: SiPrometheus,
    typescript: SiTypescript,
    rabbitmq: SiRabbitmq,
    'design tokens': SiFigma,
    storybook: SiStorybook,
    research: SiFigma,
    'ux writing': SiFigma,
    prototipação: SiFigma,
    dashboards: SiGrafana,
    'qa metrics': SiCypress,
    'threat modeling': SiPostman,
    sast: SiGithub,
    mui: SiMui
};

function getToolMeta(tool) {
    return {
        key: tool.key.toLowerCase().trim(),
        name: tool.label ?? tool.name ?? tool.key
    };
}

function getStackIcon(toolKey) {
    const key = toolKey.toLowerCase().trim();
    return stackIconMap[key];
}

function MemberCard({ member, index, onOpen }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.48, delay: index * 0.07 }}
            style={{ height: '100%' }}
        >
            <Box
                onClick={() => onOpen(member)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        onOpen(member);
                    }
                }}
                sx={{
                    height: '100%',
                    minHeight: { xs: 340, md: 430 },
                    borderRadius: '20px',
                    background: '#0A0A0A',
                    border: '1px solid rgba(255,255,255,0.08)',
                    p: { xs: 2.6, md: 3 },
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
                    '&:hover': {
                        borderColor: member.accent,
                        boxShadow: `0 10px 34px ${member.accent}18`,
                        transform: 'translateY(-4px)'
                    },
                    '&:focus-visible': {
                        outline: 'none',
                        borderColor: member.accent,
                        boxShadow: `0 0 0 2px ${member.accent}44`
                    }
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `url(${member.photo})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'grayscale(1) saturate(0.45) brightness(0.5)',
                        transform: 'scale(1.02)',
                        transition: 'filter 0.35s ease, transform 0.35s ease',
                        '.MuiBox-root[role="button"]:hover &': {
                            filter: 'grayscale(0) saturate(1) brightness(0.72)',
                            transform: 'scale(1.05)'
                        }
                    }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.62) 55%, rgba(0,0,0,0.88) 100%)'
                    }}
                />

                <Stack direction="row" justifyContent="flex-end" alignItems="flex-start" spacing={1.5} sx={{ position: 'relative', zIndex: 2 }}>
                    <Typography variant="caption" sx={{ color: member.accent, letterSpacing: 1.8, fontWeight: 700, textTransform: 'uppercase', fontSize: '0.68rem' }}>
                        {member.role}
                    </Typography>
                </Stack>

                <Box
                    sx={{
                        mt: { xs: 14, md: 20 },
                        p: { xs: 1.6, md: 1.8 },
                        borderRadius: '12px',
                        background: 'rgba(5,5,5,0.55)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        backdropFilter: 'blur(10px)',
                        position: 'relative',
                        zIndex: 2
                    }}
                >
                    <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: { xs: '1.3rem', md: '1.58rem' }, lineHeight: 1.08, letterSpacing: '-0.02em' }}>
                        {member.name}
                    </Typography>

                    <Typography sx={{ mt: 0.7, color: 'rgba(255,255,255,0.92)', fontWeight: 700, fontSize: '0.76rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                        Especialização
                    </Typography>
                    <Typography sx={{ mt: 0.2, color: member.accent, fontWeight: 700, fontSize: '0.92rem', letterSpacing: '0.01em' }}>
                        {member.specialties?.[0] ?? member.role}
                    </Typography>

                    <Stack direction="row" alignItems="center" spacing={0.8} sx={{ mt: 1.35 }}>
                        <Typography sx={{ color: '#fff', fontWeight: 600, fontSize: '0.86rem' }}>
                            Ver perfil completo
                        </Typography>
                        <TbArrowUpRight color="#fff" size={17} />
                    </Stack>
                </Box>
            </Box>
        </motion.div>
    );
}

export default function About() {
    const theme = useTheme();
    const members = getAboutMembers();
    const [selectedMember, setSelectedMember] = useState(null);

    return (
        <Box component="section" sx={{ py: { xs: 10, md: 15 }, position: 'relative' }}>
            <Container maxWidth="lg">
                <Box mb={{ xs: 7, md: 10 }} textAlign="left">
                    <Typography variant="overline" color="primary" sx={{ letterSpacing: 4, fontWeight: 700, fontSize: '0.72rem', opacity: 0.95 }}>
                        QUEM FAZ A WAVEM
                    </Typography>
                    <Typography
                        variant="h3"
                        fontWeight={800}
                        sx={{
                            mt: 1.4,
                            mb: 2.4,
                            maxWidth: 860,
                            fontSize: { xs: '2rem', sm: '2.35rem', md: '3.1rem' },
                            lineHeight: 1.06,
                            letterSpacing: '-0.03em'
                        }}
                    >
                        Um time de especialistas com <span style={{ color: theme.palette.primary.main }}>foco em resultado real.</span>
                    </Typography>
                    <Typography sx={{ maxWidth: 700, color: 'rgba(228,228,231,0.72)', lineHeight: 1.75, fontSize: { xs: '0.95rem', md: '1rem' }, letterSpacing: '0.01em' }}>
                        Clique em cada perfil para conhecer habilidades, áreas de foco, projetos pessoais e canais individuais de contato.
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
                        gap: { xs: 2.2, sm: 2.8, md: 3.2 }
                    }}
                >
                    {members.map((member, index) => (
                        <Box key={member.id} sx={{ gridColumn: { xs: '1 / -1', sm: 'span 6', md: 'span 6' } }}>
                            <MemberCard member={member} index={index} onOpen={setSelectedMember} />
                        </Box>
                    ))}
                </Box>
            </Container>

            <Dialog
                open={Boolean(selectedMember)}
                onClose={() => setSelectedMember(null)}
                maxWidth="lg"
                fullWidth
                PaperProps={{
                    sx: {
                        background: '#080808',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '18px',
                        overflow: 'hidden'
                    }
                }}
            >
                {selectedMember && (
                    <DialogContent
                        sx={{
                            p: 0,
                            maxHeight: '88vh',
                            overflowY: 'auto',
                            scrollBehavior: 'smooth',
                            position: 'relative',
                            scrollbarWidth: 'thin',
                            scrollbarColor: `${selectedMember.accent}99 rgba(255,255,255,0.1)`,
                            '&::-webkit-scrollbar': {
                                width: '10px'
                            },
                            '&::-webkit-scrollbar-track': {
                                background: 'rgba(255,255,255,0.06)',
                                borderRadius: '12px'
                            },
                            '&::-webkit-scrollbar-thumb': {
                                background: `linear-gradient(180deg, ${selectedMember.accent}, rgba(255,255,255,0.35))`,
                                borderRadius: '12px',
                                border: '2px solid rgba(8,8,8,0.7)'
                            },
                            '&::-webkit-scrollbar-thumb:hover': {
                                background: `linear-gradient(180deg, ${selectedMember.accent}, rgba(255,255,255,0.5))`
                            }
                        }}
                    >
                        <Box
                            sx={{
                                position: 'sticky',
                                top: 0,
                                zIndex: 4,
                                height: 22,
                                marginBottom: '-22px',
                                pointerEvents: 'none',
                                background: 'linear-gradient(180deg, rgba(8,8,8,0.96) 0%, rgba(8,8,8,0) 100%)'
                            }}
                        />

                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: { xs: '1fr', md: '5fr 7fr' },
                                borderBottom: '1px solid rgba(255,255,255,0.08)',
                                background: `linear-gradient(145deg, ${selectedMember.accent}12 0%, rgba(8,8,8,0.92) 55%)`
                            }}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 1.02 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.35, ease: 'easeOut' }}
                            >
                                <Box
                                    sx={{
                                        minHeight: { xs: 220, md: 320 },
                                        position: 'relative',
                                        backgroundImage: `url(${selectedMember.photo})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        borderRight: { md: '1px solid rgba(255,255,255,0.08)' }
                                    }}
                                >
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            inset: 0,
                                            background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.68) 100%)'
                                        }}
                                    />
                                </Box>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.35, delay: 0.08, ease: 'easeOut' }}
                            >
                                <Box sx={{ p: { xs: 2.4, md: 3 } }}>
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.92, rotate: -10 }}
                                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                        transition={{ duration: 0.28, ease: 'easeOut' }}
                                        style={{ position: 'absolute', top: 14, right: 14, zIndex: 2 }}
                                    >
                                        <IconButton
                                            onClick={() => setSelectedMember(null)}
                                            component={motion.button}
                                            whileHover={{ scale: 1.06, rotate: 90 }}
                                            whileTap={{ scale: 0.94, rotate: 45 }}
                                            transition={{ type: 'spring', stiffness: 320, damping: 18 }}
                                            sx={{
                                                color: '#fff',
                                                border: '1px solid rgba(255,255,255,0.18)',
                                                background: 'rgba(0,0,0,0.35)',
                                                '&:hover': { background: 'rgba(0,0,0,0.55)' }
                                            }}
                                        >
                                            <TbX size={20} />
                                        </IconButton>
                                    </motion.div>

                                    <Typography variant="caption" sx={{ color: selectedMember.accent, letterSpacing: 1.8, fontWeight: 700, textTransform: 'uppercase', fontSize: '0.68rem' }}>
                                        {selectedMember.role}
                                    </Typography>
                                    <Typography sx={{ mt: 0.35, color: '#fff', fontWeight: 800, lineHeight: 1.05, fontSize: { xs: '1.5rem', md: '2rem' }, letterSpacing: '-0.024em', pr: { md: 5 } }}>
                                        {selectedMember.name}
                                    </Typography>

                                    <Typography sx={{ mt: 0.9, color: selectedMember.accent, fontWeight: 700, fontSize: '0.86rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                                        Especialização • {selectedMember.specialties?.[0] ?? selectedMember.role}
                                    </Typography>

                                    <Typography sx={{ mt: 1.4, color: 'rgba(228,228,231,0.78)', lineHeight: 1.75, fontSize: { xs: '0.92rem', md: '0.98rem' } }}>
                                        {selectedMember.bio}
                                    </Typography>
                                </Box>
                            </motion.div>
                        </Box>

                        <Box sx={{ p: { xs: 2.4, md: 3 } }}>
                            <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.96rem' }}>Habilidades e focos</Typography>

                            <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mt: 1.2 }}>
                                {selectedMember.specialties.map((item) => (
                                    <Chip
                                        key={item}
                                        label={item}
                                        size="small"
                                        variant="outlined"
                                        sx={{
                                            color: '#fff',
                                            borderColor: 'rgba(255,255,255,0.2)',
                                            background: 'rgba(255,255,255,0.03)',
                                            '& .MuiChip-label': { fontWeight: 600, fontSize: '0.72rem' }
                                        }}
                                    />
                                ))}
                            </Stack>

                            <Stack spacing={1} sx={{ mt: 1.8 }}>
                                {selectedMember.focuses.map((focus) => (
                                    <Typography key={focus} sx={{ color: 'rgba(228,228,231,0.76)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                                        • {focus}
                                    </Typography>
                                ))}
                            </Stack>

                            <Typography sx={{ mt: 2.4, color: '#fff', fontWeight: 700, fontSize: '0.96rem' }}>Stack de trabalho</Typography>
                            <Stack direction="row" flexWrap="wrap" gap={0.9} sx={{ mt: 1.1 }}>
                                {(selectedMember.workTools ?? []).map((tool) => (
                                    <Tooltip key={tool.key} title={getToolMeta(tool).name} arrow>
                                        <Box
                                            sx={{
                                                width: 36,
                                                height: 36,
                                                borderRadius: '10px',
                                                border: '1px solid rgba(255,255,255,0.18)',
                                                background: 'rgba(255,255,255,0.03)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: 'rgba(255,255,255,0.92)',
                                                transition: 'all 0.2s ease',
                                                '&:hover': {
                                                    borderColor: selectedMember.accent,
                                                    background: `${selectedMember.accent}1A`,
                                                    color: '#fff',
                                                    transform: 'translateY(-2px)'
                                                }
                                            }}
                                        >
                                            {(() => {
                                                const toolMeta = getToolMeta(tool);
                                                const Icon = getStackIcon(toolMeta.key);
                                                return Icon ? (
                                                    <Icon size={16} />
                                                ) : (
                                                    <Typography sx={{ fontSize: '0.62rem', fontWeight: 700 }}>
                                                        {toolMeta.name.slice(0, 2).toUpperCase()}
                                                    </Typography>
                                                );
                                            })()}
                                        </Box>
                                    </Tooltip>
                                ))}
                            </Stack>

                            <Typography sx={{ mt: 2.4, color: '#fff', fontWeight: 700, fontSize: '0.96rem' }}>Soft Skills</Typography>
                            <Stack direction="row" flexWrap="wrap" gap={0.9} sx={{ mt: 1.1 }}>
                                {(selectedMember.softSkills ?? []).map((skill) => (
                                    <Chip
                                        key={skill}
                                        label={skill}
                                        size="small"
                                        variant="outlined"
                                        sx={{
                                            color: 'rgba(255,255,255,0.92)',
                                            borderColor: 'rgba(255,255,255,0.22)',
                                            background: 'rgba(255,255,255,0.03)',
                                            '& .MuiChip-label': { fontWeight: 600, fontSize: '0.72rem' }
                                        }}
                                    />
                                ))}
                            </Stack>

                            <Typography sx={{ mt: 2.2, color: '#fff', fontWeight: 700, fontSize: '0.96rem' }}>Hobbies</Typography>
                            <Typography sx={{ mt: 0.9, color: 'rgba(228,228,231,0.74)', lineHeight: 1.7, fontSize: '0.9rem' }}>
                                {(selectedMember.hobbies ?? []).join(' • ')}
                            </Typography>

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

                            <Box
                                sx={{
                                    mt: 2.4,
                                    p: { xs: 1.2, md: 1.3 },
                                    borderRadius: '12px',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    background: `linear-gradient(90deg, ${selectedMember.accent}22 0%, rgba(255,255,255,0.03) 42%, rgba(255,255,255,0.02) 100%)`
                                }}
                            >
                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.2}>
                                    <Button
                                        component="a"
                                        href={`https://wa.me/5500000000000?text=${encodeURIComponent(`Olá! Gostaria de falar com ${selectedMember.name} sobre um projeto na The Wavem.`)}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        variant="contained"
                                        startIcon={<TbBrandWhatsapp size={18} />}
                                        sx={{ borderRadius: '10px', fontWeight: 700, px: 2.1, py: 0.95 }}
                                    >
                                        Falar com {selectedMember.name}
                                    </Button>

                                    {selectedMember.links.map((link) => (
                                        <Button
                                            key={link.key}
                                            component="a"
                                            href={link.href}
                                            target="_blank"
                                            rel="noreferrer"
                                            variant="outlined"
                                            endIcon={<TbExternalLink size={16} />}
                                            sx={{
                                                borderRadius: '10px',
                                                color: '#fff',
                                                borderColor: 'rgba(255,255,255,0.24)',
                                                fontWeight: 600,
                                                '&:hover': { borderColor: selectedMember.accent, background: 'rgba(255,255,255,0.04)' }
                                            }}
                                        >
                                            {link.label}
                                        </Button>
                                    ))}
                                </Stack>
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                position: 'sticky',
                                bottom: 0,
                                zIndex: 4,
                                height: 24,
                                marginTop: '-24px',
                                pointerEvents: 'none',
                                background: `linear-gradient(0deg, rgba(8,8,8,0.98) 0%, rgba(8,8,8,0) 100%)`
                            }}
                        />
                    </DialogContent>
                )}
            </Dialog>
        </Box>
    );
}
