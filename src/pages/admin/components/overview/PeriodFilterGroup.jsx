import { memo } from 'react';
import { Button, Stack, Typography } from '@mui/material';

function PeriodFilterGroupBase({ title, options, value, onChange }) {
    return (
        <Stack spacing={0.6}>
            <Typography sx={{ color: 'rgba(228,228,231,0.66)', fontSize: '0.76rem', fontWeight: 700 }}>
                {title}
            </Typography>
            <Stack direction="row" spacing={1}>
                {options.map((option) => {
                    const active = value === option.value;

                    return (
                        <Button
                            key={option.label}
                            onClick={() => onChange(option.value)}
                            sx={{
                                borderRadius: '999px',
                                textTransform: 'none',
                                fontWeight: 700,
                                px: 2,
                                color: active ? '#fff' : 'rgba(228,228,231,0.82)',
                                bgcolor: active ? 'rgba(124,58,237,0.7)' : 'rgba(255,255,255,0.05)',
                                border: `1px solid ${active ? 'rgba(124,58,237,0.9)' : 'rgba(255,255,255,0.14)'}`
                            }}
                        >
                            {option.label}
                        </Button>
                    );
                })}
            </Stack>
        </Stack>
    );
}

export const PeriodFilterGroup = memo(PeriodFilterGroupBase);
