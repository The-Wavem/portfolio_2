import { useEffect, useState } from 'react';
import { Box, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import { getAboutHeroContent, getAboutHeroContentRemote } from '@/service/content';

export default function AboutHeroSection() {
  const [content, setContent] = useState(() => getAboutHeroContent());
  const aboutAccent = content.accent ?? "#38BDF8";
  const theme = useTheme();

  useEffect(() => {
    let isMounted = true;

    async function loadRemoteContent() {
      try {
        const remoteContent = await getAboutHeroContentRemote();
        if (isMounted && remoteContent) {
          setContent(remoteContent);
        }
      } catch {
        return;
      }
    }

    loadRemoteContent();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Box
      component="section"
      sx={{ pt: { xs: 12, md: 16 }, position: "relative", overflow: "hidden" }}
    >
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          width: { xs: 220, md: 340 },
          height: { xs: 220, md: 340 },
          borderRadius: "50%",
          filter: "blur(78px)",
          background: `${aboutAccent}2A`,
          top: { xs: 12, md: 0 },
          right: { xs: -120, md: -140 },
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <Box
            mb={{ xs: 5, md: 7 }}
            textAlign="left"
            sx={{ position: "relative", zIndex: 2 }}
          >
            <Typography
              variant="overline"
              sx={{
                color: aboutAccent,
                letterSpacing: 4,
                fontWeight: 700,
                fontSize: "0.72rem",
                opacity: 0.95,
              }}
            >
              {content.eyebrow}
            </Typography>
            <Typography
              variant="h3"
              fontWeight={800}
              sx={{
                mt: 1.4,
                mb: 2.4,
                maxWidth: 860,
                fontSize: { xs: "2rem", sm: "2.35rem", md: "3.1rem" },
                lineHeight: 1.06,
                letterSpacing: "-0.03em",
              }}
            >
              {content.titleStart}{" "}
              <span style={{ color: aboutAccent }}>
                {content.titleHighlight}
              </span>
            </Typography>
            <Typography
              sx={{
                maxWidth: 700,
                color: "rgba(228,228,231,0.72)",
                lineHeight: 1.75,
                fontSize: { xs: "0.95rem", md: "1rem" },
                letterSpacing: "0.01em",
              }}
            >
              {content.description}
            </Typography>

            <Box
              aria-hidden
              sx={{
                mt: 2.2,
                width: { xs: 120, md: 160 },
                height: "2px",
                borderRadius: "999px",
                background: `linear-gradient(90deg, ${theme.palette.primary.main}80, ${aboutAccent}90)`,
              }}
            />
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
