import { Box, Container, Button } from "@mui/material";
import { motion } from "framer-motion";
import { TbArrowRight, TbArrowDown } from "react-icons/tb";

import GlowButton from "@/components/ui/GlowButton";
import { trackAction } from "@/service/analytics/tracking.service";
import styles from "./WhyWavemHeroSection.module.css";

export default function WhyWavemHeroSection({ content }) {
  const hero = content?.hero;

  const scrollToContent = () => {
    const target =
      document.getElementById("metricas-pesquisas") ||
      document.getElementById("cms-wavem");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box component="section" className={styles.heroSection}>
      <div className={styles.bgGlowRose} aria-hidden />
      <div className={styles.bgGlowCrimson} aria-hidden />

      <Container maxWidth="lg">
        <div className={styles.contentWrapper}>
          {/* Overtitle sutil: texto puro com tracking largo na cor da rota */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <span className={styles.overtitle}>
              {hero?.overtitle || hero?.tag || "ENGENHARIA SOB MEDIDA"}
            </span>
          </motion.div>

          {/* Headline Principal */}
          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          >
            {hero?.title ? (
              hero.title.includes("sistema que devolva") ? (
                <>
                  Sua empresa não precisa de mais um site.{" "}
                  <span className={styles.titleGradient}>
                    Precisa de um sistema que devolva o seu tempo.
                  </span>
                </>
              ) : (
                hero.title
              )
            ) : (
              <>
                Sua empresa não precisa de mais um site.{" "}
                <span className={styles.titleGradient}>
                  Precisa de um sistema que devolva o seu tempo.
                </span>
              </>
            )}
          </motion.h1>

          {/* Citação Editorial Aberta */}
          {hero?.question && (
            <motion.div
              className={styles.questionBlock}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16, ease: "easeOut" }}
            >
              <p className={styles.questionText}>"{hero.question}"</p>
            </motion.div>
          )}

          {/* Descrição Editorial */}
          <motion.p
            className={styles.heroSubtitle}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22, ease: "easeOut" }}
          ></motion.p>

          {/* Ações / CTAs */}
          <motion.div
            className={styles.actionsRow}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28, ease: "easeOut" }}
          >
            <GlowButton
              to={hero?.ctaLink || "/contato"}
              variant="primary"
              size="large"
              endIcon={<TbArrowRight size={18} strokeWidth={1.5} />}
              sx={{
                background:
                  "linear-gradient(135deg, #E11D48 0%, #BE123C 50%, #FB7185 100%)",
                boxShadow: "0 0 24px rgba(225, 29, 72, 0.45)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #F43F5E 0%, #E11D48 50%, #FB7185 100%)",
                  boxShadow: "0 0 32px rgba(225, 29, 72, 0.65)",
                },
              }}
              onClick={() =>
                trackAction({
                  page: "why_wavem",
                  section: "hero",
                  action: "click_hero_primary_cta",
                  label: hero?.ctaText || "Construir meu Sistema Wavem",
                })
              }
            >
              {hero?.ctaText || "Construir meu Sistema Wavem"}
            </GlowButton>

            <Button
              variant="outlined"
              size="large"
              onClick={scrollToContent}
              endIcon={<TbArrowDown size={18} strokeWidth={1.5} />}
              sx={{
                borderRadius: "999px",
                px: { xs: 3, md: 3.5 },
                py: { xs: 1.4, md: 1.6 },
                color: "#FFFFFF",
                borderColor: "rgba(255, 255, 255, 0.22)",
                fontWeight: 700,
                textTransform: "none",
                "&:hover": {
                  borderColor: "#FB7185",
                  background: "rgba(225, 29, 72, 0.08)",
                },
              }}
            >
              Conhecer os diferenciais
            </Button>
          </motion.div>
        </div>
      </Container>
    </Box>
  );
}
