import { useEffect, useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { getAboutStoryContent, getAboutStoryContentRemote } from '@/service/content';

export default function AboutStorySection() {
    const aboutAccent = '#38BDF8';
    const [content, setContent] = useState(() => getAboutStoryContent());

    useEffect(() => {
        let isMounted = true;

        async function loadRemoteContent() {
            try {
                const remoteContent = await getAboutStoryContentRemote();
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
        <Box component="section" sx={{ pb: { xs: 4, md: 6 }, position: 'relative' }}>
            <Container maxWidth="lg">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.22 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                <Box
                    sx={{
                        p: { xs: 2.4, md: 3 },
                        borderRadius: '18px',
                        border: '1px solid rgba(255,255,255,0.08)',
                        background: 'rgba(10,10,10,0.58)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    <Box
                        aria-hidden
                        sx={{
                            position: 'absolute',
                            inset: 0,
                            backgroundImage: `radial-gradient(circle at 14% 20%, ${aboutAccent}24 0%, transparent 32%), radial-gradient(circle at 82% 78%, rgba(255,255,255,0.1) 0%, transparent 22%)`,
                            pointerEvents: 'none'
                        }}
                    />

                    <Typography variant="overline" sx={{ color: aboutAccent, letterSpacing: 4, fontWeight: 700, fontSize: '0.7rem', opacity: 0.95 }}>
                        {content.eyebrow}
                    </Typography>

                    <Typography
                        sx={{
                            mt: 1.2,
                            color: '#fff',
                            fontWeight: 800,
                            lineHeight: 1.08,
                            letterSpacing: '-0.02em',
                            fontSize: { xs: '1.4rem', md: '2rem' },
                            maxWidth: 920
                        }}
                    >
                        <span style={{ color: aboutAccent }}>{content.title}</span>
                    </Typography>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={{
                            visible: { transition: { staggerChildren: 0.1 } },
                            hidden: {}
                        }}
                    >
                        <Box sx={{ mt: 1.5, display: 'grid', gap: 1.1, maxWidth: 980 }}>
                            {content.paragraphs.map((paragraph) => (
                                <motion.div
                                    key={paragraph}
                                    variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                                    transition={{ duration: 0.38, ease: 'easeOut' }}
                                >
                                    <Typography sx={{ color: 'rgba(228,228,231,0.76)', lineHeight: 1.8, fontSize: { xs: '0.92rem', md: '0.98rem' } }}>
                                        {paragraph}
                                    </Typography>
                                </motion.div>
                            ))}
                        </Box>
                    </motion.div>

                </Box>
                </motion.div>
            </Container>
        </Box>
    );
}
