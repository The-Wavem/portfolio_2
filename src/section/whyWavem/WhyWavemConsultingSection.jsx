import { Box, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { TbTarget, TbTrendingUp, TbUsers } from 'react-icons/tb';

import SectionTitle from '@/components/ui/SectionTitle';
import styles from './WhyWavemConsultingSection.module.css';

const defaultIcons = [TbTarget, TbTrendingUp, TbUsers];

export default function WhyWavemConsultingSection({ content }) {
    const consulting = content?.consultiveApproach;
    const features = consulting?.features || consulting?.pillars || [];

    return (
        <Box component="section" id="abordagem-consultiva" className={styles.section}>
            <Container maxWidth="lg">
                <SectionTitle
                    eyebrow={consulting?.tag || consulting?.badge || 'Abordagem Consultiva'}
                    title={consulting?.title || 'Desenvolvimento 100% customizado, focado na sua dor real'}
                    subtitle={
                        consulting?.description ||
                        'Antes de escrever uma única linha de código, nós conversamos de verdade com você. Entendemos o seu modelo de negócio, o perfil dos seus clientes e as suas metas para desenhar a arquitetura perfeita — sem soluções genéricas de prateleira.'
                    }
                    align="center"
                    maxWidth={860}
                />

                <div className={styles.grid} style={{ marginTop: '48px' }}>
                    {features.map((feature, index) => {
                        const IconComponent = defaultIcons[index % defaultIcons.length];

                        return (
                            <motion.div
                                key={feature.title || index}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.12, ease: 'easeOut' }}
                                style={{ display: 'flex' }}
                            >
                                {/* <div className={styles.pillarCard}>
                                    <div className={styles.iconWrapper}>
                                        <IconComponent size={24} />
                                    </div>
                                    <h3 className={styles.pillarTitle}>{feature.title}</h3>
                                    <p className={styles.pillarDesc}>{feature.description}</p>
                                </div> */}
                            </motion.div>
                        );
                    })}
                </div>
            </Container>
        </Box>
    );
}
