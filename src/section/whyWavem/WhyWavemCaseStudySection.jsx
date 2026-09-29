import React from 'react';
import { motion } from 'framer-motion';
import { TbArrowRight } from 'react-icons/tb';

import GlowButton from '@/components/ui/GlowButton';
import { trackAction } from '@/service/analytics/tracking.service';
import { defaultWhyWavemContent } from '@/service/content/whyWavem.service';
import styles from './WhyWavemCaseStudySection.module.css';

export default function WhyWavemCaseStudySection({ content }) {
    const caseStudy = content?.caseStudy || defaultWhyWavemContent.caseStudy;
    const videoId = caseStudy?.youtubeVideoId || 'dQw4w9WgXcQ';

    return (
        <section id="caso-real-sistema" className={styles.sectionContainer}>
            <div className={styles.contentWrapper}>
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className={styles.overtitle}>{caseStudy.overtitle}</span>
                    <h2 className={styles.title}>{caseStudy.title}</h2>
                    <p className={styles.subtitle}>{caseStudy.subtitle}</p>
                </motion.div>

                <motion.div
                    className={styles.videoWrapper}
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <iframe
                        className={styles.videoFrame}
                        src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`}
                        title="Demonstração do Sistema Wavem - Imobiliária Valdinei"
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    />
                </motion.div>

                <motion.div
                    className={styles.metricsGrid}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.55, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                >
                    {caseStudy.metrics.map((metric, index) => (
                        <div key={index} className={styles.metricItem}>
                            <span className={styles.metricValue}>{metric.value}</span>
                            <span className={styles.metricLabel}>{metric.label}</span>
                        </div>
                    ))}
                </motion.div>

                {caseStudy.contractCommitment && (
                    <motion.p
                        className={styles.commitmentText}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.5, delay: 0.22 }}
                    >
                        {caseStudy.contractCommitment}
                    </motion.p>
                )}

                <motion.div
                    className={styles.ctaWrapper}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.55, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
                >
                    <GlowButton
                        to={caseStudy.ctaLink || '/contato'}
                        variant="primary"
                        size="large"
                        endIcon={<TbArrowRight size={18} strokeWidth={1.5} />}
                        sx={{
                            background: 'linear-gradient(135deg, #E11D48 0%, #BE123C 50%, #FB7185 100%)',
                            boxShadow: '0 0 24px rgba(225, 29, 72, 0.45)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #F43F5E 0%, #E11D48 50%, #FB7185 100%)',
                                boxShadow: '0 0 32px rgba(225, 29, 72, 0.65)',
                            },
                        }}
                        onClick={() =>
                            trackAction({
                                page: 'why_wavem',
                                section: 'case_study_video',
                                action: 'click_case_cta',
                                label: caseStudy.ctaText || 'Quero automatizar minha operação',
                            })
                        }
                    >
                        {caseStudy.ctaText || 'Quero automatizar minha operação'} →
                    </GlowButton>
                </motion.div>
            </div>
        </section>
    );
}
