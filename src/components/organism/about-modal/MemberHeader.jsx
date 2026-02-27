import { Box, IconButton, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { TbX } from 'react-icons/tb';

export default function MemberHeader({ selectedMember, onClose }) {
    return (
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
                            onClick={onClose}
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
    );
}
