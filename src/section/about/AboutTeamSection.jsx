import { useState } from 'react';
import { Box, Container } from '@mui/material';
import { getAboutMembers } from '@/service/content';
import TeamMemberCard from '@/components/organism/TeamMemberCard';
import TeamMemberDetailsModal from '@/components/organism/TeamMemberDetailsModal';

export default function AboutTeamSection() {
    const members = getAboutMembers();
    const [selectedMember, setSelectedMember] = useState(null);

    return (
        <Box component="section" sx={{ pb: { xs: 10, md: 15 }, pt: { xs: 1, md: 2 }, position: 'relative' }}>
            <Container maxWidth="lg">
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
