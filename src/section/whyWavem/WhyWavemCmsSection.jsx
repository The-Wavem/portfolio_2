import { Box, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { TbAlertTriangle, TbCheck } from 'react-icons/tb';

import SectionTitle from '@/components/ui/SectionTitle';
import styles from './WhyWavemCmsSection.module.css';

const traditionalBottlenecks = [
    {
        title: 'Plugins vulneráveis e quebras constantes',
        desc: 'Dezenas de extensões de terceiros sujeitas a brechas críticas de segurança, incompatibilidades estruturais e instabilidades após atualizações automáticas.',
    },
    {
        title: 'Lentidão estrutural e código inchado',
        desc: 'Templates genéricos e acúmulo de scripts pesados que sabotam o tempo de resposta, afundam o ranqueamento no Google (Core Web Vitals) e encarecem o tráfego pago.',
    },
    {
        title: 'Mensalidades ocultas de manutenção técnica',
        desc: 'Custos contínuos de R$ 800 a R$ 2.500/ano e dependência forçada de agências apenas para efetuar alterações pontuais de textos, fotos ou banners.',
    },
    {
        title: 'Plataformas de aluguel e aprisionamento',
        desc: 'Você nunca é o proprietário definitivo do código; se parar de pagar as mensalidades da plataforma, seu site é retirado do ar e seu negócio perde o histórico.',
    },
];

const wavemAdvantages = [
    {
        title: 'Código otimizado sem dependências',
        desc: 'Arquitetura sob medida, ultraveloz e sem plugins de terceiros. Código limpo, estável e com blindagem nativa contra falhas e invasões.',
    },
    {
        title: 'Painel CMS sob medida para seu negócio',
        desc: 'Interface administrativa intuitiva projetada para a rotina da sua equipe. Atualize textos, fotos, depoimentos e chamadas em 1 clique, sem burocracia.',
    },
    {
        title: 'R$ 0 de mensalidades para trocas de conteúdo',
        desc: 'Independência técnica permanente. Elimine de vez custos recorrentes com chamados de agências para gerenciar o conteúdo do seu próprio site.',
    },
    {
        title: 'Patrimônio digital definitivo da sua empresa',
        desc: 'O ecossistema pertence 100% à sua empresa, com engenharia focada obsessivamente em autoridade de marca, SEO técnico e alta conversão de clientes.',
    },
];

export default function WhyWavemCmsSection({ content }) {
    const cms = content?.cmsSection || content?.customCms;

    return (
        <Box component="section" id="cms-wavem" className={styles.section}>
            <Container maxWidth="lg">
                <div className={styles.headerWrapper}>
                    <SectionTitle
                        eyebrow="ARQUITETURA & AUTONOMIA"
                        title={cms?.title || 'Esqueça a dependência de agências e plugins lentos'}
                        subtitle={
                            cms?.subtitle ||
                            cms?.description ||
                            'Liberdade total para gerenciar seu conteúdo com velocidade instantânea e segurança através da engenharia sob medida da Wavem.'
                        }
                        align="center"
                        maxWidth={860}
                    />
                </div>

                {/* Tabela Comparativa Aberta: Duas Colunas (Zero Cards) */}
                <div className={styles.comparisonGrid}>
                    {/* Coluna 1: Mercado Tradicional */}
                    <motion.div
                        className={styles.columnTraditional}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.55, ease: 'easeOut' }}
                    >
                        <div className={styles.colHeader}>
                            <span className={styles.colOvertitleWarn}>MERCADO TRADICIONAL</span>
                            <h3 className={styles.colTitle}>
                                WordPress &amp; Plataformas de Aluguel
                            </h3>
                            <p className={styles.colSubtitle}>
                                Gargalos estruturais provocados por código inchado e custos contínuos de suporte.
                            </p>
                        </div>

                        <div className={styles.dividerSubtle} />

                        <ul className={styles.featureList}>
                            {traditionalBottlenecks.map((item, idx) => (
                                <li key={idx} className={styles.featureItem}>
                                    <div className={styles.warnIconWrapper} aria-hidden>
                                        <TbAlertTriangle size={18} strokeWidth={1.5} />
                                    </div>
                                    <div className={styles.itemContent}>
                                        <h4 className={styles.itemTitleWarn}>{item.title}</h4>
                                        <p className={styles.itemDesc}>{item.desc}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Coluna 2: Arquitetura Wavem */}
                    <motion.div
                        className={styles.columnWavem}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.55, delay: 0.1, ease: 'easeOut' }}
                    >
                        <div className={styles.colHeader}>
                            <span className={styles.colOvertitleWavem}>ARQUITETURA PROPRIETÁRIA WAVEM</span>
                            <h3 className={styles.colTitle}>
                                Ecossistema &amp; CMS Sob Medida
                            </h3>
                            <p className={styles.colSubtitle}>
                                Engenharia de alta performance, velocidade instantânea e autonomia definitiva.
                            </p>
                        </div>

                        <div className={styles.dividerSubtle} />

                        <ul className={styles.featureList}>
                            {wavemAdvantages.map((item, idx) => (
                                <li key={idx} className={styles.featureItem}>
                                    <div className={styles.checkIconWrapper} aria-hidden>
                                        <TbCheck size={18} strokeWidth={1.5} />
                                    </div>
                                    <div className={styles.itemContent}>
                                        <h4 className={styles.itemTitleWavem}>{item.title}</h4>
                                        <p className={styles.itemDesc}>{item.desc}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </Container>
        </Box>
    );
}
