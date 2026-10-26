import { useState } from 'react';
import { Box, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { TbArrowUpRight, TbMaximize } from 'react-icons/tb';

import { trackAction } from '@/service/analytics/tracking.service';
import styles from './WemTemplatesCatalogSection.module.css';

const chartCurvesBySlug = {
    'wem-ecommerce': {
        overview: 'M 6 56 C 48 52, 82 36, 128 32 C 174 28, 212 16, 268 8',
        operations: 'M 6 48 C 52 40, 96 44, 142 24 C 188 12, 224 18, 268 6'
    },
    'wem-erp-gestao': {
        overview: 'M 6 54 C 54 46, 94 38, 144 26 C 190 16, 228 14, 268 10',
        operations: 'M 6 58 C 46 50, 92 30, 138 28 C 184 26, 222 12, 268 7'
    },
    'wem-agendamento': {
        overview: 'M 6 52 C 44 44, 88 28, 136 22 C 182 16, 224 12, 268 6',
        operations: 'M 6 56 C 50 42, 98 34, 146 18 C 194 12, 230 10, 268 5'
    }
};

function TemplateCardItem({ template, index, onStartTestDrive }) {
    const [activeTab, setActiveTab] = useState('overview');

    const kpis = Array.isArray(template.kpis) ? template.kpis : [];
    const tags = Array.isArray(template.tags) ? template.tags : [];
    const curves =
        chartCurvesBySlug[template.id] || chartCurvesBySlug['wem-ecommerce'];
    const currentCurve =
        activeTab === 'overview' ? curves.overview : curves.operations;

    const handleTriggerTest = (source) => {
        trackAction({
            page: 'templates_wem',
            section: 'catalog',
            action: 'open_template_test_drive',
            label: `${template.title} (${source})`
        });
        onStartTestDrive(template);
    };

    return (
        <motion.article
            className={styles.templateCard}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{
                duration: 0.55,
                delay: index * 0.08,
                ease: 'easeOut'
            }}
        >
            {/* Metade Esquerda: Showcase Interativo em Perspectiva Frontal */}
            <div className={styles.showcasePane}>
                <motion.div
                    className={styles.appWindowFrame}
                    whileHover={{ y: -5, scale: 1.01 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                >
                    {/* Barra de Janela da Aplicação */}
                    <div className={styles.windowHeaderBar}>
                        <div className={styles.windowDots} aria-hidden>
                            <span className={styles.dotCrimson} />
                            <span className={styles.dotMuted} />
                            <span className={styles.dotMuted} />
                        </div>

                        <div
                            className={styles.simulatedTabs}
                            role="tablist"
                            aria-label={`Visualizações de ${template.title}`}
                        >
                            <button
                                type="button"
                                role="tab"
                                aria-selected={activeTab === 'overview'}
                                className={`${styles.simTabBtn} ${
                                    activeTab === 'overview'
                                        ? styles.simTabBtnActive
                                        : ''
                                }`}
                                onClick={() => setActiveTab('overview')}
                            >
                                Telemetria
                            </button>
                            <button
                                type="button"
                                role="tab"
                                aria-selected={activeTab === 'operations'}
                                className={`${styles.simTabBtn} ${
                                    activeTab === 'operations'
                                        ? styles.simTabBtnActive
                                        : ''
                                }`}
                                onClick={() => setActiveTab('operations')}
                            >
                                Operação
                            </button>
                        </div>

                        <button
                            type="button"
                            className={styles.quickZoomBtn}
                            onClick={() => handleTriggerTest('quick_preview')}
                            aria-label={`Expandir preview interativo de ${template.title}`}
                        >
                            <TbMaximize size={13} />
                            <span>Ao vivo</span>
                        </button>
                    </div>

                    {/* Corpo Frontal do Sistema (Sidebar + KPIs + Gráfico Vetorial) */}
                    <div className={styles.windowBody}>
                        <div className={styles.mockSidebar} aria-hidden>
                            <div className={styles.sidebarMenu}>
                                <div className={styles.sidebarItemActive}>
                                    {activeTab === 'overview'
                                        ? 'PAINEL'
                                        : 'FLUXO'}
                                </div>
                                <div
                                    className={styles.sidebarItemBar}
                                    style={{ width: '78%' }}
                                />
                                <div
                                    className={styles.sidebarItemBar}
                                    style={{ width: '64%' }}
                                />
                                <div
                                    className={styles.sidebarItemBar}
                                    style={{ width: '84%' }}
                                />
                            </div>

                            <div className={styles.sidebarStatus}>
                                <span className={styles.statusDot} />
                                <span>ONLINE</span>
                            </div>
                        </div>

                        <div className={styles.mockWorkspace}>
                            <div className={styles.kpiMiniGrid}>
                                {kpis.map((kpi, idx) => (
                                    <div key={idx} className={styles.kpiMiniCard}>
                                        <span className={styles.kpiMiniLabel}>
                                            {kpi.label}
                                        </span>
                                        <span className={styles.kpiMiniValue}>
                                            {kpi.value}
                                        </span>
                                        <span className={styles.kpiMiniTrend}>
                                            {kpi.trend}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className={styles.chartCanvasBox}>
                                <div className={styles.chartHeaderRow}>
                                    <span>
                                        {activeTab === 'overview'
                                            ? 'PERFORMANCE EM TEMPO REAL'
                                            : 'AUTOMAÇÃO DE ROTINAS (2 CLIQUES)'}
                                    </span>
                                    <span>99.98% SLA</span>
                                </div>

                                <svg
                                    viewBox="0 0 274 64"
                                    fill="none"
                                    className={styles.chartSvg}
                                    aria-hidden
                                >
                                    <defs>
                                        <linearGradient
                                            id={`grad-${template.id}`}
                                            x1="0%"
                                            y1="0%"
                                            x2="100%"
                                            y2="0%"
                                        >
                                            <stop offset="0%" stopColor="#E11D48" />
                                            <stop offset="100%" stopColor="#FB7185" />
                                        </linearGradient>
                                    </defs>
                                    <line
                                        x1="0"
                                        y1="58"
                                        x2="274"
                                        y2="58"
                                        stroke="rgba(255,255,255,0.07)"
                                        strokeWidth="1"
                                    />
                                    <motion.path
                                        key={activeTab}
                                        d={currentCurve}
                                        stroke={`url(#grad-${template.id})`}
                                        strokeWidth="2.8"
                                        strokeLinecap="round"
                                        initial={{ pathLength: 0, opacity: 0.4 }}
                                        animate={{ pathLength: 1, opacity: 1 }}
                                        transition={{ duration: 0.55, ease: 'easeOut' }}
                                    />
                                    <circle cx="268" cy="8" r="4" fill="#FB7185" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Metade Direita: Dados & Ação em Superfície Neutra de Alto Contraste */}
            <div className={styles.detailsPane}>
                <div className={styles.detailsTop}>
                    <span className={styles.categoryBadge}>
                        {template.badge || 'Arquitetura WEM'}
                    </span>

                    <h2 className={styles.templateTitle}>{template.title}</h2>

                    <p className={styles.templateDescription}>
                        {template.description}
                    </p>

                    {tags.length > 0 && (
                        <div className={styles.tagsRow}>
                            {tags.map((tag, idx) => (
                                <span key={idx} className={styles.techTag}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                <div className={styles.detailsFooter}>
                    <button
                        type="button"
                        className={styles.testDriveBtn}
                        onClick={() => handleTriggerTest('primary_button')}
                    >
                        <span>TESTAR</span>
                        <span className={styles.testDriveIcon} aria-hidden>
                            <TbArrowUpRight size={18} strokeWidth={2} />
                        </span>
                    </button>
                </div>
            </div>
        </motion.article>
    );
}

export default function WemTemplatesCatalogSection({
    templates = [],
    onSelectTemplate
}) {
    return (
        <Box component="section" className={styles.catalogSection}>
            <Container maxWidth="lg">
                <div className={styles.catalogList}>
                    {templates.map((template, index) => (
                        <TemplateCardItem
                            key={template.id || index}
                            template={template}
                            index={index}
                            onStartTestDrive={onSelectTemplate}
                        />
                    ))}
                </div>
            </Container>
        </Box>
    );
}
