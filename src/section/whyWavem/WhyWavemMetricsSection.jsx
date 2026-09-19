import { Box, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { TbShieldCheck, TbBolt, TbCoins } from 'react-icons/tb';

import SectionTitle from '@/components/ui/SectionTitle';
import styles from './WhyWavemMetricsSection.module.css';

const metricIconMap = {
    shield: TbShieldCheck,
    bolt: TbBolt,
    coins: TbCoins,
};

export default function WhyWavemMetricsSection({ content }) {
    const marketData = content?.marketData;
    const metrics = marketData?.metrics || [];

    return (
        <Box component="section" id="metricas-pesquisas" className={styles.section}>
            <Container maxWidth="lg">
                <SectionTitle
                    eyebrow={marketData?.badge || 'DADOS & CIÊNCIA'}
                    title={marketData?.title || 'Números reais que se convertem em faturamento.'}
                    subtitle={
                        marketData?.subtitle ||
                        'Decisões de engenharia e design fundamentadas nas maiores pesquisas do mercado global.'
                    }
                    align="center"
                    maxWidth={860}
                />

                <div className={styles.grid}>
                    {metrics.map((metric, index) => {
                        const IconComponent = metricIconMap[metric.iconKey] || TbShieldCheck;
                        const accentColor = metric.accentColor || '#A78BFA';

                        return (
                            <motion.div
                                key={metric.id || index}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.12, ease: 'easeOut' }}
                                style={{ display: 'flex' }}
                            >
                                <div className={styles.metricCard}>
                                    <div>
                                        <div className={styles.cardTop}>
                                            <span className={styles.tag}>{metric.tag}</span>
                                            <div className={styles.iconWrapper}>
                                                <IconComponent size={22} color={accentColor} />
                                            </div>
                                        </div>

                                        <div className={styles.statContainer}>
                                            <div
                                                className={styles.statHighlight}
                                                style={{ color: accentColor }}
                                            >
                                                {metric.stat}
                                            </div>
                                            {metric.statLabel && (
                                                <div className={styles.statLabel}>
                                                    {metric.statLabel}
                                                </div>
                                            )}
                                        </div>

                                        <h3 className={styles.title}>{metric.title}</h3>
                                    </div>

                                    <p className={styles.description}>{metric.description}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </Container>
        </Box>
    );
}
