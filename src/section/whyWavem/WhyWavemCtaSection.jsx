import { Box, Container, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { TbBrandWhatsapp, TbArrowRight } from 'react-icons/tb';

import GlowButton from '@/components/ui/GlowButton';
import { trackAction } from '@/service/analytics/tracking.service';
import styles from './WhyWavemCtaSection.module.css';

export default function WhyWavemCtaSection({ content }) {
    const cta = content?.cta;

    return (
        <Box component="section" id="agendar-diagnostico" className={styles.section}>
            <div className={styles.bgGlow} aria-hidden />

            <Container maxWidth="lg">
                <div className={styles.topDivider} />

                <motion.div
                    className={styles.ctaWrapper}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, ease: 'easeOut' }}
                >
                    <span className={styles.overtitle}>PRÓXIMO PASSO</span>

                    <h2 className={styles.title}>
                        {cta?.title || 'Pronto para ter um sistema que trabalha com a sua empresa, e não contra ela?'}
                    </h2>

                    <p className={styles.subtitle}>
                        {cta?.description ||
                            cta?.subtitle ||
                            'Vamos conversar diretamente sobre os gargalos do seu dia a dia e desenhar a ferramenta sob medida para a sua operação.'}
                    </p>

                    <div className={styles.actions}>
                        <GlowButton
                            to={cta?.link || '/contato'}
                            variant="primary"
                            size="large"
                            endIcon={<TbArrowRight size={18} strokeWidth={1.5} />}
                            sx={{
                                background: 'linear-gradient(135deg, #E11D48 0%, #BE123C 50%, #FB7185 100%)',
                                boxShadow: '0 0 24px rgba(225, 29, 72, 0.45)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #F43F5E 0%, #E11D48 50%, #FB7185 100%)',
                                    boxShadow: '0 0 32px rgba(225, 29, 72, 0.65)',
                                }
                            }}
                            onClick={() =>
                                trackAction({
                                    page: 'why_wavem',
                                    section: 'cta_final',
                                    action: 'click_final_cta',
                                    label: cta?.buttonText || 'Falar com os Desenvolvedores'
                                })
                            }
                        >
                            {cta?.buttonText || 'Falar com os Desenvolvedores'}
                        </GlowButton>

                        <Button
                            component="a"
                            href="https://wa.me/5541995424186?text=Ol%C3%A1%2C%20The%20Wavem!%20Quero%20conversar%20sobre%20um%20sistema%20para%20o%20meu%20neg%C3%B3cio."
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="outlined"
                            size="large"
                            startIcon={<TbBrandWhatsapp size={18} strokeWidth={1.5} />}
                            onClick={() =>
                                trackAction({
                                    page: 'why_wavem',
                                    section: 'cta_final',
                                    action: 'click_whatsapp_direct',
                                    label: 'Falar no WhatsApp'
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
                                    borderColor: '#FB7185',
                                    background: 'rgba(225, 29, 72, 0.08)'
                                }
                            }}
                        >
                            Falar no WhatsApp
                        </Button>
                    </div>

                    <div className={styles.guaranteeText}>
                        Atendimento direto com os desenvolvedores · Resposta inicial em até 1 dia útil · Sem compromisso
                    </div>
                </motion.div>
            </Container>
        </Box>
    );
}
