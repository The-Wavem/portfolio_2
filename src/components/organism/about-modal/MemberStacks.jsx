import { Box, Chip, Stack, Tooltip, Typography } from '@mui/material';
import { getStackIcon, getToolMeta } from '@/components/organism/aboutTeam.utils';

export default function MemberStacks({ selectedMember }) {
    return (
        <>
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
        </>
    );
}
