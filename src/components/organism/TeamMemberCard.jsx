import { Box, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { TbArrowUpRight } from 'react-icons/tb';

export default function TeamMemberCard({ member, index, onOpen }) {
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
