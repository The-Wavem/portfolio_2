import { Box, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { TbShieldCheck, TbBolt, TbTrendingDown, TbCoins } from 'react-icons/tb';

import SectionTitle from '@/components/ui/SectionTitle';
import styles from './WhyWavemMetricsSection.module.css';

const metricIconMap = {
    shield: TbShieldCheck,
    trendingDown: TbTrendingDown,
    bolt: TbBolt,
    coins: TbCoins,
};

export default function WhyWavemMetricsSection({ content }) {
    const data = content?.costOfInaction || content?.marketData;
    const metrics = data?.metrics || [];

    return (
        <Box component="section" id="metricas-pesquisas" className={styles.section}>
            <Container maxWidth="lg">
                <SectionTitle
                    eyebrow={data?.tag || data?.badge || 'Realidade de Mercado'}
                    title={data?.title || 'Quanto custa ser invisível na internet?'}
                    subtitle={
                        data?.intro ||
                        data?.subtitle ||
                        'O mercado mudou. O amadorismo digital drena o seu lucro silenciosamente todos os dias. Veja o que os dados revelam sobre o comportamento do consumidor moderno:'
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
                                key={metric.source || metric.title || index}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.12, ease: 'easeOut' }}
                                style={{ display: 'flex' }}
                            >
                                <div className={styles.metricCard}>
                                    <div>
                                        <div className={styles.cardTop}>
                                            <span className={styles.tag}>
                                                {metric.source || metric.tag}
                                            </span>
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

                                        {metric.title && (
                                            <h3 className={styles.title}>{metric.title}</h3>
                                        )}
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
