import { memo, useEffect, useMemo, useState } from 'react';
import { Box, Button, CircularProgress, Dialog, DialogContent, DialogTitle, Grow, IconButton, Stack, TextField, Typography } from '@mui/material';
import { TbTimeline, TbX } from 'react-icons/tb';
import { getInteractionsBatchConfig } from './overview.config';

function InteractionsModalBase({
    open,
    onClose,
    items,
    hasMoreRemote = false,
    loadingRemote = false,
    onLoadMoreRemote,
    serverFilter,
    onServerFilterChange,
    loadingServerFilter = false
}) {
    const batchConfig = useMemo(() => getInteractionsBatchConfig(), []);
    const [visibleCount, setVisibleCount] = useState(batchConfig.initial);
    const [filterMode, setFilterMode] = useState(serverFilter?.mode ?? 'range');
    const [startDate, setStartDate] = useState(serverFilter?.startDate ?? '');
    const [endDate, setEndDate] = useState(serverFilter?.endDate ?? '');
    const [singleDate, setSingleDate] = useState(serverFilter?.singleDate ?? '');

    useEffect(() => {
        if (open) {
            setVisibleCount(batchConfig.initial);
            setFilterMode(serverFilter?.mode ?? 'range');
            setStartDate(serverFilter?.startDate ?? '');
            setEndDate(serverFilter?.endDate ?? '');
            setSingleDate(serverFilter?.singleDate ?? '');
        }
    }, [open, items, batchConfig.initial, serverFilter?.mode, serverFilter?.startDate, serverFilter?.endDate, serverFilter?.singleDate]);

    useEffect(() => {
        if (!open || typeof onServerFilterChange !== 'function') {
            return;
        }

        onServerFilterChange({
            mode: filterMode,
            startDate,
            endDate,
            singleDate
        });
    }, [open, filterMode, startDate, endDate, singleDate, onServerFilterChange]);

    const visibleItems = useMemo(() => items.slice(0, visibleCount), [items, visibleCount]);
    const hasMoreItems = visibleCount < items.length;

    function handleLoadMore() {
        setVisibleCount((current) => Math.min(current + batchConfig.next, items.length));
    }

    function handleClearFilters() {
        setFilterMode('range');
        setStartDate('');
        setEndDate('');
        setSingleDate('');
        setVisibleCount(batchConfig.initial);
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
                    borderRadius: '22px',
                    bgcolor: 'rgba(10,10,12,0.95)',
                    border: '1px solid rgba(124,58,237,0.28)',
                    boxShadow: '0 28px 90px rgba(8,8,12,0.72), 0 0 0 1px rgba(255,255,255,0.04) inset',
                    backdropFilter: 'blur(18px)',
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
                        px: 2.4,
                        py: 1.8,
                        borderBottom: '1px solid rgba(124,58,237,0.24)',
                        background: 'linear-gradient(120deg, rgba(124,58,237,0.3), rgba(56,189,248,0.08) 50%, rgba(12,12,16,0.42) 100%)'
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
                    <IconButton
                        onClick={onClose}
                        sx={{
                            color: 'rgba(228,228,231,0.82)',
                            border: '1px solid rgba(255,255,255,0.18)',
                            bgcolor: 'rgba(255,255,255,0.03)',
                            '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' }
                        }}
                    >
                        <TbX size={18} />
                    </IconButton>
                </Stack>
            </DialogTitle>
            <DialogContent sx={{ px: 2.4, py: 2 }}>
                <Box
                    sx={{
                        p: { xs: 1.3, md: 1.5 },
                        borderRadius: '16px',
                        border: '1px solid rgba(255,255,255,0.12)',
                        background: 'linear-gradient(165deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
                        mb: 1.4
                    }}
                >
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={1} sx={{ mb: 1.3 }}>
                    <Button
                        onClick={() => setFilterMode('range')}
                        sx={{
                            borderRadius: '999px',
                            textTransform: 'none',
                            fontWeight: 700,
                            color: filterMode === 'range' ? '#DDD6FE' : 'rgba(228,228,231,0.76)',
                            border: filterMode === 'range'
                                ? '1px solid rgba(124,58,237,0.55)'
                                : '1px solid rgba(255,255,255,0.18)',
                            bgcolor: filterMode === 'range' ? 'rgba(124,58,237,0.12)' : 'transparent',
                            px: 1.6,
                            alignSelf: 'flex-start'
                        }}
                    >
                        Intervalo (X até Y)
                    </Button>
                    <Button
                        onClick={() => setFilterMode('single')}
                        sx={{
                            borderRadius: '999px',
                            textTransform: 'none',
                            fontWeight: 700,
                            color: filterMode === 'single' ? '#DDD6FE' : 'rgba(228,228,231,0.76)',
                            border: filterMode === 'single'
                                ? '1px solid rgba(124,58,237,0.55)'
                                : '1px solid rgba(255,255,255,0.18)',
                            bgcolor: filterMode === 'single' ? 'rgba(124,58,237,0.12)' : 'transparent',
                            px: 1.6,
                            alignSelf: 'flex-start'
                        }}
                    >
                        Dia específico
                    </Button>

                    <Button
                        onClick={handleClearFilters}
                        sx={{
                            borderRadius: '999px',
                            textTransform: 'none',
                            fontWeight: 700,
                            color: 'rgba(228,228,231,0.78)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            px: 1.6,
                            alignSelf: 'flex-start'
                        }}
                    >
                        Limpar filtros
                    </Button>
                </Stack>

                {filterMode === 'range' ? (
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ mb: 1.4 }}>
                        <TextField
                            label="Data inicial"
                            type="date"
                            size="small"
                            value={startDate}
                            onChange={(event) => setStartDate(event.target.value)}
                            InputLabelProps={{ shrink: true }}
                            sx={{
                                minWidth: { xs: '100%', sm: 180 },
                                '& .MuiInputBase-root': {
                                    color: '#E4E4E7',
                                    borderRadius: '10px',
                                    background: 'rgba(8,8,10,0.5)'
                                },
                                '& .MuiInputLabel-root': { color: 'rgba(228,228,231,0.72)' },
                                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.2)' },
                                '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'rgba(124,58,237,0.6)'
                                }
                            }}
                        />
                        <TextField
                            label="Data final"
                            type="date"
                            size="small"
                            value={endDate}
                            onChange={(event) => setEndDate(event.target.value)}
                            InputLabelProps={{ shrink: true }}
                            sx={{
                                minWidth: { xs: '100%', sm: 180 },
                                '& .MuiInputBase-root': {
                                    color: '#E4E4E7',
                                    borderRadius: '10px',
                                    background: 'rgba(8,8,10,0.5)'
                                },
                                '& .MuiInputLabel-root': { color: 'rgba(228,228,231,0.72)' },
                                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.2)' },
                                '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'rgba(124,58,237,0.6)'
                                }
                            }}
                        />
                    </Stack>
                ) : (
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ mb: 1.4 }}>
                        <TextField
                            label="Dia"
                            type="date"
                            size="small"
                            value={singleDate}
                            onChange={(event) => setSingleDate(event.target.value)}
                            InputLabelProps={{ shrink: true }}
                            sx={{
                                minWidth: { xs: '100%', sm: 180 },
                                '& .MuiInputBase-root': {
                                    color: '#E4E4E7',
                                    borderRadius: '10px',
                                    background: 'rgba(8,8,10,0.5)'
                                },
                                '& .MuiInputLabel-root': { color: 'rgba(228,228,231,0.72)' },
                                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.2)' },
                                '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'rgba(124,58,237,0.6)'
                                }
                            }}
                        />
                    </Stack>
                )}
                </Box>

                {loadingServerFilter ? (
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ px: 0.2, pb: 1 }}>
                        <CircularProgress size={16} sx={{ color: '#A78BFA' }} />
                        <Typography sx={{ color: 'rgba(228,228,231,0.8)', fontSize: '0.8rem' }}>
                            Buscando no Firebase para o recorte selecionado...
                        </Typography>
                    </Stack>
                ) : null}

                <Stack spacing={1.1} sx={{ maxHeight: 520, overflowY: 'auto', pr: 0.3 }}>
                    {items.length ? visibleItems.map((item) => (
                        <Box
                            key={item.id}
                            sx={{
                                p: 1.4,
                                borderRadius: '14px',
                                border: '1px solid rgba(255,255,255,0.12)',
                                background: 'linear-gradient(160deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
                                transition: 'transform 160ms ease, border-color 160ms ease, background 160ms ease',
                                '&:hover': {
                                    transform: 'translateX(2px)',
                                    borderColor: 'rgba(124,58,237,0.5)',
                                    background: 'linear-gradient(160deg, rgba(124,58,237,0.16), rgba(255,255,255,0.03))'
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
                                Sem interações no filtro aplicado
                            </Typography>
                            <Typography sx={{ color: 'rgba(228,228,231,0.68)', fontSize: '0.82rem' }}>
                                Ajuste as datas ou limpe o filtro para ampliar a busca.
                            </Typography>
                        </Stack>
                    )}

                    {items.length ? (
                        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'stretch', sm: 'center' }} spacing={0.8} sx={{ pt: 0.8 }}>
                            <Typography sx={{ color: 'rgba(228,228,231,0.68)', fontSize: '0.78rem' }}>
                                Exibindo {Math.min(visibleCount, items.length)} de {items.length} interações
                            </Typography>

                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={0.8} alignItems={{ xs: 'flex-start', sm: 'center' }}>
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

                                {hasMoreRemote && typeof onLoadMoreRemote === 'function' ? (
                                    <Button
                                        onClick={onLoadMoreRemote}
                                        disabled={loadingRemote}
                                        sx={{
                                            borderRadius: '999px',
                                            textTransform: 'none',
                                            fontWeight: 700,
                                            color: '#93C5FD',
                                            border: '1px solid rgba(59,130,246,0.42)',
                                            px: 1.6,
                                            alignSelf: { xs: 'flex-start', sm: 'auto' },
                                            '&:hover': {
                                                borderColor: 'rgba(147,197,253,0.8)',
                                                bgcolor: 'rgba(59,130,246,0.18)'
                                            },
                                            '&.Mui-disabled': {
                                                color: 'rgba(147,197,253,0.5)',
                                                borderColor: 'rgba(59,130,246,0.24)'
                                            }
                                        }}
                                    >
                                        {loadingRemote ? 'Carregando...' : 'Carregar mais do Firebase'}
                                    </Button>
                                ) : null}
                            </Stack>
                        </Stack>
                    ) : null}
                </Stack>
            </DialogContent>
        </Dialog>
    );
}

export const InteractionsModal = memo(InteractionsModalBase);
