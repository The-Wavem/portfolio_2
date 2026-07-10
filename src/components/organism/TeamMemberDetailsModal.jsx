import {
    Box,
    Button,
    Chip,
    Dialog,
    DialogContent,
    IconButton,
    Stack,
    Tooltip,
    Typography
} from '@mui/material';
import { TbBrandWhatsapp, TbExternalLink } from 'react-icons/tb';
import MemberHeader from './about-modal/MemberHeader';
import MemberStacks from './about-modal/MemberStacks';
import MemberProjects from './about-modal/MemberProjects';

export default function TeamMemberDetailsModal({ selectedMember, onClose }) {
    const defaultAccent = '#38BDF8';
    const accent = selectedMember?.accent || defaultAccent;

    return (
        <Dialog
            open={Boolean(selectedMember)}
            onClose={onClose}
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
                        scrollbarColor: `${accent}99 rgba(255,255,255,0.1)`,
                        '&::-webkit-scrollbar': {
                            width: '10px'
                        },
                        '&::-webkit-scrollbar-track': {
                            background: 'rgba(255,255,255,0.06)',
                            borderRadius: '12px'
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: `linear-gradient(180deg, ${accent}, rgba(255,255,255,0.35))`,
                            borderRadius: '12px',
                            border: '2px solid rgba(8,8,8,0.7)'
                        },
                        '&::-webkit-scrollbar-thumb:hover': {
                            background: `linear-gradient(180deg, ${accent}, rgba(255,255,255,0.5))`
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

                    <MemberHeader selectedMember={selectedMember} onClose={onClose} />

                    <Box sx={{ p: { xs: 2.4, md: 3 } }}>
                        <MemberStacks selectedMember={selectedMember} />

                        <MemberProjects selectedMember={selectedMember} />

                        <Box
                            sx={{
                                mt: 2.4,
                                p: { xs: 1.2, md: 1.3 },
                                borderRadius: '12px',
                                border: '1px solid rgba(255,255,255,0.1)',
                                background: `linear-gradient(90deg, ${accent}22 0%, rgba(255,255,255,0.03) 42%, rgba(255,255,255,0.02) 100%)`
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

                                {selectedMember.socialLinks && Object.entries(selectedMember.socialLinks).map(([key, href]) => {
                                    if (!href) return null;
                                    return (
                                        <Button
                                            key={key}
                                            component="a"
                                            href={href}
                                            target="_blank"
                                            rel="noreferrer"
                                            variant="outlined"
                                            endIcon={<TbExternalLink size={16} />}
                                            sx={{
                                                borderRadius: '10px',
                                                color: '#fff',
                                                borderColor: 'rgba(255,255,255,0.24)',
                                                fontWeight: 600,
                                                textTransform: 'capitalize',
                                                '&:hover': { borderColor: accent, background: 'rgba(255,255,255,0.04)' }
                                            }}
                                        >
                                            {key}
                                        </Button>
                                    );
                                })}
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
                            background: 'linear-gradient(0deg, rgba(8,8,8,0.98) 0%, rgba(8,8,8,0) 100%)'
                        }}
                    />
                </DialogContent>
            )}
        </Dialog>
    );
}
