import { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { TbArrowUpRight } from "react-icons/tb";

const WAVEM_PURPLE = "#7C3AED";
const WAVEM_PURPLE_LIGHT = "#A78BFA";

const variantStyles = {
  home: {
    borderRadius: "24px",
    detailLabel: "Explorar projeto",
  },
  projects: {
    borderRadius: "22px",
    detailLabel: "Abrir estudo do projeto",
  },
};

function getProjectCoverBackground(project) {
  const coverImage = project?.coverImage?.trim();

  if (coverImage) {
    return `url("${coverImage}")`;
  }

  return (
    project?.cover ||
    "linear-gradient(145deg, rgba(124,58,237,0.35) 0%, rgba(12,10,22,0.85) 60%, rgba(8,8,10,0.98) 100%)"
  );
}

export default function ProjectCard({
  project,
  index = 0,
  onOpen,
  variant = "home",
  bentoPosition = "default", // 'featured' | 'side' | 'wide' | 'default'
  minHeight,
  transition,
  titleSx,
  summarySx,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const styles = variantStyles[variant] ?? variantStyles.home;
  const coverBackground = getProjectCoverBackground(project);
  const isWide = bentoPosition === "wide";
  const isFeatured = bentoPosition === "featured";
  const stackItems = Array.isArray(project?.stack)
    ? project.stack.slice(0, 3)
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={
        transition ?? {
          duration: 0.55,
          delay: index * 0.08,
          ease: [0.22, 1, 0.36, 1],
        }
      }
      whileHover={{ y: -6 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ height: "100%" }}
    >
      <Box
        onClick={() => onOpen(project)}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onOpen(project);
          }
        }}
        sx={{
          height: "100%",
          minHeight: minHeight ?? project?.minHeight ?? 360,
          position: "relative",
          borderRadius: styles.borderRadius,
          overflow: "hidden",
          display: "flex",
          flexDirection: {
            xs: "column",
            md: isWide ? "row" : "column",
          },
          bgcolor: "#09080F",
          border: "1px solid",
          borderColor: isHovered
            ? "rgba(167, 139, 250, 0.52)"
            : "rgba(255, 255, 255, 0.08)",
          boxShadow: isHovered
            ? "0 24px 60px rgba(124, 58, 237, 0.22), inset 0 1px 0 rgba(167, 139, 250, 0.28)"
            : "0 14px 36px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
          cursor: "pointer",
          transition: "border-color 0.3s ease, box-shadow 0.3s ease",
          "&:focus-visible": {
            outline: "none",
            borderColor: WAVEM_PURPLE_LIGHT,
            boxShadow: `0 0 0 2px ${WAVEM_PURPLE}66`,
          },
        }}
      >
        {/* Brilho Atmosférico Roxo Wavem no Hover */}
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 85% 12%, rgba(124, 58, 237, 0.24) 0%, rgba(124, 58, 237, 0) 58%)",
            opacity: isHovered ? 1 : 0.35,
            transition: "opacity 0.35s ease",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        {/* CAMADA 1: VISOR DA IMAGEM DO PROJETO (Sem colisão com os textos principais) */}
        <Box
          sx={{
            position: "relative",
            width: { xs: "100%", md: isWide ? "54%" : "100%" },
            height: {
              xs: 210,
              sm: 235,
              md: isWide ? "auto" : isFeatured ? 350 : 200,
            },
            flexShrink: 0,
            flexGrow: isFeatured ? 1 : 0,
            overflow: "hidden",
            bgcolor: "#0C0A14",
          }}
        >
          {/* Imagem com Zoom Suave via Framer Motion e enquadramento no topo da interface */}
          <motion.div
            animate={{
              scale: isHovered ? 1.055 : 1,
            }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: "100%",
              height: "100%",
              backgroundImage: coverBackground,
              backgroundSize: "cover",
              backgroundPosition: "top center",
              filter: isHovered
                ? "brightness(1.02) saturate(1.05)"
                : "brightness(0.84) saturate(0.92)",
              transition: "filter 0.4s ease",
            }}
          />

          {/* Véu Roxo/Dark de Integração para fundir o print à caixa de leitura */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: isWide
                ? {
                    xs: "linear-gradient(180deg, rgba(9,8,15,0.28) 0%, rgba(9,8,15,0.12) 48%, rgba(9,8,15,0.98) 100%)",
                    md: "linear-gradient(90deg, rgba(9,8,15,0.12) 0%, rgba(9,8,15,0.22) 68%, rgba(9,8,15,0.98) 100%), linear-gradient(180deg, rgba(124,58,237,0.12) 0%, rgba(9,8,15,0.4) 100%)",
                  }
                : "linear-gradient(180deg, rgba(9,8,15,0.32) 0%, rgba(124,58,237,0.08) 45%, rgba(9,8,15,0.98) 100%)",
              pointerEvents: "none",
            }}
          />

          {/* Topo do Visor: Categoria com fundo em vidro escuro (100% legível sobre qualquer print) + Ícone de Ação */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              position: "absolute",
              top: { xs: 14, md: 18 },
              left: { xs: 14, md: 20 },
              right: { xs: 14, md: 20 },
              zIndex: 2,
            }}
          >
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.8,
                px: 1.4,
                py: 0.55,
                borderRadius: "10px",
                bgcolor: "rgba(9, 8, 15, 0.82)",
                backdropFilter: "blur(12px)",
                border: "1px solid",
                borderColor: isHovered
                  ? "rgba(167, 139, 250, 0.45)"
                  : "rgba(255, 255, 255, 0.12)",
                boxShadow: "0 4px 14px rgba(0,0,0,0.45)",
              }}
            >
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  bgcolor: WAVEM_PURPLE_LIGHT,
                  boxShadow: `0 0 8px ${WAVEM_PURPLE_LIGHT}`,
                }}
              />
              <Typography
                sx={{
                  color: "#F3E8FF",
                  letterSpacing: "0.08em",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  fontSize: "0.66rem",
                  lineHeight: 1,
                }}
              >
                {project?.tag || "Projeto"}
              </Typography>
            </Box>

            <motion.div
              animate={{
                scale: isHovered ? 1.08 : 1,
                rotate: isHovered ? 6 : 0,
              }}
              transition={{ type: "spring", stiffness: 320, damping: 20 }}
            >
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: isHovered
                    ? WAVEM_PURPLE
                    : "rgba(9, 8, 15, 0.78)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid",
                  borderColor: isHovered
                    ? WAVEM_PURPLE_LIGHT
                    : "rgba(255, 255, 255, 0.16)",
                  color: "#fff",
                  boxShadow: isHovered
                    ? "0 0 18px rgba(124, 58, 237, 0.65)"
                    : "0 4px 12px rgba(0,0,0,0.4)",
                  transition: "background-color 0.25s ease, border-color 0.25s ease",
                }}
              >
                <TbArrowUpRight size={18} />
              </Box>
            </motion.div>
          </Stack>
        </Box>

        {/* CAMADA 2: DECK DE LEITURA EM VIDRO ESCURO/ROXO (Texto 100% limpo e separado do print) */}
        <Stack
          justifyContent="space-between"
          sx={{
            position: "relative",
            zIndex: 2,
            flex: 1,
            p: { xs: 2.2, sm: 2.6, md: isFeatured ? 3.2 : 2.6 },
            pt: { xs: 1.6, md: isWide ? 3 : 1.8 },
            background:
              "linear-gradient(180deg, rgba(9, 8, 15, 0.92) 0%, rgba(13, 10, 24, 0.98) 100%)",
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                color: "#fff",
                fontWeight: 800,
                lineHeight: 1.14,
                letterSpacing: "-0.025em",
                fontSize: {
                  xs: "1.28rem",
                  sm: "1.45rem",
                  md: isFeatured ? "1.82rem" : isWide ? "1.65rem" : "1.35rem",
                },
                transition: "color 0.25s ease",
                ...titleSx,
              }}
            >
              {project?.title}
            </Typography>

            <Typography
              sx={{
                mt: 1,
                color: "rgba(228, 228, 231, 0.74)",
                fontSize: {
                  xs: "0.88rem",
                  md: isFeatured ? "0.96rem" : "0.88rem",
                },
                lineHeight: 1.58,
                display: "-webkit-box",
                WebkitLineClamp: isFeatured ? 3 : 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                ...summarySx,
              }}
            >
              {project?.summary}
            </Typography>
          </Box>

          {/* Rodapé do Card: Tecnologias discretas + Chamada de Ação Roxa */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={1.5}
            sx={{
              mt: { xs: 2, md: 2.4 },
              pt: 1.5,
              borderTop: "1px solid rgba(167, 139, 250, 0.1)",
            }}
          >
            {stackItems.length > 0 ? (
              <Stack
                direction="row"
                alignItems="center"
                spacing={0.8}
                sx={{ overflow: "hidden" }}
              >
                <Typography
                  sx={{
                    color: "rgba(221, 214, 254, 0.72)",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {stackItems.join(" · ")}
                </Typography>
              </Stack>
            ) : (
              <Box />
            )}

            <Stack
              direction="row"
              alignItems="center"
              spacing={0.6}
              sx={{ flexShrink: 0 }}
            >
              <Typography
                sx={{
                  color: isHovered ? "#DDD6FE" : WAVEM_PURPLE_LIGHT,
                  fontWeight: 700,
                  fontSize: "0.82rem",
                  transition: "color 0.2s ease",
                }}
              >
                {styles.detailLabel}
              </Typography>
              <motion.span
                animate={{
                  x: isHovered ? 3 : 0,
                  y: isHovered ? -2 : 0,
                }}
                transition={{ type: "spring", stiffness: 340, damping: 20 }}
                style={{
                  display: "inline-flex",
                  color: isHovered ? "#DDD6FE" : WAVEM_PURPLE_LIGHT,
                }}
              >
                <TbArrowUpRight size={16} />
              </motion.span>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </motion.div>
  );
}
