import { Box, Chip, Stack, Tooltip, Typography } from '@mui/material';
import { getStackIcon, getToolMeta } from '@/components/organism/aboutTeam.utils';

export default function MemberStacks({ selectedMember }) {
    const specialties = selectedMember.specialties || [];
    const focuses = selectedMember.focuses || [];
    const stacks = selectedMember.stacks || [];
    const softSkills = selectedMember.softSkills || [];
    const hobbies = selectedMember.hobbies || [];

    return (
        <Box sx={{ mt: 2.4 }}>
            {/* 1. Habilidades e focos */}
            {(specialties.length > 0 || focuses.length > 0) && (
                <Box sx={{ mb: 2.4 }}>
                    <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '0.96rem', mb: 1.1 }}>Habilidades e focos</Typography>
                    
                    {specialties.length > 0 && (
                        <Stack direction="row" flexWrap="wrap" gap={0.8} sx={{ mb: 1.4 }}>
                            {specialties.map((item, idx) => (
                                <Chip
                                    key={idx}
                                    label={item}
                                    variant="outlined"
                                    sx={{
                                        color: '#fff',
                                        borderColor: 'rgba(255,255,255,0.2)',
                                        borderRadius: '999px',
                                        fontSize: '0.74rem',
                                        fontWeight: 700,
                                        height: 26
                                    }}
                                />
                            ))}
                        </Stack>
                    )}

                    {focuses.length > 0 && (
                        <Stack spacing={0.6}>
                            {focuses.map((item, idx) => (
                                <Typography key={idx} sx={{ color: 'rgba(228,228,231,0.8)', fontSize: '0.84rem', fontWeight: 500 }}>
                                    • {item}
                                </Typography>
                            ))}
                        </Stack>
                    )}
                </Box>
            )}

            {/* 2. Stack de trabalho */}
            {stacks.length > 0 && (
                <Box sx={{ mb: 2.4 }}>
                    <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '0.96rem', mb: 1.1 }}>Stack de trabalho</Typography>
                    <Stack direction="row" flexWrap="wrap" gap={0.9}>
                        {stacks.map((toolStr) => {
                            const tool = typeof toolStr === 'string' ? { key: toolStr, name: toolStr } : toolStr;
                            return (
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
                                                borderColor: selectedMember.accent || '#38BDF8',
                                                background: `${selectedMember.accent || '#38BDF8'}1A`,
                                                color: '#fff',
                                                transform: 'translateY(-2px)'
                                            }
                                        }}
                                    >
                                        {(() => {
                                            const toolMeta = getToolMeta(tool);
                                            const Icon = getStackIcon(toolMeta);
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
                            );
                        })}
                    </Stack>
                </Box>
            )}

            {/* 3. Soft Skills */}
            {softSkills.length > 0 && (
                <Box sx={{ mb: 2.4 }}>
                    <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '0.96rem', mb: 1.1 }}>Soft Skills</Typography>
                    <Stack direction="row" flexWrap="wrap" gap={0.8}>
                        {softSkills.map((item, idx) => (
                            <Chip
                                key={idx}
                                label={item}
                                variant="outlined"
                                sx={{
                                    color: '#fff',
                                    borderColor: 'rgba(255,255,255,0.2)',
                                    borderRadius: '999px',
                                    fontSize: '0.74rem',
                                    fontWeight: 700,
                                    height: 26
                                }}
                            />
                        ))}
                    </Stack>
                </Box>
            )}

            {/* 4. Hobbies */}
            {hobbies.length > 0 && (
                <Box sx={{ mb: 0 }}>
                    <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '0.96rem', mb: 0.8 }}>Hobbies</Typography>
                    <Typography sx={{ color: 'rgba(228,228,231,0.7)', fontSize: '0.84rem', fontWeight: 500 }}>
                        {hobbies.join(' • ')}
                    </Typography>
                </Box>
            )}
        </Box>
    );
}
