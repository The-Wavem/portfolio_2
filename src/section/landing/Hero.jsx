import { useEffect, useState, lazy, Suspense } from "react";
import { Box, Typography, Container, Button, Stack } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";
import { TbArrowUpRight } from "react-icons/tb";
import {
  getHomeHeroContent,
  getHomeHeroContentRemote,
  isLegacyHeroContent,
  getAboutMembers,
  getAboutMembersRemote,
} from "@/service/content";
import { trackAction } from "@/service/analytics/tracking.service";
import NetworkBackground from "./NetworkBackground";

const TeamMemberDetailsModal = lazy(
  () => import("@/components/organism/TeamMemberDetailsModal")
);

const MotionTypography = motion.create(Typography);
const MotionBox = motion.create(Box);

export default function Hero({ content }) {
  const [hero, setHero] = useState(() => content || getHomeHeroContent());
  const [members, setMembers] = useState(() => getAboutMembers());
  const [hoveredMember, setHoveredMember] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    let isMounted = true;

    if (content) {
      setHero(content);
      return;
    }

    async function loadHeroAndTeamRemote() {
      try {
        const [remoteHero, remoteMembers] = await Promise.all([
          getHomeHeroContentRemote(),
          getAboutMembersRemote(),
        ]);

        if (!isMounted) return;

        if (remoteHero && !isLegacyHeroContent(remoteHero)) {
          setHero(remoteHero);
        }

        if (Array.isArray(remoteMembers) && remoteMembers.length > 0) {
          setMembers(remoteMembers);
        }
      } catch {
        return;
      }
    }

    loadHeroAndTeamRemote();

    return () => {
      isMounted = false;
    };
  }, [content]);

  const handleSelectMember = (member) => {
    setSelectedMember(member);
    trackAction({
      page: "home",
      section: "hero",
      action: "open_team_member",
      label: member?.name || "Membro",
    });
  };

  return (
    <Box
      sx={{
        minHeight: { xs: "86vh", md: "92vh" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(circle at 50% 24%, rgba(124, 58, 237, 0.18) 0%, rgba(56, 189, 248, 0.05) 38%, rgba(5, 5, 5, 0) 68%)",
        pt: { xs: 11, sm: 13, md: 15 },
        pb: { xs: 7, sm: 9, md: 11 },
        position: "relative",
        overflow: "hidden",
      }}
      component="section"
    >
      <NetworkBackground />

      {/* Onda Arquitetônica Sutil e Desfocada ao Fundo (Profundidade de Campo Limpa) */}
      <Box
        aria-hidden
        sx={{
          display: { xs: "none", md: "block" },
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          opacity: 0.32,
          filter: "blur(4px)",
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1440 800"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="heroCenteredWave"
              x1="0%"
              y1="50%"
              x2="100%"
              y2="50%"
            >
              <stop offset="0%" stopColor="#7C3AED" stopOpacity="0" />
              <stop offset="30%" stopColor="#7C3AED" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#A78BFA" stopOpacity="0.6" />
              <stop offset="70%" stopColor="#38BDF8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
            </linearGradient>
          </defs>

          <path
            d="M 0 540 C 360 620, 560 280, 900 360 C 1140 415, 1280 290, 1440 310"
            fill="none"
            stroke="url(#heroCenteredWave)"
            strokeWidth="2"
          />
        </svg>
      </Box>

      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
        <MotionBox
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            mx: "auto",
          }}
        >
      
          {/* Headline Principal Centralizada com Escala Monumental */}
          <MotionTypography
            variant="h1"
            component="h1"
            sx={{
              color: "#fff",
              fontSize: {
                xs: "2.05rem",
                sm: "2.95rem",
                md: "3.85rem",
              },
              lineHeight: { xs: 1.12, md: 1.06 },
              letterSpacing: "-0.035em",
              fontWeight: 800,
              mb: { xs: 2, md: 2.6 },
              maxWidth: { xs: 360, sm: 680, md: 840 },
            }}
          >
            {hero?.titlePrefix || "De pessoas para pessoas:"}{" "}
            <Box
              component="span"
              sx={{
                background:
                  "linear-gradient(95deg, #C4B5FD 0%, #8B5CF6 52%, #38BDF8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {hero?.titleHighlight ||
                "sistemas simples que organizam o seu negócio."}
            </Box>
          </MotionTypography>

          {/* Subtítulo Acolhedor e Direto */}
          <Typography
            variant="body1"
            sx={{
              maxWidth: { xs: 340, sm: 560, md: 640 },
              lineHeight: { xs: 1.56, md: 1.66 },
              fontSize: { xs: "0.94rem", sm: "1.04rem", md: "1.12rem" },
              color: "rgba(228, 228, 231, 0.74)",
              mb: { xs: 3.2, md: 4.2 },
            }}
          >
            {hero?.description ||
              "Organize sua rotina, venda seus produtos ou mostre sua arte em poucos cliques — com a nossa equipe ao seu lado do cafezinho ao código."}
          </Typography>

          {/* Botões de Ação Centralizados */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1.4, sm: 2 }}
            justifyContent="center"
            alignItems="center"
            width={{ xs: "100%", sm: "auto" }}
            sx={{ mb: { xs: 4, md: 5.5 } }}
          >
            <Button
              component="a"
              href={hero?.primaryCTA?.link || "#contato"}
              onClick={() =>
                trackAction({
                  page: "home",
                  section: "hero",
                  action: "click_primary_cta",
                  label: hero?.primaryCTA?.label || "Conversar com a equipe",
                })
              }
              variant="contained"
              size="large"
              sx={{
                width: { xs: "100%", sm: "auto" },
                px: { xs: 3.2, md: 4 },
                py: { xs: 1.35, md: 1.5 },
                fontSize: { xs: "0.92rem", md: "0.98rem" },
                fontWeight: 700,
                borderRadius: "10px",
                boxShadow: "0px 6px 22px rgba(124, 58, 237, 0.3)",
                transition: "background-color 0.2s ease, transform 0.2s ease",
                "&:hover": {
                  transform: "translateY(-1px)",
                  boxShadow: "0px 8px 26px rgba(124, 58, 237, 0.44)",
                },
              }}
            >
              {hero?.primaryCTA?.label || "Conversar com a equipe"}
            </Button>

            <Button
              component={RouterLink}
              to={
                hero?.secondaryCTA?.link === "/portfolio"
                  ? "/projetos"
                  : hero?.secondaryCTA?.link || "/projetos"
              }
              onClick={() =>
                trackAction({
                  page: "home",
                  section: "hero",
                  action: "click_secondary_cta",
                  label: hero?.secondaryCTA?.label || "Ver projetos reais",
                })
              }
              variant="outlined"
              size="large"
              endIcon={<TbArrowUpRight size={17} />}
              sx={{
                width: { xs: "100%", sm: "auto" },
                px: { xs: 3, md: 3.5 },
                py: { xs: 1.3, md: 1.5 },
                fontSize: { xs: "0.92rem", md: "0.98rem" },
                fontWeight: 700,
                borderRadius: "10px",
                borderColor: "rgba(255,255,255,0.16)",
                color: "rgba(255,255,255,0.9)",
                transition: "border-color 0.2s ease, background-color 0.2s ease",
                "&:hover": {
                  borderColor: "#A78BFA",
                  background: "rgba(124,58,237,0.08)",
                },
              }}
            >
              {hero?.secondaryCTA?.label || "Ver projetos reais"}
            </Button>
          </Stack>

          {/* BARRA DE PRESENÇA HUMANA CENTRALIZADA (Altura e Largura 100% Estáveis no Hover) */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: { xs: 1.5, sm: 2.2 },
              pt: { xs: 2, sm: 2.4 },
              borderTop: "1px solid rgba(255,255,255,0.08)",
              width: "100%",
              maxWidth: 460,
              minWidth: 0,
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              sx={{ pl: 0.5, flexShrink: 0 }}
              onMouseLeave={() => setHoveredMember(null)}
            >
              {members.slice(0, 6).map((member, idx) => {
                const isHovered = hoveredMember?.id === member.id;
                return (
                  <Box
                    key={member.id || member.name}
                    component="button"
                    type="button"
                    onMouseEnter={() => setHoveredMember(member)}
                    onFocus={() => setHoveredMember(member)}
                    onClick={() => handleSelectMember(member)}
                    sx={{
                      marginLeft: idx === 0 ? 0 : "-8px",
                      padding: 0,
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                      position: "relative",
                      zIndex: isHovered ? 10 : members.length - idx,
                      outline: "none",
                      transition: "transform 0.18s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                      },
                    }}
                    aria-label={`Conhecer ${member.name}`}
                  >
                    <Box
                      component="img"
                      src={member.image}
                      alt={member.name}
                      sx={{
                        width: { xs: 36, sm: 40 },
                        height: { xs: 36, sm: 40 },
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: isHovered
                          ? "2px solid #A78BFA"
                          : "2px solid #060608",
                        display: "block",
                        bgcolor: "#18181B",
                        transition: "border-color 0.18s ease",
                      }}
                    />
                  </Box>
                );
              })}
            </Stack>

            <Box
              sx={{
                textAlign: "left",
                height: { xs: 36, sm: 40 },
                width: { xs: 195, sm: 235 },
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                flexShrink: 0,
                minWidth: 0,
                overflow: "hidden",
              }}
            >
              <AnimatePresence mode="wait">
                {hoveredMember ? (
                  <motion.div
                    key={hoveredMember.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.12 }}
                    style={{ minWidth: 0, width: "100%" }}
                  >
                    <Typography
                      sx={{
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: { xs: "0.78rem", sm: "0.85rem" },
                        lineHeight: 1.2,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {hoveredMember.name}{" "}
                      <Box
                        component="span"
                        sx={{ color: "#A78BFA", fontWeight: 600 }}
                      >
                        · {hoveredMember.role}
                      </Box>
                    </Typography>
                    <Typography
                      sx={{
                        color: "rgba(228,228,231,0.55)",
                        fontSize: { xs: "0.7rem", sm: "0.75rem" },
                        lineHeight: 1.25,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      Clique para ver perfil e projetos
                    </Typography>
                  </motion.div>
                ) : (
                  <motion.div
                    key="default-team-caption"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.12 }}
                    style={{ minWidth: 0, width: "100%" }}
                  >
                    <Stack direction="row" alignItems="center" spacing={0.8}>
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          bgcolor: "#34D399",
                          flexShrink: 0,
                        }}
                      />
                      <Typography
                        sx={{
                          color: "#fff",
                          fontWeight: 700,
                          fontSize: { xs: "0.78rem", sm: "0.85rem" },
                          lineHeight: 1.2,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {members.length} pessoas reais no time
                      </Typography>
                    </Stack>
                    <Typography
                      sx={{
                        color: "rgba(228,228,231,0.52)",
                        fontSize: { xs: "0.7rem", sm: "0.75rem" },
                        lineHeight: 1.25,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      Toque nas fotos para nos conhecer
                    </Typography>
                  </motion.div>
                )}
              </AnimatePresence>
            </Box>
          </Box>
        </MotionBox>
      </Container>

      {/* Modal Real da Equipe ao clicar em qualquer foto */}
      {selectedMember && (
        <Suspense fallback={null}>
          <TeamMemberDetailsModal
            selectedMember={selectedMember}
            onClose={() => setSelectedMember(null)}
          />
        </Suspense>
      )}
    </Box>
  );
}
