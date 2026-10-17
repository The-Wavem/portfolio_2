import { useEffect, useRef, useState } from "react";
import { Box, Container } from "@mui/material";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  TbBrandReact,
  TbBrandFigma,
  TbBrandFramerMotion,
  TbBrandNodejs,
  TbBrandFirebase,
  TbBrandPython,
  TbDatabase,
  TbShieldLock,
} from "react-icons/tb";
import {
  getServicesContent,
  getServicesContentRemote,
} from "@/service/content";
import { trackAction } from "@/service/analytics/tracking.service";
import styles from "./Experience.module.css";

const SYSTEM_LAYERS = [
  {
    id: "interface",
    code: "01 // TELA & INTERAÇÃO",
    shortSvgLabel: "01 · VISUAL & TELA",
    title: "O que o seu cliente vê e sente",
    humanDesc:
      "Telas rápidas, animações que encantam no primeiro segundo e compra sem confusão.",
    color: "#A78BFA",
    techIds: ["figma", "react", "motion"],
    reactorStatus: "Renderizando vitrine fluida em 60fps",
    sourceY: 46,
  },
  {
    id: "wem",
    code: "02 // PAINEL & GESTÃO WEM",
    shortSvgLabel: "02 · PAINEL WEM",
    title: "Onde você controla tudo em 2 cliques",
    humanDesc:
      "Seu painel sob medida para trocar fotos, atualizar catálogo e ver métricas sozinho.",
    color: "#38BDF8",
    techIds: ["react", "firebase", "sql"],
    reactorStatus: "Sincronizando painel WEM em tempo real",
    sourceY: 115,
  },
  {
    id: "engine",
    code: "03 // MOTOR & AUTOMAÇÃO",
    shortSvgLabel: "03 · MOTOR 24H",
    title: "O cérebro invisível que nunca trava",
    humanDesc:
      "Pagamentos automáticos, cálculo de frete, agendamentos e integrações rodando 24h.",
    color: "#34D399",
    techIds: ["node", "python", "sql", "firebase"],
    reactorStatus: "Processando pedidos, APIs e automações",
    sourceY: 185,
  },
  {
    id: "shield",
    code: "04 // BLINDAGEM & ESCALA",
    shortSvgLabel: "04 · BLINDAGEM",
    title: "Segurança bancária no celular e na web",
    humanDesc:
      "Proteção total dos dados da sua empresa, login blindado e estabilidade em picos.",
    color: "#C4B5FD",
    techIds: ["shield", "firebase", "node"],
    reactorStatus: "Criptografia e proteção ativa na nuvem",
    sourceY: 254,
  },
];

const TECH_ECOSYSTEM = [
  {
    id: "figma",
    name: "Figma UI/UX",
    role: "Prototipação viva",
    humanTranslation:
      "Você aprova e testa o visual de cada tela junto com a gente antes do código nascer.",
    color: "#F472B6",
    icon: TbBrandFigma,
    targetX: 525,
    targetY: 36,
  },
  {
    id: "react",
    name: "React 19",
    role: "Telas instantâneas",
    humanTranslation:
      "Faz o seu sistema abrir na hora e trocar de tela sem recarregar a página.",
    color: "#38BDF8",
    icon: TbBrandReact,
    targetX: 635,
    targetY: 62,
  },
  {
    id: "motion",
    name: "Framer Motion",
    role: "Animações fluidas",
    humanTranslation:
      "Cria transições que surpreendem o visitante e destacam a sua marca da concorrência.",
    color: "#A78BFA",
    icon: TbBrandFramerMotion,
    targetX: 525,
    targetY: 102,
  },
  {
    id: "firebase",
    name: "Firebase Cloud",
    role: "Tempo real",
    humanTranslation:
      "Mudou algo no seu painel WEM? Atualiza no celular do cliente no mesmo segundo.",
    color: "#FBBF24",
    icon: TbBrandFirebase,
    targetX: 635,
    targetY: 134,
  },
  {
    id: "node",
    name: "Node.js",
    role: "Motor de alta carga",
    humanTranslation:
      "Conecta pagamentos, WhatsApp e regras do seu negócio sem fila nem lentidão.",
    color: "#34D399",
    icon: TbBrandNodejs,
    targetX: 525,
    targetY: 172,
  },
  {
    id: "python",
    name: "Python",
    role: "Dados & automação",
    humanTranslation:
      "Organiza relatórios inteligentes e tarefas repetitivas para economizar horas da sua semana.",
    color: "#60A5FA",
    icon: TbBrandPython,
    targetX: 635,
    targetY: 204,
  },
  {
    id: "sql",
    name: "SQL & Dados",
    role: "Memória organizada",
    humanTranslation:
      "Guarda clientes, histórico de vendas e estoque com precisão cirúrgica.",
    color: "#818CF8",
    icon: TbDatabase,
    targetX: 525,
    targetY: 242,
  },
  {
    id: "shield",
    name: "Auth & Cloud",
    role: "Blindagem 24/7",
    humanTranslation:
      "Protege o acesso ao seu sistema com a mesma infraestrutura usada por grandes bancos.",
    color: "#C4B5FD",
    icon: TbShieldLock,
    targetX: 635,
    targetY: 268,
  },
];

