import { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import { motion } from "framer-motion";
import {
  TbShieldCheck,
  TbBolt,
  TbCode,
  TbArrowRight,
  TbAdjustmentsHorizontal,
} from "react-icons/tb";

import SectionTitle from "@/components/ui/SectionTitle";
import GlowButton from "@/components/ui/GlowButton";
import {
  getHomeWhyWavemContent,
  getHomeWhyWavemContentRemote,
} from "@/service/content";
import { trackAction } from "@/service/analytics/tracking.service";
import styles from "./WhyWavem.module.css";

const pillarIconMap = {
  shield: TbShieldCheck,
  bolt: TbBolt,
  code: TbCode,
};

export default function WhyWavem({ content }) {
  const [data, setData] = useState(() => content || getHomeWhyWavemContent());

  useEffect(() => {
    let isMounted = true;

    if (content) {
      setData(content);
      return;
    }

    async function loadRemoteContent() {
      try {
        const remote = await getHomeWhyWavemContentRemote();
        if (isMounted && remote) {
          setData(remote);
        }
      } catch {
        return;
      }
    }

    loadRemoteContent();

    return () => {
      isMounted = false;
    };
  }, [content]);

  const pillars = data?.pillars || [];
  const cta = data?.cta;

  return (
    <Box
      component="section"
      className={styles.section}
      sx={{ py: { xs: 10, md: 15 } }}
    >
      <div className={styles.bgGlow} aria-hidden />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <SectionTitle
          eyebrow={data?.eyebrow || "DIFERENCIAIS"}
          titlePrefix={data?.titlePrefix || "Por que a"}
          titleHighlight={data?.titleHighlight || "Wavem?"}
          subtitle={
            data?.subtitle ||
            "A combinação de tecnologia moderna, performance implacável e autonomia real para o seu negócio."
          }
          align="center"
        />

        {data?.cmsIntro && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
          >
            <div className={styles.cmsBanner}>
              <div className={styles.cmsBadge}>
                <TbAdjustmentsHorizontal size={15} color="#A78BFA" />
                <span>{data.cmsIntro.badge}</span>
              </div>
              <h3 className={styles.cmsTitle}>{data.cmsIntro.title}</h3>
              <p className={styles.cmsDescription}>
                {data.cmsIntro.description}
              </p>
            </div>
          </motion.div>
        )}

        <div className={styles.grid}>
          {pillars.map((pillar, index) => {
            const IconComponent =
              pillarIconMap[pillar.iconKey] || TbShieldCheck;
            const accentColor = pillar.accentColor || "#A78BFA";

            return (
              <motion.div
                key={pillar.id || index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.12,
                  ease: "easeOut",
                }}
                style={{ display: "flex" }}
              >
                <div className={styles.pillarCard}>
                  <div>
                    <div className={styles.cardTop}>
                      <span className={styles.tag}>{pillar.tag}</span>
                      <div className={styles.iconWrapper}>
                        <IconComponent size={22} color={accentColor} />
                      </div>
                    </div>

                    <div className={styles.statContainer}>
                      <div
                        className={styles.statHighlight}
                        style={{ color: accentColor }}
                      >
                        {pillar.stat}
                      </div>
                      {pillar.statLabel && (
                        <div className={styles.statLabel}>
                          {pillar.statLabel}
                        </div>
                      )}
                    </div>

                    <h3 className={styles.title}>{pillar.title}</h3>
                  </div>

                  <p className={styles.description}>{pillar.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {cta && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
          >
            <div className={styles.ctaContainer}>
              <p className={styles.ctaText}>{cta.title || cta.text}</p>
              <GlowButton
                to={cta.buttonLink || "/porque-wavem"}
                variant="primary"
                size="large"
                endIcon={<TbArrowRight size={18} />}
                onClick={() =>
                  trackAction({
                    page: "home",
                    section: "why_wavem",
                    action: "click_why_wavem_cta",
                    label: cta.buttonText || "Conheça o Efeito Wavem",
                  })
                }
              >
                {cta.buttonText || "Conheça o Efeito Wavem"}
              </GlowButton>
            </div>
          </motion.div>
        )}
      </Container>
    </Box>
  );
}
