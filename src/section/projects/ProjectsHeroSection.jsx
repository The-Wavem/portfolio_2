import { useEffect, useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { getProjectsHeroContent, getProjectsHeroContentRemote } from '@/service/content';

export default function ProjectsHeroSection() {
    const [content, setContent] = useState(() => getProjectsHeroContent());
    const accent = content.accent ?? '#4ADE80';

    useEffect(() => {
        let isMounted = true;

        async function loadRemoteContent() {
            try {
                const remoteContent = await getProjectsHeroContentRemote();
                if (isMounted && remoteContent) {
                    setContent(remoteContent);
                }
            } catch {
                return;
            }
        }

        loadRemoteContent();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <Box component="section" sx={{ pt: { xs: 12, md: 16 }, position: 'relative', overflow: 'hidden' }}>
            <Box
                aria-hidden
                sx={{
                    position: 'absolute',
                    top: { xs: 20, md: 0 },
                    right: { xs: -120, md: -180 },
                    width: { xs: 260, md: 380 },
                    height: { xs: 260, md: 380 },
                    borderRadius: '50%',
                    background: `${accent}33`,
                    filter: 'blur(86px)',
                    pointerEvents: 'none'
                }}
            />

            <Container maxWidth="lg">
                <motion.div
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                    <Box sx={{ maxWidth: 920, position: 'relative', zIndex: 2 }}>
                        <Typography
                            variant="overline"
                            color="primary"
                            sx={{ letterSpacing: 4, fontWeight: 700, fontSize: '0.72rem', opacity: 0.95, color: accent }}
                        >
                            {content.eyebrow}
                        </Typography>

                        <Typography
                            variant="h2"
                            sx={{
                                mt: 1.2,
                                fontWeight: 800,
                                lineHeight: 1.04,
                                letterSpacing: '-0.03em',
                                fontSize: { xs: '2rem', sm: '2.6rem', md: '3.4rem' }
                            }}
                        >
                            {content.titleStart} <span style={{ color: accent }}>{content.titleHighlight}</span>.
                        </Typography>

                        <Typography
                            sx={{
                                mt: 2.2,
                                maxWidth: 760,
                                color: 'rgba(228,228,231,0.76)',
                                lineHeight: 1.78,
                                fontSize: { xs: '0.96rem', md: '1.02rem' }
                            }}
                        >
                            {content.description}
                        </Typography>

                        <Box
                            aria-hidden
                            sx={{
                                mt: 2.2,
                                width: { xs: 120, md: 160 },
                                height: '2px',
                                borderRadius: '999px',
                                background: `linear-gradient(90deg, ${accent}, ${accent}E6)`
                            }}
                        />
                    </Box>
                </motion.div>
            </Container>
        </Box>
    );
}
