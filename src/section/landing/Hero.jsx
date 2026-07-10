import { useEffect, useState } from "react";
import { Box, Typography, Container, Button, Stack, Chip } from "@mui/material";
import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";
import {
  getHomeHeroContent,
  getHomeHeroContentRemote,
} from "@/service/content";
import { trackAction } from "@/service/analytics/tracking.service";
import NetworkBackground from "./NetworkBackground";

const MotionTypography = motion.create(Typography);
const MotionBox = motion.create(Box);

export default function Hero({ content }) {
  const [hero, setHero] = useState(() => content || getHomeHeroContent());

  useEffect(() => {
    let isMounted = true;

    if (content) {
      setHero(content);
      return;
    }

    async function loadHeroRemote() {
      try {
        const remoteHero = await getHomeHeroContentRemote();
        if (isMounted && remoteHero) {
          setHero(remoteHero);
        }
      } catch {
        return;
      }
    }

    loadHeroRemote();

    return () => {
      isMounted = false;
    };
  }, [content]);

  const badges = hero?.badges || [];

  return (
    <Box
      sx={{
        minHeight: { xs: "auto", md: "92vh" },
        display: "flex",
        alignItems: "center",
        background:
          "radial-gradient(circle at 22% 8%, rgba(124, 58, 237, 0.2) 0%, rgba(5, 5, 5, 0) 42%), radial-gradient(circle at 82% 18%, rgba(56, 189, 248, 0.14) 0%, rgba(5, 5, 5, 0) 36%)",
        pt: { xs: 11, md: 14 },
        pb: { xs: 8, md: 10 },
        position: "relative",
        overflow: "hidden",
      }}
      component="section"
    >
      <motion.div
        aria-hidden
        animate={{ opacity: [0.12, 0.2, 0.12], scale: [1, 1.04, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          right: "-140px",
          top: "-100px",
          width: 420,
          height: 420,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(124,58,237,0.46) 0%, rgba(124,58,237,0) 70%)",
          filter: "blur(46px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <NetworkBackground />

      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: { xs: 3, md: 4 },
          }}
        >
          <Box>
            <Stack
              direction="row"
              flexWrap="wrap"
              gap={1.5}
              justifyContent="center"
              sx={{ mb: 3 }}
            >
              {badges.map((badge, idx) => (
                <Chip
                  key={idx}
                  label={badge}
                  sx={{
                    bgcolor: "rgba(124, 58, 237, 0.08)",
                    border: "1px solid rgba(124, 58, 237, 0.3)",
                    color: "primary.light",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    backdropFilter: "blur(8px)",
                    textTransform: "uppercase",
                    px: 0.5,
                    letterSpacing: "0.02em",
                  }}
                />
              ))}
            </Stack>

            <MotionTypography
              variant="h2"
              component="h1"
              sx={{
                color: "#fff",
                WebkitBackgroundClip: "text",
                fontSize: { xs: "2.2rem", sm: "2.7rem", md: "3.3rem" },
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                fontWeight: 700,
                mb: 3,
              }}
            >
              {hero?.titlePrefix || ""} {" "}
              <span
                style={{
                  color: "#7C3AED",
                  WebkitTextFillColor: "#7C3AED",
                  textBackgroundClip: "text",
                  WebkitBackgroundClip: "text",
                }}
              >
                {hero?.titleHighlight || ""}
              </span>
            </MotionTypography>

            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                maxWidth: 680,
                mx: "auto",
                lineHeight: 1.6,
                fontSize: { xs: "1rem", md: "1.1rem" },
                color: "rgba(228, 228, 231, 0.82)",
                mb: 4,
              }}
            >
              {hero?.description || ""}

            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="center"
              width={{ xs: "100%", sm: "auto" }}
            >
              <Button
                component="a"
                href={hero?.primaryCTA?.link || "#"}
                onClick={() =>
                  trackAction({
                    page: "home",
                    section: "hero",
                    action: "click_primary_cta",
                    label: hero?.primaryCTA?.label || "Iniciar Projeto",
                  })
                }
                variant="contained"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: 800,
                  borderRadius: "999px",
                  boxShadow: "0px 0px 20px rgba(124, 58, 237, 0.4)",
                  "&:hover": {
                    boxShadow: "0px 0px 24px rgba(124, 58, 237, 0.6)",
                  },
                }}
              >
                {hero?.primaryCTA?.label || "Iniciar Projeto"}
              </Button>

              <Button
                component={RouterLink}
                to={hero?.secondaryCTA?.link || "/portfolio"}
                onClick={() =>
                  trackAction({
                    page: "home",
                    section: "hero",
                    action: "click_secondary_cta",
                    label: hero?.secondaryCTA?.label || "Ver Portfolio",
                  })
                }
                variant="outlined"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: 800,
                  borderRadius: "999px",
                  borderColor: "rgba(255,255,255,0.35)",
                  color: "#fff",
                  "&:hover": {
                    borderColor: "primary.main",
                    background: "rgba(124,58,237,0.12)",
                  },
                }}
              >
                {hero?.secondaryCTA?.label || "Ver Portfolio"}
              </Button>
            </Stack>
          </Box>
        </MotionBox>
      </Container>
    </Box>
  );
}
