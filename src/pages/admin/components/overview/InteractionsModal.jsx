import { memo, useEffect, useMemo, useState } from 'react';
import { Box, Button, Dialog, DialogContent, DialogTitle, Grow, IconButton, Stack, Typography } from '@mui/material';
import { TbTimeline, TbX } from 'react-icons/tb';
import { getInteractionsBatchConfig } from './overview.config';

function InteractionsModalBase({ open, onClose, items }) {
    const batchConfig = useMemo(() => getInteractionsBatchConfig(), []);
    const [visibleCount, setVisibleCount] = useState(batchConfig.initial);

    useEffect(() => {
        if (open) {
            setVisibleCount(batchConfig.initial);
        }
    }, [open, items, batchConfig.initial]);

    const visibleItems = useMemo(() => items.slice(0, visibleCount), [items, visibleCount]);
    const hasMoreItems = visibleCount < items.length;

    function handleLoadMore() {
        setVisibleCount((current) => Math.min(current + batchConfig.next, items.length));
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            TransitionComponent={Grow}
            TransitionProps={{ timeout: { enter: 280, exit: 180 } }}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: '18px',
                    bgcolor: 'rgba(12,12,14,0.96)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    backdropFilter: 'blur(14px)',
                    overflow: 'hidden',
                    transformOrigin: 'center 22%'
                }
            }}
        >
            <DialogTitle sx={{ color: '#fff', fontWeight: 800, p: 0 }}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                        px: 2.2,
                        py: 1.6,
                        borderBottom: '1px solid rgba(255,255,255,0.1)',
                        background: 'linear-gradient(160deg, rgba(124,58,237,0.16), rgba(18,18,22,0.2))'
                    }}
                >
                    <Box>
                        <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '1.05rem' }}>
                            Todas as interações
                        </Typography>
                        <Typography sx={{ color: 'rgba(228,228,231,0.68)', fontSize: '0.82rem' }}>
                            Histórico detalhado do período selecionado
                        </Typography>
                    </Box>
                    <IconButton onClick={onClose} sx={{ color: 'rgba(228,228,231,0.82)', border: '1px solid rgba(255,255,255,0.16)' }}>
                        <TbX size={18} />
                    </IconButton>
                </Stack>
            </DialogTitle>
            <DialogContent sx={{ px: 2.2, py: 1.8 }}>
                <Stack spacing={1.1} sx={{ maxHeight: 520, overflowY: 'auto', pr: 0.3 }}>
                    {items.length ? visibleItems.map((item) => (
                        <Box
                            key={item.id}
                            sx={{
                                p: 1.3,
                                borderRadius: '12px',
                                border: '1px solid rgba(255,255,255,0.12)',
                                background: 'linear-gradient(160deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015))',
                                transition: 'transform 160ms ease, border-color 160ms ease, background 160ms ease',
                                '&:hover': {
                                    transform: 'translateX(2px)',
                                    borderColor: 'rgba(124,58,237,0.4)',
                                    background: 'linear-gradient(160deg, rgba(124,58,237,0.12), rgba(255,255,255,0.02))'
                                }
                            }}
                        >
                            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1.2}>
                                <Stack direction="row" spacing={0.9} alignItems="center" sx={{ minWidth: 0 }}>
                                    <Box sx={{ width: 22, height: 22, borderRadius: '999px', display: 'grid', placeItems: 'center', bgcolor: 'rgba(124,58,237,0.2)', border: '1px solid rgba(124,58,237,0.42)', flexShrink: 0 }}>
                                        <TbTimeline size={13} color="#DDD6FE" />
                                    </Box>
                                    <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem' }}>{item.label}</Typography>
                                </Stack>
                                <Typography sx={{ color: 'rgba(228,228,231,0.72)', fontSize: '0.78rem', flexShrink: 0 }}>{item.date}</Typography>
                            </Stack>

                            <Stack direction="row" spacing={0.7} sx={{ mt: 0.8, flexWrap: 'wrap', rowGap: 0.6 }}>
                                {[item.page, item.section, item.action].filter(Boolean).map((detail) => (
                                    <Box
                                        key={`${item.id}-${detail}`}
                                        sx={{
                                            px: 0.9,
                                            py: 0.3,
                                            borderRadius: '999px',
                                            bgcolor: 'rgba(255,255,255,0.06)',
                                            border: '1px solid rgba(255,255,255,0.1)'
                                        }}
                                    >
                                        <Typography sx={{ color: 'rgba(228,228,231,0.76)', fontSize: '0.72rem', fontWeight: 600 }}>
                                            {detail}
                                        </Typography>
                                    </Box>
                                ))}
                            </Stack>
                        </Box>
                    )) : (
                        <Stack spacing={0.8} alignItems="center" sx={{ py: 5 }}>
                            <Box sx={{ width: 48, height: 48, borderRadius: '999px', display: 'grid', placeItems: 'center', bgcolor: 'rgba(124,58,237,0.16)', border: '1px solid rgba(124,58,237,0.35)' }}>
                                <TbTimeline size={24} color="#C4B5FD" />
                            </Box>
                            <Typography sx={{ color: '#E4E4E7', fontSize: '0.95rem', fontWeight: 700 }}>
                                Sem interações no período
                            </Typography>
                            <Typography sx={{ color: 'rgba(228,228,231,0.68)', fontSize: '0.82rem' }}>
                                Assim que alguém interagir, os eventos aparecerão aqui.
                            </Typography>
                        </Stack>
                    )}

                    {items.length ? (
                        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'stretch', sm: 'center' }} spacing={0.8} sx={{ pt: 0.8 }}>
                            <Typography sx={{ color: 'rgba(228,228,231,0.68)', fontSize: '0.78rem' }}>
                                Exibindo {Math.min(visibleCount, items.length)} de {items.length} interações
                            </Typography>

                            {hasMoreItems ? (
                                <Button
                                    onClick={handleLoadMore}
                                    sx={{
                                        borderRadius: '999px',
                                        textTransform: 'none',
                                        fontWeight: 700,
                                        color: '#DDD6FE',
                                        border: '1px solid rgba(124,58,237,0.42)',
                                        px: 1.6,
                                        alignSelf: { xs: 'flex-start', sm: 'auto' },
                                        '&:hover': {
                                            borderColor: 'rgba(167,139,250,0.8)',
                                            bgcolor: 'rgba(124,58,237,0.18)'
                                        }
                                    }}
                                >
                                    Ver mais
                                </Button>
                            ) : null}
                        </Stack>
                    ) : null}
                </Stack>
            </DialogContent>
        </Dialog>
    );
}

export const InteractionsModal = memo(InteractionsModalBase);
