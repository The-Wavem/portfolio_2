import { Box, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { TbTarget, TbLayout2, TbUsers } from 'react-icons/tb';

import SectionTitle from '@/components/ui/SectionTitle';
import styles from './WhyWavemConsultingSection.module.css';

const iconMap = {
    target: TbTarget,
    layout: TbLayout2,
    users: TbUsers
};

export default function WhyWavemConsultingSection({ content }) {
    const consulting = content?.consultiveApproach;
    const pillars = consulting?.pillars || [];

    return (
        <Box component="section" id="abordagem-consultiva" className={styles.section}>
            <Container maxWidth="lg">
                <SectionTitle
                    eyebrow={consulting?.badge || 'MÉTODO CONSULTIVO'}
                    title={consulting?.title || 'Antes do código, uma conversa de verdade.'}
                    subtitle={
                        consulting?.description ||
                        'Não acreditamos em soluções de prateleira ou pacotes engessados. Mapeamos as necessidades reais do seu modelo de negócio para construir uma ferramenta feita sob medida para a sua operação.'
                    }
                    align="center"
                    maxWidth={840}
                />

                <div className={styles.grid} style={{ marginTop: '48px' }}>
                    {pillars.map((pillar, index) => {
                        const IconComponent = iconMap[pillar.iconKey] || TbTarget;

                        return (
                            <motion.div
                                key={pillar.id || index}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.12, ease: 'easeOut' }}
                                style={{ display: 'flex' }}
                            >
                                <div className={styles.pillarCard}>
                                    <div className={styles.iconWrapper}>
                                        <IconComponent size={24} />
                                    </div>
                                    <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                                    <p className={styles.pillarDesc}>{pillar.description}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </Container>
        </Box>
    );
}
