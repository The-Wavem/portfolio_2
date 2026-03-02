import { memo } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import {
    TbChartBar,
    TbClick,
    TbEye,
    TbMouse,
    TbTrophy,
    TbUsers
} from 'react-icons/tb';

const kpiIconMap = {
    eye: TbEye,
    click: TbClick,
    trophy: TbTrophy,
    mouse: TbMouse,
    users: TbUsers
};

function MetricCardBase({ item }) {
    const Icon = kpiIconMap[item.iconKey] ?? TbChartBar;

    return (
        <Box
            sx={{
                p: 2.8,
                borderRadius: '18px',
                background: `linear-gradient(160deg, ${item.accent}1C, rgba(16,16,18,0.98) 32%, rgba(10,10,12,0.98) 100%)`,
                border: '1px solid rgba(255,255,255,0.08)',
                minHeight: 164,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                transition: 'transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease',
                '&:hover': {
                    transform: 'translateY(-2px)',
                    borderColor: `${item.accent}66`,
                    boxShadow: `0 10px 24px ${item.accent}22`
                }
            }}
        >
            <Stack direction="row" spacing={1.4} alignItems="center">
                <Icon size={28} color={item.accent} />
                <Typography sx={{ color: '#F4F4F5', fontWeight: 800, fontSize: item.id === 'topProject' ? '2rem' : '2.3rem', letterSpacing: '-0.02em' }}>
                    {item.value}
                </Typography>
            </Stack>
            <Typography sx={{ mt: 0.45, color: 'rgba(228,228,231,0.66)', fontSize: '1rem' }}>{item.label}</Typography>
            {item.helper ? <Typography sx={{ mt: 0.25, color: 'rgba(228,228,231,0.58)', fontSize: '0.9rem' }}>{item.helper}</Typography> : null}
        </Box>
    );
}

export const MetricCard = memo(MetricCardBase);
