import { useEffect, useMemo } from 'react';
import { Box } from '@mui/material';
import { getServicesContent } from '@/service/content';
import ServicesHeroSection from '@/section/services/ServicesHeroSection';
import ServicesHighlightsSection from '@/section/services/ServicesHighlightsSection';
import ServicesProcessSection from '@/section/services/ServicesProcessSection';
import { trackPageView } from '@/service/analytics/tracking.service';

export default function Services() {
    const content = useMemo(() => getServicesContent(), []);
    const accent = content.accent?.end ?? '#8C2438';

    useEffect(() => {
        trackPageView('services');
    }, []);

    return (
        <Box component="main" sx={{ pt: { xs: 11, md: 14 }, pb: { xs: 8, md: 12 }, position: 'relative' }}>
            <Box
                aria-hidden
                sx={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `radial-gradient(circle at 12% 10%, ${accent}24 0%, transparent 32%), radial-gradient(circle at 88% 26%, ${accent}1A 0%, transparent 28%)`,
                    pointerEvents: 'none'
                }}
            />

            <ServicesHeroSection content={content} accent={accent} />
            <ServicesHighlightsSection content={content} accent={accent} />
            <ServicesProcessSection content={content} accent={accent} />
        </Box>
    );
}
