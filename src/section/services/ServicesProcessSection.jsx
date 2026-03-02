import { memo, useState } from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Container,
    Stack,
    Typography
} from '@mui/material';
import { motion } from 'framer-motion';
import { TbChevronDown } from 'react-icons/tb';

const ProcessAccordion = memo(function ProcessAccordion({ steps, accent, expanded, onChange }) {
    return (
        <Stack spacing={1.1}>
            {steps.map((step, index) => (
                <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.36, delay: index * 0.05, ease: 'easeOut' }}
                >
                    <Accordion
                        disableGutters
                        expanded={expanded === step.id}
                        onChange={(_, isExpanded) => onChange(isExpanded ? step.id : null)}
                        TransitionProps={{ unmountOnExit: true }}
                        sx={{
                            borderRadius: '14px',
                            border: '1px solid rgba(255,255,255,0.12)',
                            background: 'rgba(8,8,8,0.48)',
                            overflow: 'hidden',
                            '&:before': { display: 'none' }
                        }}
                    >
                        <AccordionSummary
                            expandIcon={<TbChevronDown color="#ffffff" size={18} />}
                            sx={{
                                px: 2,
                                py: 0.8,
                                '& .MuiAccordionSummary-content': {
                                    margin: '8px 0',
                                    alignItems: 'center',
                                    gap: 1.2
                                }
                            }}
                        >
                            <Typography sx={{ color: accent, fontWeight: 800, fontSize: '0.76rem', letterSpacing: '0.08em' }}>
                                ETAPA {step.stage}
                            </Typography>
                            <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '1rem' }}>
                                {step.title}
                            </Typography>
                            <Typography sx={{ color: 'rgba(228,228,231,0.72)', fontWeight: 600, fontSize: '0.82rem' }}>
                                {step.subtitle}
                            </Typography>
                        </AccordionSummary>

                        <AccordionDetails sx={{ px: 0, pt: 0, pb: 0 }}>
                            <Box sx={{ position: 'relative', minHeight: { xs: 260, md: 610 }, overflow: 'hidden' }}>
                                <Box sx={{ position: 'absolute', inset: 0 }}>
                                    <video
                                        src={expanded === step.id ? step.videoUrl : undefined}
                                        autoPlay={expanded === step.id}
                                        muted
                                        loop
                                        playsInline
                                        controls
                                        preload={expanded === step.id ? 'metadata' : 'none'}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'saturate(0.9) contrast(1.02)' }}
                                    />
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            inset: 0,
                                            pointerEvents: 'none',
                                            background: 'linear-gradient(100deg, rgba(6,6,6,0.9) 0%, rgba(6,6,6,0.62) 45%, rgba(6,6,6,0.78) 100%)'
                                        }}
                                    />
                                </Box>

                                <Box sx={{ position: 'relative', zIndex: 2, p: { xs: 1.5, md: 2.1 }, maxWidth: { xs: '100%', md: '58%' } }}>
                                    <Typography sx={{ color: 'rgba(245,245,247,0.88)', lineHeight: 1.66, fontSize: { xs: '0.92rem', md: '0.98rem' } }}>
                                        {step.description}
                                    </Typography>
                                    <Typography sx={{ mt: 1, color: '#fff', fontWeight: 700, fontSize: '0.86rem', lineHeight: 1.5 }}>
                                        {step.outcome}
                                    </Typography>
                                </Box>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                </motion.div>
            ))}
        </Stack>
    );
});

export default function ServicesProcessSection({ content, accent }) {
    const [expandedStep, setExpandedStep] = useState(content.processTimeline?.[0]?.id ?? null);

    return (
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
            <Box id="processo-parceria" sx={{ mt: { xs: 3.3, md: 4.4 } }}>
                <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: { xs: '1.2rem', md: '1.45rem' } }}>
                    Processo com parceria
                </Typography>

                <Box sx={{ mt: 1.5 }}>
                    <ProcessAccordion
                        steps={content.processTimeline ?? []}
                        accent={accent}
                        expanded={expandedStep}
                        onChange={setExpandedStep}
                    />
                </Box>
            </Box>
        </Container>
    );
}
