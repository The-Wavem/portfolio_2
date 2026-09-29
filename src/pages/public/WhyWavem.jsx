import { useEffect, useState } from 'react';
import { Box } from '@mui/material';

import {
    getWhyWavemContent,
    getWhyWavemContentRemote
} from '@/service/content';
import { trackPageView } from '@/service/analytics/tracking.service';
import WhyWavemHeroSection from '@/section/whyWavem/WhyWavemHeroSection';
import WhyWavemCmsSection from '@/section/whyWavem/WhyWavemCmsSection';
import WhyWavemMetricsSection from '@/section/whyWavem/WhyWavemMetricsSection';
import WhyWavemCaseStudySection from '@/section/whyWavem/WhyWavemCaseStudySection';
import WhyWavemCtaSection from '@/section/whyWavem/WhyWavemCtaSection';

export default function WhyWavem() {
    const [content, setContent] = useState(() => getWhyWavemContent());

    useEffect(() => {
        trackPageView('why_wavem');
    }, []);

    useEffect(() => {
        let isMounted = true;

        async function loadRemote() {
            try {
                const remote = await getWhyWavemContentRemote();
                if (isMounted && remote) {
                    setContent(remote);
                }
            } catch {
                return;
            }
        }

        loadRemote();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <Box component="main" sx={{ minHeight: '100vh', position: 'relative' }}>
            <WhyWavemHeroSection content={content} />
            <WhyWavemCmsSection content={content} />
            <WhyWavemMetricsSection content={content} />
            <WhyWavemCaseStudySection content={content} />
            <WhyWavemCtaSection content={content} />
        </Box>
    );
}
