import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Container,
    Typography,
    useTheme
} from '@mui/material';
import { TbChevronDown } from 'react-icons/tb';
import { getFaqItems } from '@/service/content';

export default function FAQ() {
    const theme = useTheme();
    const faqItems = getFaqItems();

    return (
        <Box component="section" sx={{ py: { xs: 10, md: 14 } }}>
            <Container maxWidth="lg">
                <Box sx={{ maxWidth: 860, mb: { xs: 5, md: 6 } }}>
                    <Typography variant="overline" color="primary" sx={{ letterSpacing: 4, fontWeight: 700, fontSize: '0.72rem', opacity: 0.95 }}>
                        FAQ
                    </Typography>
                    <Typography
                        variant="h3"
                        fontWeight={800}
                        sx={{
                            mt: 1.4,
                            mb: 2,
                            maxWidth: 860,
                            fontSize: { xs: '2rem', sm: '2.35rem', md: '3rem' },
                            lineHeight: 1.06,
                            letterSpacing: '-0.03em'
                        }}
                    >
                        Dúvidas que todo cliente tem antes de <span style={{ color: theme.palette.primary.main }}>tirar o projeto do papel.</span>
                    </Typography>
                    <Typography sx={{ maxWidth: 700, color: 'rgba(228,228,231,0.72)', lineHeight: 1.75, fontSize: { xs: '0.95rem', md: '1rem' }, letterSpacing: '0.01em' }}>
                        Transparência total sobre investimento, escopo, prazo e manutenção para você decidir com segurança.
                    </Typography>
                </Box>

                <Box sx={{ display: 'grid', gap: 1.3 }}>
                    {faqItems.map((item) => (
                        <Accordion
                            key={item.id}
                            disableGutters
                            sx={{
                                background: 'rgba(10,10,10,0.62)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                borderRadius: '14px',
                                boxShadow: 'none',
                                '&:before': { display: 'none' },
                                '&.Mui-expanded': {
                                    borderColor: 'rgba(124,58,237,0.45)'
                                }
                            }}
                        >
                            <AccordionSummary
                                expandIcon={<TbChevronDown size={18} color="#fff" />}
                                sx={{ px: { xs: 2, md: 2.4 }, minHeight: 68, '& .MuiAccordionSummary-content': { my: 1.6 } }}
                            >
                                <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: { xs: '0.96rem', md: '1.02rem' }, letterSpacing: '-0.01em' }}>
                                    {item.question}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ px: { xs: 2, md: 2.4 }, pt: 0, pb: 2.2 }}>
                                <Typography sx={{ color: 'rgba(228,228,231,0.75)', lineHeight: 1.75, fontSize: { xs: '0.9rem', md: '0.95rem' } }}>
                                    {item.answer}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Box>
            </Container>
        </Box>
    );
}