export default function Experience() {
  const sectionRef = useRef(null);
  const [content, setContent] = useState(() => getServicesContent());
  const [activeLayerId, setActiveLayerId] = useState("interface");
  const [hoveredTechId, setHoveredTechId] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchContent() {
      try {
        const remote = await getServicesContentRemote();
        if (isMounted && remote) {
          setContent(remote);
        }
      } catch {
        // Fallback silencioso para manter segurança em produção
      }
    }
    fetchContent();
    return () => {
      isMounted = false;
    };
  }, []);

  // Scroll-driven motion exclusivamente para os elementos atmosféricos de fundo
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    restDelta: 0.001,
  });

  const watermarkX = useTransform(smoothScroll, [0, 1], ["-14%", "12%"]);
  const bgBeamLength = useTransform(smoothScroll, [0.1, 0.65], [0, 1]);

  const activeLayer =
    SYSTEM_LAYERS.find((l) => l.id === activeLayerId) || SYSTEM_LAYERS[0];
  const focusedTech = hoveredTechId
    ? TECH_ECOSYSTEM.find((t) => t.id === hoveredTechId)
    : null;

  const isTechActive = (techId) => {
    if (hoveredTechId) {
      return hoveredTechId === techId;
    }
    return activeLayer.techIds.includes(techId);
  };

  return (
    <Box
      ref={sectionRef}
      component="section"
      id="dna-tecnico"
      className={styles.section}
    >
      {/* 1. MARCA D'ÁGUA MONUMENTAL DESFOCADA QUE DESLIZA COM O SCROLL */}
      <motion.div
        aria-hidden
        style={{ x: watermarkX }}
        className={styles.spatialWatermark}
      >
        REACT · FIGMA · FRAMER MOTION · NODE.JS · FIREBASE · PYTHON · SQL
      </motion.div>

      {/* 2. CIRCUITO DE FUNDO DESFOCADO (PROFUNDIDADE DE CAMPO) */}
      <div className={styles.bgCircuitContainer} aria-hidden>
        <svg
          viewBox="0 0 1600 520"
          preserveAspectRatio="none"
          className={styles.bgCircuitSvg}
        >
          <defs>
            <linearGradient
              id="dnaBgCircuitGrad"
              x1="0%"
              y1="50%"
              x2="100%"
              y2="50%"
            >
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0" />
              <stop offset="30%" stopColor="#7C3AED" stopOpacity="0.34" />
              <stop offset="65%" stopColor="#A78BFA" stopOpacity="0.42" />
              <stop offset="100%" stopColor="#34D399" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d="M -40 120 C 380 140, 640 360, 1020 320 C 1300 290, 1460 410, 1640 430"
            fill="none"
            stroke="url(#dnaBgCircuitGrad)"
            strokeWidth="4.5"
            style={{ pathLength: bgBeamLength }}
          />
        </svg>
      </div>

      {/* Luzes Atmosféricas */}
      <div className={styles.ambientGlowPurple} aria-hidden />
      <div className={styles.ambientGlowCyan} aria-hidden />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        {/* CABEÇALHO DIRETO E HUMANO */}
        <div className={styles.headerRow}>
          <div>
            <motion.span
              initial={{ opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className={styles.eyebrow}
            >
              {content?.highlightsEyebrow || "NOSSO DNA TÉCNICO"}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className={styles.headline}
            >
              {content?.highlightsTitle || "Mais que ferramentas,"}{" "}
              <span className={styles.headlineHighlight}>
                {content?.highlightsTitleHighlight || "domínio tecnológico."}
              </span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className={styles.headerLead}
          >
            Escolha abaixo <strong>qual parte do seu sistema</strong> quer
            espiar e veja as conexões neurais que a nossa equipe aciona para
            dar vida a ela.
          </motion.p>
        </div>

        {/* PALCO ABERTO: SELETOR COMPACTO (0.66fr) + GRANDE MAPA DE LIGAÇÕES SINÁPTICAS (1.34fr) */}
        <div className={styles.architectureStage}>
          {/* COLUNA ESQUERDA ENXUTA: AS 4 CAMADAS DO SISTEMA */}
          <div className={styles.layersColumn}>
            <span className={styles.layersColumnHint}>
              Camadas do sistema (passe o mouse):
            </span>

            {SYSTEM_LAYERS.map((layer) => {
              const isSelected = layer.id === activeLayer.id;
              return (
                <button
                  key={layer.id}
                  type="button"
                  onMouseEnter={() => {
                    setHoveredTechId(null);
                    setActiveLayerId(layer.id);
                  }}
                  onClick={() => {
                    setHoveredTechId(null);
                    setActiveLayerId(layer.id);
                    trackAction({
                      page: "home",
                      section: "dna_tecnico",
                      action: "select_system_layer",
                      label: layer.id,
                    });
                  }}
                  className={`${styles.layerItemBtn} ${
                    isSelected ? styles.layerItemBtnActive : ""
                  }`}
                >
                  <span className={styles.layerRailTrack} aria-hidden />
                  <span
                    aria-hidden
                    className={styles.layerRailActive}
                    style={{
                      backgroundColor: layer.color,
                      boxShadow: `0 0 14px ${layer.color}`,
                      opacity: isSelected ? 1 : 0,
                      transform: isSelected ? "scaleY(1)" : "scaleY(0.35)",
                    }}
                  />

                  <div className={styles.layerTopBar}>
                    <span
                      className={styles.layerCodeTag}
                      style={{
                        color: isSelected
                          ? layer.color
                          : "rgba(167, 139, 250, 0.55)",
                      }}
                    >
                      {layer.code}
                    </span>
                    <span
                      className={styles.layerTechCount}
                      style={{
                        color: isSelected
                          ? "#FFFFFF"
                          : "rgba(228, 228, 231, 0.42)",
                      }}
                    >
                      {layer.techIds.length} conexões
                    </span>
                  </div>

                  <h3 className={styles.layerTitle}>{layer.title}</h3>
                </button>
              );
            })}
          </div>

          {/* COLUNA DIREITA PROTAGONISTA: GRANDE CIRCUITO DE LIGAÇÕES SINÁPTICAS */}
          <div className={styles.constellationStage}>
            {/* 1. HUD Superior (Altura Fixa: Zero Pulos) */}
            <div className={styles.reactorHudHeader}>
              <div className={styles.reactorHudLeft}>
                <span
                  className={styles.reactorPulseDot}
                  style={{
                    backgroundColor: focusedTech
                      ? focusedTech.color
                      : activeLayer.color,
                    boxShadow: `0 0 10px ${
                      focusedTech ? focusedTech.color : activeLayer.color
                    }`,
                  }}
                />
                <span className={styles.reactorHudTitle}>
                  {focusedTech
                    ? `${focusedTech.name} · ${focusedTech.role}`
                    : activeLayer.reactorStatus}
                </span>
              </div>
            </div>

            {/* 2. GRANDE CIRCUITO SINÁPTICO EM SVG (PROTAGONISTA DA SEÇÃO - 680x300) */}
            <div className={styles.synapseCanvasWrapper}>
              <svg
                viewBox="0 0 680 300"
                className={styles.synapseSvg}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Circuito interativo conectando as camadas do sistema às tecnologias da Wavem"
              >
                <defs>
                  <linearGradient
                    id="synapseActiveBeam"
                    x1="0%"
                    y1="50%"
                    x2="100%"
                    y2="50%"
                  >
                    <stop
                      offset="0%"
                      stopColor={activeLayer.color}
                      stopOpacity="0.95"
                    />
                    <stop offset="48%" stopColor="#7C3AED" stopOpacity="0.95" />
                    <stop
                      offset="100%"
                      stopColor={
                        focusedTech ? focusedTech.color : "#38BDF8"
                      }
                      stopOpacity="1"
                    />
                  </linearGradient>

                  <radialGradient id="coreHubGlow" cx="50%" cy="50%" r="50%">
                    <stop
                      offset="0%"
                      stopColor={
                        focusedTech ? focusedTech.color : activeLayer.color
                      }
                      stopOpacity="0.42"
                    />
                    <stop offset="60%" stopColor="#7C3AED" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#050505" stopOpacity="0" />
                  </radialGradient>

                  <filter
                    id="synapseNeonGlow"
                    x="-20%"
                    y="-20%"
                    width="140%"
                    height="140%"
                  >
                    <feDropShadow
                      dx="0"
                      dy="0"
                      stdDeviation="4"
                      floodColor="#A78BFA"
                      floodOpacity="0.55"
                    />
                  </filter>
                </defs>

                {/* Linhas Guia Espaciais de Fundo */}
                <line
                  x1="0"
                  y1="150"
                  x2="680"
                  y2="150"
                  stroke="rgba(255,255,255,0.035)"
                  strokeDasharray="3 7"
                />
                <circle
                  cx="280"
                  cy="150"
                  r="112"
                  stroke="rgba(167,139,250,0.04)"
                  strokeDasharray="2 8"
                />

                {/* FEIXES DA ESQUERDA (4 Camadas -> Núcleo Central WEM em x=280, y=150) */}
                {SYSTEM_LAYERS.map((layer) => {
                  const isActive = layer.id === activeLayer.id;
                  const pathD = `M 22 ${layer.sourceY} C 135 ${layer.sourceY}, 175 150, 280 150`;
                  return (
                    <g
                      key={`left-beam-${layer.id}`}
                      style={{ cursor: "pointer" }}
                      onMouseEnter={() => {
                        setHoveredTechId(null);
                        setActiveLayerId(layer.id);
                      }}
                      onClick={() => {
                        setHoveredTechId(null);
                        setActiveLayerId(layer.id);
                      }}
                    >
                      {/* Trilha base inativa */}
                      <path
                        d={pathD}
                        stroke="rgba(255,255,255,0.07)"
                        strokeWidth="1.6"
                      />

                      {/* Feixe principal aceso */}
                      <path
                        d={pathD}
                        stroke={layer.color}
                        strokeWidth="3"
                        filter="url(#synapseNeonGlow)"
                        opacity={isActive ? 0.92 : 0}
                        style={{ transition: "opacity 0.22s ease" }}
                      />

                      {/* Pulso de energia correndo pelo cabo ativo */}
                      <path
                        d={pathD}
                        stroke="#FFFFFF"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        opacity={isActive ? 0.85 : 0}
                        className={styles.synapseFlowPulse}
                      />

                      {/* Halo e Nó de Origem */}
                      <circle
                        cx="22"
                        cy={layer.sourceY}
                        r="12"
                        fill={layer.color}
                        opacity={isActive ? 0.25 : 0.04}
                        style={{ transition: "opacity 0.22s ease" }}
                      />
                      <circle
                        cx="22"
                        cy={layer.sourceY}
                        r="5.5"
                        fill={isActive ? "#FFFFFF" : "rgba(255,255,255,0.22)"}
                        stroke={isActive ? layer.color : "transparent"}
                        strokeWidth="2.5"
                        style={{ transition: "fill 0.2s ease, stroke 0.2s ease" }}
                      />
                      <text
                        x="38"
                        y={layer.sourceY + 4}
                        fill={
                          isActive ? "#FFFFFF" : "rgba(228,228,231,0.4)"
                        }
                        fontSize="10"
                        fontWeight="700"
                        fontFamily="'Fira Code', monospace"
                        style={{ transition: "fill 0.2s ease" }}
                      >
                        {layer.shortSvgLabel}
                      </text>
                    </g>
                  );
                })}

                {/* FEIXES DA DIREITA (Núcleo Central WEM x=280, y=150 -> 8 Tecnologias) */}
                {TECH_ECOSYSTEM.map((tech) => {
                  const active = isTechActive(tech.id);
                  const pathD = `M 280 150 C 390 150, 415 ${tech.targetY}, ${tech.targetX} ${tech.targetY}`;
                  return (
                    <g
                      key={`right-beam-${tech.id}`}
                      style={{ cursor: "pointer" }}
                      onMouseEnter={() => setHoveredTechId(tech.id)}
                      onMouseLeave={() => setHoveredTechId(null)}
                      onClick={() =>
                        setHoveredTechId((prev) =>
                          prev === tech.id ? null : tech.id
                        )
                      }
                    >
                      {/* Área de clique invisível no nó */}
                      <circle
                        cx={tech.targetX}
                        cy={tech.targetY}
                        r="24"
                        fill="transparent"
                      />

                      {/* Trilha tracejada inativa */}
                      <path
                        d={pathD}
                        stroke="rgba(255,255,255,0.065)"
                        strokeWidth="1.4"
                        strokeDasharray="3 6"
                      />

                      {/* Feixe sináptico iluminado */}
                      <path
                        d={pathD}
                        stroke="url(#synapseActiveBeam)"
                        strokeWidth="2.6"
                        filter="url(#synapseNeonGlow)"
                        opacity={active ? 0.95 : 0}
                        style={{ transition: "opacity 0.22s ease" }}
                      />

                      {/* Pulso de dados viajando até a tecnologia */}
                      <path
                        d={pathD}
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        opacity={active ? 0.8 : 0}
                        className={styles.synapseFlowPulse}
                      />

                      {/* Anel externo do nó tecnológico */}
                      <circle
                        cx={tech.targetX}
                        cy={tech.targetY}
                        r="15"
                        stroke={tech.color}
                        strokeWidth="1"
                        opacity={active ? 0.42 : 0}
                        style={{ transition: "opacity 0.22s ease" }}
                      />

                      {/* Halo luminoso do nó */}
                      <circle
                        cx={tech.targetX}
                        cy={tech.targetY}
                        r="10.5"
                        fill={tech.color}
                        opacity={active ? 0.26 : 0.05}
                        style={{ transition: "opacity 0.22s ease" }}
                      />

                      {/* Núcleo do nó tecnológico */}
                      <circle
                        cx={tech.targetX}
                        cy={tech.targetY}
                        r="5.2"
                        fill={active ? "#FFFFFF" : "rgba(255,255,255,0.22)"}
                        stroke={active ? tech.color : "transparent"}
                        strokeWidth="2.5"
                        style={{
                          transition: "fill 0.22s ease, stroke 0.22s ease",
                        }}
                      />

                      {/* Nome da Tecnologia e Papel no Sistema */}
                      <text
                        x={tech.targetX - 14}
                        y={tech.targetY - 9}
                        fill={
                          active ? "#FFFFFF" : "rgba(228,228,231,0.36)"
                        }
                        fontSize="10.5"
                        fontWeight="800"
                        textAnchor="end"
                        fontFamily="'Inter', sans-serif"
                        style={{ transition: "fill 0.22s ease" }}
                      >
                        {tech.name}
                      </text>
                    </g>
                  );
                })}

                {/* NÚCLEO CENTRAL WAVEM (x=280, y=150) */}
                <circle cx="280" cy="150" r="64" fill="url(#coreHubGlow)" />
                <circle
                  cx="280"
                  cy="150"
                  r="38"
                  stroke={focusedTech ? focusedTech.color : activeLayer.color}
                  strokeWidth="1.3"
                  strokeDasharray="7 7"
                  opacity="0.85"
                  className={styles.coreOrbitRing}
                />
                <circle
                  cx="280"
                  cy="150"
                  r="30"
                  stroke="#7C3AED"
                  strokeWidth="1"
                  strokeDasharray="3 6"
                  opacity="0.6"
                  className={styles.coreOrbitRingInner}
                />
                <circle
                  cx="280"
                  cy="150"
                  r="23"
                  fill="#09080F"
                  stroke={focusedTech ? focusedTech.color : activeLayer.color}
                  strokeWidth="2.2"
                  style={{ transition: "stroke 0.22s ease" }}
                />
                <text
                  x="280"
                  y="153.5"
                  fill="#FFFFFF"
                  fontSize="10.5"
                  fontWeight="900"
                  textAnchor="middle"
                  fontFamily="'Inter', sans-serif"
                  letterSpacing="0.08em"
                >
                  WEM
                </text>
              </svg>
            </div>

            {/* 3. BARRA COMPACTA DE MOTORES (Apenas 36px de altura para complementar o circuito) */}
            <div
              className={styles.compactTechStrip}
              onMouseLeave={() => setHoveredTechId(null)}
            >
              {TECH_ECOSYSTEM.map((tech) => {
                const Icon = tech.icon;
                const highlighted = isTechActive(tech.id);
                return (
                  <button
                    key={tech.id}
                    type="button"
                    onMouseEnter={() => setHoveredTechId(tech.id)}
                    onFocus={() => setHoveredTechId(tech.id)}
                    onClick={() => {
                      setHoveredTechId((prev) =>
                        prev === tech.id ? null : tech.id
                      );
                      trackAction({
                        page: "home",
                        section: "dna_tecnico",
                        action: "inspect_tech_node",
                        label: tech.name,
                      });
                    }}
                    className={`${styles.compactTechBtn} ${
                      highlighted
                        ? styles.compactTechBtnActive
                        : styles.compactTechBtnDimmed
                    }`}
                    style={{
                      borderBottomColor: highlighted
                        ? tech.color
                        : "rgba(255, 255, 255, 0.07)",
                    }}
                  >
                    <Icon
                      size={14}
                      color={
                        highlighted ? tech.color : "rgba(228, 228, 231, 0.45)"
                      }
                      style={{ flexShrink: 0 }}
                    />
                    <span className={styles.compactTechName}>{tech.name}</span>
                  </button>
                );
              })}
            </div>

            {/* 4. BARRA DE TRADUÇÃO HUMANA (Estrutura em 2 linhas fixas: Zero Pulos!) */}
            <div className={styles.humanTranslatorStrip}>
              <div className={styles.translatorHeaderRow}>
                <span className={styles.translatorTag}>
                  {focusedTech ? focusedTech.name : "NA PRÁTICA"}
                </span>
                <span className={styles.translatorContext}>
                  {focusedTech ? focusedTech.role : activeLayer.title}
                </span>
              </div>
              <div className={styles.translatorText}>
                {focusedTech
                  ? focusedTech.humanTranslation
                  : activeLayer.humanDesc}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Box>
  );
}