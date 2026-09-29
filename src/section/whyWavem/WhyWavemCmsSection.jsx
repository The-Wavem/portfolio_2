import { Box, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { TbAlertTriangle, TbCheck } from 'react-icons/tb';

import SectionTitle from '@/components/ui/SectionTitle';
import styles from './WhyWavemCmsSection.module.css';

const traditionalBottlenecks = [
    {
        title: 'Plataformas de terceiros inchadas e instáveis',
        desc: 'Sistemas genéricos dependentes de dezenas de plugins que quebram após atualizações e expõem os dados da sua empresa a vulnerabilidades.',
    },
    {
        title: 'Suporte lento que trava operações críticas',
        desc: 'Chamados técnicos que demoram dias ou semanas para responder solicitações simples enquanto sua equipe perde vendas.',
    },
    {
        title: 'Mensalidades ocultas e dependência de horas técnicas',
        desc: 'Cobranças recorrentes e horas pagas a agências apenas para alterar um texto, atualizar um banner ou cadastrar novos produtos.',
    },
    {
        title: 'Plataformas de aluguel e perda de patrimônio',
        desc: 'Se você parar de pagar as mensalidades da ferramenta de terceiros, sua empresa perde o site, os dados e todo o histórico construído.',
    },
];

const wavemAdvantages = [
    {
        title: 'Painel exclusivo, blindado e sem plugins',
        desc: 'Interface proprietária desenvolvida sob medida para a rotina da sua equipe. Código nativo com resposta instantânea e máxima segurança.',
    },
    {
        title: 'Regra dos 2 cliques para qualquer rotina',
        desc: 'Zero burocracia ou manuais complicados: você entra, altera o que precisa em 2 cliques e volta a cuidar do seu faturamento.',
    },
    {
        title: 'Autonomia total para gerenciar conteúdo',
        desc: 'Sua equipe atualiza textos, imagens e cadastros pelo CMS próprio com a regra dos 2 cliques, sem dependência de chamados pagos.',
    },
    {
        title: 'Patrimônio digital definitivo do seu negócio',
        desc: 'O código e a base são 100% da sua empresa, integrados aos seus canais de vendas e escaláveis conforme a sua demanda cresce.',
    },
];

export default function WhyWavemCmsSection({ content }) {
    const cms = content?.cmsSection || content?.customCms;

    return (
        <Box component="section" id="cms-wavem" className={styles.section}>
            <Container maxWidth="lg">
                <div className={styles.headerWrapper}>
                    <SectionTitle
                        eyebrow={cms?.tag || 'IMPACTO OPERACIONAL & FINANCEIRO'}
                        title={cms?.title || 'O Fim dos Sistemas Travados e dos Pedágios Técnicos'}
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
