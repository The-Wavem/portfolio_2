import { Box, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { TbCheck, TbX, TbSparkles, TbAlertTriangle } from 'react-icons/tb';

import SectionTitle from '@/components/ui/SectionTitle';
import styles from './WhyWavemCmsSection.module.css';

export default function WhyWavemCmsSection({ content }) {
    const cms = content?.cmsSection || content?.customCms;
    const wavem = cms?.comparison?.wavem || cms?.wavemFeatures;
    const traditional = cms?.comparison?.traditional || cms?.traditionalFeatures;

    return (
        <Box component="section" id="cms-wavem" className={styles.section}>
            <div className={styles.bgAura} aria-hidden />

            <Container maxWidth="lg">
                <SectionTitle
                    eyebrow={cms?.tag || cms?.badge || 'Autonomia & Segurança'}
                    title={cms?.title || 'Esqueça a dependência de agências e plugins lentos'}
                    subtitle={
                        cms?.subtitle ||
                        cms?.description ||
                        'Liberdade total para gerenciar o seu conteúdo com a segurança e a velocidade que o seu negócio exige através do CMS Próprio da Wavem.'
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
