import { Box, Button, Chip, Dialog, DialogContent, IconButton, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { TbExternalLink, TbX } from 'react-icons/tb';

export default function ProjectDetailsModal({
    project,
    open,
    onClose,
    actionLabel = 'Acessar projeto',
    coverMinHeight = { xs: 250, md: 350 }
}) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
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
            {project && (
                <DialogContent sx={{ p: 0 }}>
                    <Box
                        sx={{
                            minHeight: coverMinHeight,
                            position: 'relative',
                            backgroundImage: project.cover,
                            borderBottom: '1px solid rgba(255,255,255,0.08)'
                        }}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(180deg, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.7) 72%, rgba(0,0,0,0.88) 100%)'
                            }}
                        />

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

                        <Box sx={{ position: 'absolute', left: 24, right: 24, bottom: 24 }}>
                            <Typography sx={{ color: 'rgba(255,255,255,0.88)', letterSpacing: 1.6, fontWeight: 700, textTransform: 'uppercase', fontSize: '0.68rem' }}>
                                {project.tag}
                            </Typography>
                            <Typography
                                variant="h4"
                                sx={{
                                    color: '#fff',
                                    mt: 1,
                                    fontWeight: 800,
                                    lineHeight: 1.08,
                                    letterSpacing: '-0.024em',
                                    fontSize: { xs: '1.4rem', md: '2rem' }
                                }}
                            >
                                {project.title}
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{ p: { xs: 2.4, md: 3.2 } }}>
                        <Typography sx={{ color: 'rgba(228,228,231,0.78)', lineHeight: 1.8, fontSize: { xs: '0.94rem', md: '1rem' } }}>
                            {project.details}
                        </Typography>

                        <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mt: 2.2 }}>
                            {project.stack.map((item) => (
                                <Chip
                                    key={item}
                                    label={item}
                                    size="small"
                                    sx={{
                                        color: '#fff',
                                        borderColor: 'rgba(255,255,255,0.22)',
                                        background: 'rgba(255,255,255,0.03)',
                                        '& .MuiChip-label': { px: 1.2, fontWeight: 600, fontSize: '0.72rem' }
                                    }}
                                    variant="outlined"
                                />
                            ))}
                        </Stack>

                        <Button
                            href={project.href}
                            target="_blank"
                            rel="noreferrer"
                            variant="contained"
                            endIcon={<TbExternalLink size={18} />}
                            sx={{
                                mt: 3,
                                px: 2.2,
                                py: 1,
                                fontWeight: 700,
                                borderRadius: '10px'
                            }}
                        >
                            {actionLabel}
                        </Button>
                    </Box>
                </DialogContent>
            )}
        </Dialog>
    );
}
