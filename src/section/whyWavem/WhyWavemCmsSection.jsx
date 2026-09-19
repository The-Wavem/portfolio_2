import { Box, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { TbCheck, TbX, TbSparkles, TbAlertTriangle } from 'react-icons/tb';

import SectionTitle from '@/components/ui/SectionTitle';
import styles from './WhyWavemCmsSection.module.css';

export default function WhyWavemCmsSection({ content }) {
    const cms = content?.customCms;
    const wavem = cms?.wavemFeatures;
    const traditional = cms?.traditionalFeatures;

    return (
        <Box component="section" id="cms-wavem" className={styles.section}>
            <div className={styles.bgAura} aria-hidden />

            <Container maxWidth="lg">
                <SectionTitle
                    eyebrow={cms?.badge || 'AUTONOMIA REAL'}
                    title={cms?.title || 'O CMS Wavem: seu site livre de mensalidades ocultas.'}
                    subtitle={
                        cms?.description ||
                        'Chega de pagar de R$ 100 a R$ 200 por hora técnica para agências trocarem uma foto ou um texto no seu site. Construímos um painel administrativo exclusivo, veloz e sob medida para a sua rotina.'
                    }
                    align="center"
                    maxWidth={860}
                />

                <div className={styles.comparisonGrid}>
                    {/* Wavem CMS Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55, ease: 'easeOut' }}
                    >
                        <div className={styles.wavemCard}>
                            <div className={styles.cardHeader}>
                                <h3 className={styles.cardTitle}>{wavem?.label || 'Wavem CMS Sob Medida'}</h3>
                                <div className={styles.wavemBadge}>
                                    <TbSparkles size={14} color="#A78BFA" />
                                    <span>Vantagem Wavem</span>
                                </div>
                            </div>

                            <ul className={styles.featuresList}>
                                {(wavem?.items || []).map((item, idx) => (
                                    <li key={idx} className={styles.featureItem}>
                                        <div className={styles.checkIconWrapper}>
                                            <TbCheck size={16} />
                                        </div>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* Traditional Agencies / WP Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55, ease: 'easeOut' }}
                    >
                        <div className={styles.traditionalCard}>
                            <div className={styles.cardHeader}>
                                <h3 className={styles.cardTitle}>{traditional?.label || 'Agências Tradicionais / WordPress'}</h3>
                                <div className={styles.traditionalBadge}>
                                    <TbAlertTriangle size={14} color="#F87171" />
                                    <span>A Cilada Comum</span>
                                </div>
                            </div>

                            <ul className={styles.featuresList}>
                                {(traditional?.items || []).map((item, idx) => (
                                    <li key={idx} className={styles.traditionalFeatureItem}>
                                        <div className={styles.crossIconWrapper}>
                                            <TbX size={15} />
                                        </div>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </Box>
    );
}
