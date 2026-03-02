import { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { getAboutMembers, getAboutTeamContent } from '@/service/content';
import TeamMemberCard from '@/components/organism/TeamMemberCard';
import TeamMemberDetailsModal from '@/components/organism/TeamMemberDetailsModal';

export default function AboutTeamSection() {
    const content = getAboutTeamContent();
    const aboutAccent = content.accent ?? '#38BDF8';
    const members = getAboutMembers();
    const [selectedMember, setSelectedMember] = useState(null);

    return (
        <Box component="section" sx={{ pb: { xs: 10, md: 15 }, pt: { xs: 1, md: 2 }, position: 'relative' }}>
            <Box
                aria-hidden
                sx={{
                    position: 'absolute',
                    left: { xs: -120, md: -140 },
                    top: { xs: 120, md: 40 },
                    width: { xs: 220, md: 280 },
                    height: { xs: 220, md: 280 },
                    borderRadius: '50%',
                    filter: 'blur(84px)',
                    background: `${aboutAccent}22`,
                    pointerEvents: 'none'
                }}
            />

            <Container maxWidth="lg">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.48, ease: 'easeOut' }}
                >
                    <Box sx={{ mb: { xs: 2.2, md: 2.8 }, maxWidth: 720, position: 'relative', zIndex: 2 }}>
                        <Typography variant="overline" sx={{ color: aboutAccent, letterSpacing: 2.4, fontWeight: 700, fontSize: '0.68rem' }}>
                            {content.eyebrow}
                        </Typography>
                        <Typography sx={{ mt: 0.8, color: 'rgba(228,228,231,0.72)', lineHeight: 1.75, fontSize: { xs: '0.92rem', md: '0.97rem' } }}>
                            {content.description}
                        </Typography>
                    </Box>
                </motion.div>

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
                        gap: { xs: 2.2, sm: 2.8, md: 3.2 }
                    }}
                >
                    {members.map((member, index) => (
                        <Box key={member.id} sx={{ gridColumn: { xs: '1 / -1', sm: 'span 6', md: 'span 6' } }}>
                            <TeamMemberCard member={member} index={index} onOpen={setSelectedMember} />
                        </Box>
                    ))}
                </Box>
            </Container>

            <TeamMemberDetailsModal
                selectedMember={selectedMember}
                onClose={() => setSelectedMember(null)}
            />
        </Box>
    );
}
