import { useEffect, useState, useRef, lazy, Suspense } from "react";
import { Box, Typography, Container, Button, Stack } from "@mui/material";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Link as RouterLink } from "react-router-dom";
import {
  TbCoffee,
  TbCode,
  TbRocket,
  TbCheck,
  TbArrowUpRight,
  TbLayoutGrid,
  TbShoppingBag,
  TbPalette,
  TbPointer,
  TbMessageCircle,
  TbRefresh,
} from "react-icons/tb";
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

const JOURNEY_NODES = [
  {
    id: "coffee",
    step: "01",
    label: "Cafezinho",
    detail: "Ouvimos sua ideia sem termos difíceis",
    icon: TbCoffee,
    color: "#F59E0B",
  },
  {
    id: "sketch",
    step: "02",
    label: "Organização",
    detail: "Desenhamos a tela juntos antes do código",
    icon: TbMessageCircle,
    color: "#A78BFA",
  },
  {
    id: "live",
    step: "03",
    label: "Sistema no Ar",
    detail: "Simples de usar em poucos cliques",
    icon: TbRocket,
    color: "#34D399",
  },
];

const WORKSPACE_SCENARIOS = [
  {
    id: "organize",
    label: "Organizar rotina",
    accent: "#A78BFA",
    icon: TbLayoutGrid,
    headline: "Saia do improviso em 1 clique",
    subline: "Agendamentos, clientes e pedidos organizados no mesmo lugar.",
    actionIdle: "Organizar dia em 1 clique",
    actionDone: "Rotina organizada",
    memberRoles: ["Líder Front-end", "Líder do back-end"],
  },
  {
    id: "sell",
    label: "Vender produtos",
    accent: "#34D399",
    icon: TbShoppingBag,
    headline: "Catálogo direto sem travar o cliente",
    subline: "Da escolha do produto ao pedido confirmado em segundos.",
    actionIdle: "Simular compra em 1 clique",
    actionDone: "Pedido recebido na hora",
    memberRoles: ["Líder UX/UI", "Desenvolvedor back-end"],
  },
  {
    id: "art",
    label: "Mostrar sua arte",
    accent: "#38BDF8",
    icon: TbPalette,
    headline: "Sua identidade com presença única",
    subline: "Vitrine autoral para destacar seu trabalho e atrair clientes.",
    actionIdle: "Transformar vitrine em 1 clique",
    actionDone: "Destaque autoral ativo",
    memberRoles: ["Líder UX/UI", "Líder Front-end"],
  },
];

const ORGANIZE_ITEMS = [
  {
    id: "item-1",
    client: "Estúdio Aurora",
    task: "Agendamento das 14h",
    idleStatus: "Na conversa",
    doneStatus: "Confirmado",
    time: "14:00",
  },
  {
    id: "item-2",
    client: "Café do Mercado",
    task: "Reposição de pedidos",
    idleStatus: "Planilha solta",
    doneStatus: "Automatizado",
    time: "15:30",
  },
  {
    id: "item-3",
    client: "Ateliê Nuvem",
    task: "Fechamento da semana",
    idleStatus: "Pendente",
    doneStatus: "Pronto em 1 clique",
    time: "17:00",
  },
];

