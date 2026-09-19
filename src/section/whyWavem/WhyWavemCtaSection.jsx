import { Box, Container, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { TbBrandWhatsapp, TbMail, TbArrowRight } from 'react-icons/tb';

import GlowButton from '@/components/ui/GlowButton';
import { trackAction } from '@/service/analytics/tracking.service';
import styles from './WhyWavemCtaSection.module.css';

export default function WhyWavemCtaSection({ content }) {
    const cta = content?.cta;

    return (
        <Box component="section" id="agendar-diagnostico" className={styles.section}>
            <div className={styles.bgGlow} aria-hidden />

            <Container maxWidth="lg">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, ease: 'easeOut' }}
                >
                    <div className={styles.ctaCard}>
                        <h2 className={styles.title}>
                            {cta?.title || 'Pronto para ter um site que realmente trabalha pelo seu crescimento?'}
                        </h2>

                        <p className={styles.subtitle}>
                            {cta?.subtitle ||
                                'Vamos bater um papo franco, entender seu negócio e desenhar uma presença digital sob medida com autonomia total.'}
                        </p>

                        <div className={styles.actions}>
                            <GlowButton
                                href={
                                    cta?.link ||
                                    'https://wa.me/5541995424186?text=Ol%C3%A1%2C%20The%20Wavem!%20Quero%20agendar%20um%20diagn%C3%B3stico%20gratuito%20para%20o%20meu%20projeto.'
                                }
                                variant="primary"
                                size="large"
                                startIcon={<TbBrandWhatsapp size={20} />}
                                endIcon={<TbArrowRight size={18} />}
                                onClick={() =>
                                    trackAction({
                                        page: 'why_wavem',
                                        section: 'cta_final',
                                        action: 'click_whatsapp_diagnosis',
                                        label: cta?.buttonText || 'Agendar diagnóstico gratuito'
                                    })
                                }
                            >
                                {cta?.buttonText || 'Agendar diagnóstico gratuito'}
                            </GlowButton>

                            <Button
                                component="a"
                                href="mailto:contato.thewavem@gmail.com?subject=Diagn%C3%B3stico%20de%20Projeto%20-%20The%20Wavem"
                                variant="outlined"
                                size="large"
                                startIcon={<TbMail size={18} />}
                                onClick={() =>
                                    trackAction({
                                        page: 'why_wavem',
                                        section: 'cta_final',
                                        action: 'click_email_contact',
                                        label: 'Enviar e-mail'
                                    })
                                }
                                sx={{
                                    borderRadius: '999px',
                                    px: { xs: 3, md: 3.5 },
                                    py: { xs: 1.4, md: 1.6 },
                                    color: '#FFFFFF',
                                    borderColor: 'rgba(255, 255, 255, 0.22)',
                                    fontWeight: 700,
                                    textTransform: 'none',
                                    '&:hover': {
                                        borderColor: 'primary.main',
                                        background: 'rgba(124, 58, 237, 0.08)'
                                    }
                                }}
                            >
                                Enviar por e-mail
                            </Button>
                        </div>

                        <div className={styles.guaranteeText}>
                            Atendimento direto com os desenvolvedores · Resposta inicial em até 1 dia útil · Sem compromisso
                        </div>
                    </div>
                </motion.div>
            </Container>
        </Box>
    );
}