export default function Hero({ content }) {
  const [hero, setHero] = useState(() => content || getHomeHeroContent());
  const [members, setMembers] = useState(() => getAboutMembers());
  const [hoveredMember, setHoveredMember] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);

  const [activeJourneyIdx, setActiveJourneyIdx] = useState(0);
  const [activeScenarioId, setActiveScenarioId] = useState("organize");
  const [simulatedDone, setSimulatedDone] = useState({
    organize: false,
    sell: false,
    art: false,
  });

  const stageRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 120, damping: 24 });
  const smoothY = useSpring(mouseY, { stiffness: 120, damping: 24 });

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [4.5, -4.5]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-5.5, 5.5]);
  const glowX = useTransform(smoothX, [-0.5, 0.5], ["20%", "80%"]);
  const glowY = useTransform(smoothY, [-0.5, 0.5], ["20%", "80%"]);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveJourneyIdx((prev) => (prev + 1) % JOURNEY_NODES.length);
    }, 3600);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (event) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width - 0.5;
    const ny = (event.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(Math.max(-0.5, Math.min(0.5, nx)));
    mouseY.set(Math.max(-0.5, Math.min(0.5, ny)));
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const activeScenario =
    WORKSPACE_SCENARIOS.find((item) => item.id === activeScenarioId) ||
    WORKSPACE_SCENARIOS[0];
  const isCurrentDone = Boolean(simulatedDone[activeScenario.id]);

  const toggleSimulation = () => {
    setSimulatedDone((prev) => ({
      ...prev,
      [activeScenario.id]: !prev[activeScenario.id],
    }));
    trackAction({
      page: "home",
      section: "hero",
      action: "simulate_few_clicks",
      label: activeScenario.label,
    });
  };

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
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      sx={{
        minHeight: { xs: "auto", md: "92vh" },
        display: "flex",
        alignItems: "center",
        background:
          "radial-gradient(circle at 16% 18%, rgba(124, 58, 237, 0.22) 0%, rgba(5, 5, 5, 0) 44%), radial-gradient(circle at 84% 26%, rgba(56, 189, 248, 0.14) 0%, rgba(5, 5, 5, 0) 40%)",
        pt: { xs: 10.5, sm: 12, md: 14 },
        pb: { xs: 6, sm: 8, md: 10 },
        position: "relative",
        overflow: "hidden",
      }}
      component="section"
    >
      <NetworkBackground />

      {/* Linha de História Integrada ao Fundo (Apenas Desktop para manter Mobile limpo) */}
      <Box
        aria-hidden
        sx={{
          display: { xs: "none", md: "block" },
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          opacity: 0.55,
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
              id="heroStoryBridge"
              x1="0%"
              y1="50%"
              x2="100%"
              y2="50%"
            >
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0" />
              <stop offset="25%" stopColor="#F59E0B" stopOpacity="0.45" />
              <stop offset="60%" stopColor="#7C3AED" stopOpacity="0.65" />
              <stop offset="92%" stopColor="#38BDF8" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
            </linearGradient>
          </defs>

          <path
            d="M 80 560 C 380 560, 520 260, 820 310 C 1040 345, 1180 250, 1380 270"
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1.5"
            strokeDasharray="6 8"
          />

          <motion.path
            d="M 80 560 C 380 560, 520 260, 820 310 C 1040 345, 1180 250, 1380 270"
            fill="none"
            stroke="url(#heroStoryBridge)"
            strokeWidth="2.5"
            initial={{ pathLength: 0.2, opacity: 0.35 }}
            animate={{
              pathLength: [0.2, 1, 0.2],
              opacity: [0.35, 0.85, 0.35],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>
      </Box>

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1.05fr 0.95fr" },
            gap: { xs: 3.5, sm: 5, lg: 7 },
            alignItems: "center",
          }}
        >
          {/* COLUNA ESQUERDA: CONVITE DIRETO E HUMANO */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", lg: "flex-start" },
              textAlign: { xs: "center", lg: "left" },
            }}
          >
            {/* Fio Condutor Minimalista */}
            <Stack
              direction="row"
              alignItems="center"
              spacing={1.1}
              sx={{ mb: { xs: 1.6, md: 2.2 }, color: "rgba(228,228,231,0.78)" }}
            >
              <Stack direction="row" alignItems="center" spacing={0.6}>
                <TbCoffee size={16} color="#F59E0B" />
                <Typography
                  sx={{
                    fontSize: { xs: "0.78rem", md: "0.82rem" },
                    fontWeight: 600,
                    letterSpacing: "0.03em",
                    color: "#FDE68A",
                  }}
                >
                  Do cafezinho
                </Typography>
              </Stack>

              <Box
                sx={{
                  width: 32,
                  height: 2,
                  borderRadius: 2,
                  bgcolor: "rgba(255,255,255,0.12)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <motion.div
                  animate={{ x: ["-100%", "140%"] }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    width: "60%",
                    height: "100%",
                    background:
                      "linear-gradient(90deg, transparent, #F59E0B, #A78BFA, transparent)",
                  }}
                />
              </Box>

              <Stack direction="row" alignItems="center" spacing={0.6}>
                <TbCode size={16} color="#A78BFA" />
                <Typography
                  sx={{
                    fontSize: { xs: "0.78rem", md: "0.82rem" },
                    fontWeight: 600,
                    letterSpacing: "0.03em",
                    color: "#DDD6FE",
                  }}
                >
                  ao código
                </Typography>
              </Stack>
            </Stack>

            {/* Headline Direta e Proporcional no Mobile */}
            <MotionTypography
              variant="h1"
              component="h1"
              sx={{
                color: "#fff",
                fontSize: { xs: "1.78rem", sm: "2.5rem", md: "3.25rem" },
                lineHeight: { xs: 1.14, md: 1.08 },
                letterSpacing: "-0.03em",
                fontWeight: 800,
                mb: { xs: 1.6, md: 2.2 },
                maxWidth: { xs: 340, sm: 540, md: 620 },
              }}
            >
              {hero?.titlePrefix || "De pessoas para pessoas:"}{" "}
              <Box
                component="span"
                sx={{
                  background:
                    "linear-gradient(95deg, #A78BFA 0%, #7C3AED 52%, #38BDF8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {hero?.titleHighlight ||
                  "sistemas simples que organizam o seu negócio."}
              </Box>
            </MotionTypography>

            {/* Subtítulo Curto e Acolhedor */}
            <Typography
              variant="body1"
              sx={{
                maxWidth: { xs: 335, sm: 500, md: 540 },
                lineHeight: { xs: 1.52, md: 1.62 },
                fontSize: { xs: "0.9rem", sm: "0.98rem", md: "1.06rem" },
                color: "rgba(228, 228, 231, 0.76)",
                mb: { xs: 2.6, md: 3.5 },
              }}
            >
              {hero?.description ||
                "Organize sua rotina, venda seus produtos ou mostre sua arte em poucos cliques — com a nossa equipe ao seu lado do cafezinho ao código."}
            </Typography>

            {/* Botões de Ação */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1.2, sm: 1.8 }}
              justifyContent={{ xs: "center", lg: "flex-start" }}
              width={{ xs: "100%", sm: "auto" }}
              sx={{ mb: { xs: 2.8, md: 4.5 } }}
            >
              <motion.div
                whileHover={{ scale: 1.025, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  component="a"
                  href={hero?.primaryCTA?.link || "#contato"}
                  onClick={() =>
                    trackAction({
                      page: "home",
                      section: "hero",
                      action: "click_primary_cta",
                      label:
                        hero?.primaryCTA?.label || "Conversar com a equipe",
                    })
                  }
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{
                    px: { xs: 3, md: 3.6 },
                    py: { xs: 1.25, md: 1.45 },
                    fontSize: { xs: "0.92rem", md: "0.98rem" },
                    fontWeight: 700,
                    borderRadius: "12px",
                    boxShadow: "0px 8px 28px rgba(124, 58, 237, 0.38)",
                    "&:hover": {
                      boxShadow: "0px 10px 32px rgba(124, 58, 237, 0.58)",
                    },
                  }}
                >
                  {hero?.primaryCTA?.label || "Conversar com a equipe"}
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
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
                  fullWidth
                  endIcon={<TbArrowUpRight size={18} />}
                  sx={{
                    px: { xs: 2.8, md: 3.2 },
                    py: { xs: 1.2, md: 1.45 },
                    fontSize: { xs: "0.92rem", md: "0.98rem" },
                    fontWeight: 700,
                    borderRadius: "12px",
                    borderColor: "rgba(255,255,255,0.22)",
                    color: "#fff",
                    "&:hover": {
                      borderColor: "primary.light",
                      background: "rgba(124,58,237,0.1)",
                    },
                  }}
                >
                  {hero?.secondaryCTA?.label || "Ver projetos reais"}
                </Button>
              </motion.div>
            </Stack>

            {/* BARRA DE PRESENÇA HUMANA (100% estável sem pulos no hover) */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: { xs: "center", lg: "flex-start" },
                gap: { xs: 1.4, sm: 2 },
                py: { xs: 1.1, sm: 0 },
                px: { xs: 1.5, sm: 0 },
                pt: { xs: 1.1, sm: 2.2 },
                borderRadius: { xs: "14px", sm: 0 },
                bgcolor: { xs: "rgba(255,255,255,0.025)", sm: "transparent" },
                border: {
                  xs: "1px solid rgba(255,255,255,0.07)",
                  sm: "none",
                },
                borderTop: {
                  xs: "1px solid rgba(255,255,255,0.07)",
                  sm: "1px solid rgba(255,255,255,0.08)",
                },
                width: "100%",
                maxWidth: 540,
                minWidth: 0,
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                sx={{ pl: { xs: 0.4, sm: 1 }, flexShrink: 0 }}
                onMouseLeave={() => setHoveredMember(null)}
              >
                {members.slice(0, 6).map((member, idx) => {
                  const isHovered = hoveredMember?.id === member.id;
                  return (
                    <motion.button
                      key={member.id || member.name}
                      type="button"
                      onMouseEnter={() => setHoveredMember(member)}
                      onFocus={() => setHoveredMember(member)}
                      onClick={() => handleSelectMember(member)}
                      whileHover={{ y: -4, scale: 1.08, zIndex: 10 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{
                        type: "spring",
                        stiffness: 360,
                        damping: 22,
                      }}
                      style={{
                        marginLeft: idx === 0 ? 0 : -9,
                        padding: 0,
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                        position: "relative",
                        zIndex: isHovered ? 10 : members.length - idx,
                        outline: "none",
                      }}
                      aria-label={`Conhecer ${member.name}`}
                    >
                      <Box
                        component="img"
                        src={member.image}
                        alt={member.name}
                        sx={{
                          width: { xs: 33, sm: 40 },
                          height: { xs: 33, sm: 40 },
                          borderRadius: "50%",
                          objectFit: "cover",
                          border: isHovered
                            ? "2px solid #A78BFA"
                            : "2px solid #080808",
                          boxShadow: isHovered
                            ? "0 0 14px rgba(167,139,250,0.75)"
                            : "0 4px 10px rgba(0,0,0,0.5)",
                          display: "block",
                          bgcolor: "#18181B",
                        }}
                      />
                    </motion.button>
                  );
                })}
              </Stack>

              <Box
                sx={{
                  textAlign: "left",
                  height: { xs: 34, sm: 38 },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  flex: 1,
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
                      transition={{ duration: 0.14 }}
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
                          color: "rgba(228,228,231,0.6)",
                          fontSize: { xs: "0.7rem", sm: "0.75rem" },
                          lineHeight: 1.25,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        Toque para ver perfil e projetos
                      </Typography>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="default-team-caption"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.14 }}
                      style={{ minWidth: 0, width: "100%" }}
                    >
                      <Stack direction="row" alignItems="center" spacing={0.7}>
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            bgcolor: "#34D399",
                            boxShadow: "0 0 8px #34D399",
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
                          color: "rgba(228,228,231,0.58)",
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

          {/* COLUNA DIREITA: PALCO INTERATIVO (Enxuto no Mobile, Completo no Desktop) */}
          <MotionBox
            ref={stageRef}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            style={{
              rotateX,
              rotateY,
              transformPerspective: 1100,
            }}
            sx={{
              position: "relative",
              width: "100%",
            }}
          >
            {/* Brilho Dinâmico que acompanha o movimento (Desktop) */}
            <motion.div
              aria-hidden
              style={{
                position: "absolute",
                inset: -18,
                borderRadius: 28,
                background:
                  "radial-gradient(circle at 50% 40%, rgba(124,58,237,0.22), rgba(56,189,248,0.08) 55%, transparent 75%)",
                filter: "blur(24px)",
                zIndex: 0,
                left: glowX,
                top: glowY,
                transform: "translate(-50%, -50%)",
                width: "85%",
                height: "85%",
                pointerEvents: "none",
              }}
            />

            {/* Superfície Principal Integrada */}
            <Box
              sx={{
                position: "relative",
                zIndex: 1,
                borderRadius: { xs: "18px", sm: "22px" },
                border: "1px solid rgba(255,255,255,0.1)",
                background:
                  "linear-gradient(165deg, rgba(16,16,20,0.88) 0%, rgba(8,8,10,0.94) 100%)",
                backdropFilter: "blur(16px)",
                boxShadow:
                  "0 20px 50px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)",
                p: { xs: 1.6, sm: 2.8 },
                overflow: "hidden",
              }}
            >
              {/* 1. TRILHA SUPERIOR: Visível apenas de Tablet/Desktop em diante para não poluir o Mobile */}
              <Box
                sx={{
                  display: { xs: "none", sm: "block" },
                  pb: 2,
                  mb: 2.2,
                  borderBottom: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ mb: 1.4 }}
                >
                  <Typography
                    sx={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "rgba(228,228,231,0.58)",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    Nosso ritmo com você
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.76rem",
                      fontWeight: 600,
                      color: JOURNEY_NODES[activeJourneyIdx].color,
                    }}
                  >
                    {JOURNEY_NODES[activeJourneyIdx].detail}
                  </Typography>
                </Stack>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 1,
                    position: "relative",
                  }}
                >
                  {JOURNEY_NODES.map((node, index) => {
                    const Icon = node.icon;
                    const isActive = index === activeJourneyIdx;
                    return (
                      <Box
                        key={node.id}
                        component="button"
                        type="button"
                        onClick={() => setActiveJourneyIdx(index)}
                        onMouseEnter={() => setActiveJourneyIdx(index)}
                        sx={{
                          textAlign: "left",
                          p: 1.1,
                          borderRadius: "12px",
                          border: "1px solid",
                          borderColor: isActive
                            ? `${node.color}55`
                            : "rgba(255,255,255,0.05)",
                          bgcolor: isActive
                            ? "rgba(255,255,255,0.04)"
                            : "rgba(255,255,255,0.015)",
                          cursor: "pointer",
                          transition: "all 200ms ease",
                          position: "relative",
                          overflow: "hidden",
                        }}
                      >
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Box
                            sx={{
                              width: 28,
                              height: 28,
                              borderRadius: "8px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              bgcolor: isActive
                                ? `${node.color}22`
                                : "rgba(255,255,255,0.04)",
                              color: isActive
                                ? node.color
                                : "rgba(255,255,255,0.5)",
                            }}
                          >
                            <Icon size={16} />
                          </Box>
                          <Box sx={{ minWidth: 0 }}>
                            <Typography
                              sx={{
                                fontSize: "0.66rem",
                                fontWeight: 700,
                                color: isActive
                                  ? node.color
                                  : "rgba(255,255,255,0.4)",
                                lineHeight: 1.1,
                              }}
                            >
                              PASSO {node.step}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "0.8rem",
                                fontWeight: 700,
                                color: isActive
                                  ? "#fff"
                                  : "rgba(255,255,255,0.65)",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {node.label}
                            </Typography>
                          </Box>
                        </Stack>
                      </Box>
                    );
                  })}
                </Box>
              </Box>

              {/* 2. SELETOR DE CENÁRIOS REAIS */}
              <Box sx={{ mb: { xs: 1.4, sm: 2 } }}>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    p: 0.45,
                    borderRadius: "11px",
                    bgcolor: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {WORKSPACE_SCENARIOS.map((scenario) => {
                    const Icon = scenario.icon;
                    const isSelected = scenario.id === activeScenarioId;
                    const shortLabel =
                      scenario.id === "organize"
                        ? "Organizar"
                        : scenario.id === "sell"
                        ? "Vender"
                        : "Sua Arte";
                    return (
                      <Box
                        key={scenario.id}
                        component="button"
                        type="button"
                        onClick={() => {
                          setActiveScenarioId(scenario.id);
                          trackAction({
                            page: "home",
                            section: "hero",
                            action: "switch_scenario",
                            label: scenario.label,
                          });
                        }}
                        sx={{
                          position: "relative",
                          py: { xs: 0.85, sm: 1 },
                          px: { xs: 0.5, sm: 1 },
                          border: "none",
                          background: "transparent",
                          cursor: "pointer",
                          borderRadius: "8px",
                          color: isSelected
                            ? "#fff"
                            : "rgba(228,228,231,0.6)",
                          fontWeight: 700,
                          fontSize: { xs: "0.75rem", sm: "0.8rem" },
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 0.6,
                          zIndex: 1,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {isSelected && (
                          <motion.div
                            layoutId="heroScenarioActiveTab"
                            transition={{
                              type: "spring",
                              stiffness: 380,
                              damping: 30,
                            }}
                            style={{
                              position: "absolute",
                              inset: 0,
                              borderRadius: 8,
                              background: "rgba(124, 58, 237, 0.24)",
                              border: `1px solid ${scenario.accent}66`,
                              zIndex: -1,
                            }}
                          />
                        )}
                        <Icon
                          size={14}
                          color={isSelected ? scenario.accent : "currentColor"}
                        />
                        <Box
                          component="span"
                          sx={{ display: { xs: "inline", sm: "none" } }}
                        >
                          {shortLabel}
                        </Box>
                        <Box
                          component="span"
                          sx={{ display: { xs: "none", sm: "inline" } }}
                        >
                          {scenario.label}
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </Box>

              {/* 3. SIMULADOR INTERATIVO EM POUCOS CLIQUES */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeScenario.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Box
                    sx={{
                      p: { xs: 1.4, sm: 2 },
                      borderRadius: "14px",
                      bgcolor: "rgba(5,5,7,0.75)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      alignItems={{ xs: "stretch", sm: "center" }}
                      justifyContent="space-between"
                      spacing={1.2}
                      sx={{ mb: 1.5 }}
                    >
                      <Box sx={{ textAlign: "left" }}>
                        <Typography
                          sx={{
                            color: "#fff",
                            fontWeight: 800,
                            fontSize: { xs: "0.88rem", sm: "0.95rem" },
                            lineHeight: 1.2,
                          }}
                        >
                          {activeScenario.headline}
                        </Typography>
                        <Typography
                          sx={{
                            color: "rgba(228,228,231,0.62)",
                            fontSize: { xs: "0.74rem", sm: "0.78rem" },
                            mt: 0.25,
                          }}
                        >
                          {activeScenario.subline}
                        </Typography>
                      </Box>

                      {/* Botão Interativo "1 Clique" */}
                      <motion.button
                        type="button"
                        onClick={toggleSimulation}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.96 }}
                        style={{
                          border: `1px solid ${
                            isCurrentDone
                              ? "#34D39988"
                              : `${activeScenario.accent}77`
                          }`,
                          background: isCurrentDone
                            ? "rgba(52, 211, 153, 0.16)"
                            : "rgba(124, 58, 237, 0.2)",
                          color: "#fff",
                          borderRadius: 9,
                          padding: "8px 12px",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 6,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {isCurrentDone ? (
                          <>
                            <TbRefresh size={14} color="#34D399" />
                            <span>{activeScenario.actionDone}</span>
                          </>
                        ) : (
                          <>
                            <TbPointer size={14} color={activeScenario.accent} />
                            <span>{activeScenario.actionIdle}</span>
                          </>
                        )}
                      </motion.button>
                    </Stack>

                    {/* CENÁRIO A: ORGANIZAR ROTINA */}
                    {activeScenario.id === "organize" && (
                      <Stack spacing={0.85}>
                        {ORGANIZE_ITEMS.map((item, idx) => (
                          <motion.div
                            key={item.id}
                            layout
                            transition={{
                              type: "spring",
                              stiffness: 320,
                              damping: 26,
                              delay: idx * 0.04,
                            }}
                            style={{
                              display: idx === 2 ? undefined : "block",
                            }}
                          >
                            <Box
                              onClick={toggleSimulation}
                              sx={{
                                display:
                                  idx === 2
                                    ? { xs: "none", sm: "flex" }
                                    : "flex",
                                p: { xs: 0.95, sm: 1.15 },
                                borderRadius: "10px",
                                alignItems: "center",
                                justifyContent: "space-between",
                                cursor: "pointer",
                                bgcolor: isCurrentDone
                                  ? "rgba(52, 211, 153, 0.07)"
                                  : "rgba(255,255,255,0.025)",
                                border: "1px solid",
                                borderColor: isCurrentDone
                                  ? "rgba(52, 211, 153, 0.28)"
                                  : "rgba(255,255,255,0.06)",
                                transition: "all 220ms ease",
                              }}
                            >
                              <Stack
                                direction="row"
                                alignItems="center"
                                spacing={1}
                              >
                                <Box
                                  sx={{
                                    width: 22,
                                    height: 22,
                                    borderRadius: "6px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    bgcolor: isCurrentDone
                                      ? "rgba(52,211,153,0.2)"
                                      : "rgba(255,255,255,0.06)",
                                    color: isCurrentDone
                                      ? "#34D399"
                                      : "rgba(255,255,255,0.45)",
                                    flexShrink: 0,
                                  }}
                                >
                                  <TbCheck size={13} />
                                </Box>
                                <Box sx={{ textAlign: "left" }}>
                                  <Typography
                                    sx={{
                                      color: "#fff",
                                      fontWeight: 700,
                                      fontSize: { xs: "0.78rem", sm: "0.82rem" },
                                      lineHeight: 1.15,
                                    }}
                                  >
                                    {item.client}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      color: "rgba(228,228,231,0.58)",
                                      fontSize: { xs: "0.7rem", sm: "0.73rem" },
                                    }}
                                  >
                                    {item.task} · {item.time}
                                  </Typography>
                                </Box>
                              </Stack>

                              <Typography
                                sx={{
                                  fontSize: { xs: "0.68rem", sm: "0.72rem" },
                                  fontWeight: 700,
                                  color: isCurrentDone
                                    ? "#34D399"
                                    : "#FBBF24",
                                  pl: 1,
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {isCurrentDone
                                  ? item.doneStatus
                                  : item.idleStatus}
                              </Typography>
                            </Box>
                          </motion.div>
                        ))}
                      </Stack>
                    )}

                    {/* CENÁRIO B: VENDER PRODUTOS */}
                    {activeScenario.id === "sell" && (
                      <Box
                        onClick={toggleSimulation}
                        sx={{
                          display: "grid",
                          gridTemplateColumns: { xs: "1fr", sm: "1.1fr 0.9fr" },
                          gap: 1,
                          cursor: "pointer",
                          textAlign: "left",
                        }}
                      >
                        <Box
                          sx={{
                            p: 1.25,
                            borderRadius: "11px",
                            bgcolor: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.07)",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "0.68rem",
                              color: "#34D399",
                              fontWeight: 700,
                              textTransform: "uppercase",
                            }}
                          >
                            Vitrine Direta
                          </Typography>
                          <Typography
                            sx={{
                              color: "#fff",
                              fontWeight: 800,
                              fontSize: "0.86rem",
                              mt: 0.3,
                            }}
                          >
                            Kit Café Especial · Torra Artesanal
                          </Typography>
                          <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{ mt: 1 }}
                          >
                            <Typography
                              sx={{
                                color: "#fff",
                                fontWeight: 800,
                                fontSize: "0.88rem",
                              }}
                            >
                              R$ 89,00
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "0.72rem",
                                fontWeight: 700,
                                color: isCurrentDone ? "#34D399" : "#A78BFA",
                              }}
                            >
                              {isCurrentDone
                                ? "Pagamento aprovado"
                                : "Pronto para pedir"}
                            </Typography>
                          </Stack>
                        </Box>

                        <Box
                          sx={{
                            p: 1.25,
                            borderRadius: "11px",
                            bgcolor: isCurrentDone
                              ? "rgba(52,211,153,0.1)"
                              : "rgba(255,255,255,0.02)",
                            border: "1px solid",
                            borderColor: isCurrentDone
                              ? "rgba(52,211,153,0.35)"
                              : "rgba(255,255,255,0.07)",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                          }}
                        >
                          <Typography
                            sx={{
                              color: "#fff",
                              fontWeight: 800,
                              fontSize: "0.82rem",
                            }}
                          >
                            {isCurrentDone
                              ? "Pedido #204 pronto para envio"
                              : "Cliente escolhe e fecha em 1 tela"}
                          </Typography>
                          <Box
                            sx={{
                              mt: 1,
                              height: 6,
                              borderRadius: 3,
                              bgcolor: "rgba(255,255,255,0.08)",
                              overflow: "hidden",
                            }}
                          >
                            <motion.div
                              animate={{
                                width: isCurrentDone ? "100%" : "42%",
                              }}
                              transition={{
                                type: "spring",
                                stiffness: 220,
                                damping: 24,
                              }}
                              style={{
                                height: "100%",
                                background:
                                  "linear-gradient(90deg, #7C3AED, #34D399)",
                              }}
                            />
                          </Box>
                        </Box>
                      </Box>
                    )}

                    {/* CENÁRIO C: MOSTRAR SUA ARTE / MARCA (Proporção fixa sem pulos) */}
                    {activeScenario.id === "art" && (
                      <Box
                        onClick={toggleSimulation}
                        sx={{
                          display: "grid",
                          gridTemplateColumns: { xs: "1fr", sm: "1.15fr 0.85fr" },
                          gap: 1,
                          cursor: "pointer",
                          textAlign: "left",
                        }}
                      >
                        <Box
                          sx={{
                            p: 1.3,
                            height: "100%",
                            minHeight: { xs: 88, sm: 108 },
                            borderRadius: "11px",
                            background: isCurrentDone
                              ? "linear-gradient(135deg, rgba(52,211,153,0.22) 0%, rgba(124,58,237,0.32) 100%)"
                              : "linear-gradient(135deg, rgba(124,58,237,0.35) 0%, rgba(56,189,248,0.22) 100%)",
                            border: "1px solid",
                            borderColor: isCurrentDone
                              ? "rgba(52,211,153,0.45)"
                              : "rgba(167,139,250,0.35)",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            transition: "all 220ms ease",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "0.66rem",
                              fontWeight: 700,
                              color: isCurrentDone ? "#34D399" : "#E0F2FE",
                              textTransform: "uppercase",
                            }}
                          >
                            Portfólio Autoral
                          </Typography>
                          <Typography
                            sx={{
                              color: "#fff",
                              fontWeight: 800,
                              fontSize: { xs: "0.8rem", sm: "0.86rem" },
                              lineHeight: 1.2,
                            }}
                          >
                            {isCurrentDone
                              ? "Destaque em tela cheia + orçamento"
                              : "Galeria para valorizar cada detalhe"}
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            p: 1.3,
                            height: "100%",
                            minHeight: { xs: 88, sm: 108 },
                            borderRadius: "11px",
                            bgcolor: isCurrentDone
                              ? "rgba(52,211,153,0.08)"
                              : "rgba(255,255,255,0.03)",
                            border: "1px solid",
                            borderColor: isCurrentDone
                              ? "rgba(52,211,153,0.3)"
                              : "rgba(255,255,255,0.08)",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            transition: "all 220ms ease",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "0.72rem",
                              color: "rgba(228,228,231,0.7)",
                              fontWeight: 600,
                            }}
                          >
                            {isCurrentDone
                              ? "Contato integrado"
                              : "Feito sob medida"}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "0.75rem",
                              fontWeight: 700,
                              color: isCurrentDone ? "#34D399" : "#38BDF8",
                            }}
                          >
                            {isCurrentDone
                              ? "Visitante vira cliente"
                              : "Toque para destacar"}
                          </Typography>
                        </Box>
                      </Box>
                    )}
                  </Box>
                </motion.div>
              </AnimatePresence>

              {/* 4. RODAPÉ DO PALCO: Visível apenas de Tablet/Desktop em diante para evitar repetição de fotos no Mobile */}
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                spacing={1.2}
                sx={{
                  display: { xs: "none", sm: "flex" },
                  mt: 2,
                  pt: 1.6,
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Stack direction="row">
                    {members.slice(0, 3).map((member, idx) => (
                      <Box
                        key={member.id || idx}
                        component="img"
                        src={member.image}
                        alt={member.name}
                        onClick={() => handleSelectMember(member)}
                        sx={{
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          objectFit: "cover",
                          border: "1.5px solid #0A0A0A",
                          ml: idx === 0 ? 0 : -0.8,
                          cursor: "pointer",
                        }}
                      />
                    ))}
                  </Stack>
                  <Typography
                    sx={{
                      color: "rgba(228,228,231,0.68)",
                      fontSize: "0.76rem",
                    }}
                  >
                    Desenvolvido pela nossa equipe sem modelos prontos
                  </Typography>
                </Stack>

                <Box
                  component={RouterLink}
                  to="/sobre"
                  onClick={() =>
                    trackAction({
                      page: "home",
                      section: "hero",
                      action: "click_stage_about_link",
                      label: "Conhecer quem faz",
                    })
                  }
                  sx={{
                    color: "#A78BFA",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.4,
                    "&:hover": { color: "#DDD6FE" },
                  }}
                >
                  <span>Conhecer quem faz</span>
                  <TbArrowUpRight size={15} />
                </Box>
              </Stack>
            </Box>
          </MotionBox>
        </Box>
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
