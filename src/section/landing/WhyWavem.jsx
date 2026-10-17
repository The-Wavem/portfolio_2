import { useRef, useState } from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  TbArrowRight,
  TbSparkles,
  TbCheck,
  TbBolt,
  TbTrendingUp,
  TbClick,
} from "react-icons/tb";

import GlowButton from "@/components/ui/GlowButton";
import { trackAction } from "@/service/analytics/tracking.service";
import styles from "./WhyWavem.module.css";

const STORY_CHECKPOINTS = [
  {
    id: "custom",
    metric: "100% Seu",
    title: "Painel WEM feito do zero para a sua rotina",
    desc: "Sem funções inúteis e sem mensalidades de aluguel.",
    color: "#A78BFA",
  },
  {
    id: "speed",
    metric: "1.2s",
    title: "Velocidade que não deixa o cliente desistir",
    desc: "Sites comuns perdem 53% dos acessos após 3s (Google Research).",
    color: "#38BDF8",
  },
  {
    id: "clicks",
    metric: "2 Cliques",
    title: "Autonomia total sobre textos, fotos e estoque",
    desc: "Você edita o site e acompanha métricas sem chamar programador.",
    color: "#34D399",
  },
];

const SPATIAL_MODES = [
  {
    id: "growth",
    label: "Evolução WEM",
    accent: "#A78BFA",
    headline: "Do improviso nas planilhas ao controle em tempo real",
    kpis: [
      {
        value: "+118%",
        label: "Conversões rastreadas",
        sub: "Saiba qual botão traz mais clientes",
        color: "#34D399",
        icon: TbTrendingUp,
      },
      {
        value: "96.2%",
        label: "Retenção ativa",
        sub: "Navegação fluida sem travamentos",
        color: "#C4B5FD",
        icon: TbBolt,
      },
      {
        value: "46h/mês",
        label: "Tempo economizado",
        sub: "Operação organizada em 2 cliques",
        color: "#38BDF8",
        icon: TbClick,
      },
    ],
    curvePath:
      "M 24 198 C 105 192, 165 156, 248 122 C 330 88, 405 58, 516 32",
    areaPath:
      "M 24 198 C 105 192, 165 156, 248 122 C 330 88, 405 58, 516 32 L 516 224 L 24 224 Z",
    baselinePath:
      "M 24 202 C 140 200, 260 205, 380 198 C 440 195, 480 200, 516 196",
    baselineLabel: "Operação manual / Planilhas soltas",
    nodes: [
      {
        x: 78,
        y: 186,
        tag: "Início",
        val: "Caos Manual",
        status: "Planilhas e mensagens perdidas",
        color: "#A78BFA",
      },
      {
        x: 212,
        y: 136,
        tag: "Mês 1",
        val: "+42% Controle",
        status: "Painel WEM centralizando pedidos",
        color: "#A78BFA",
      },
      {
        x: 354,
        y: 80,
        tag: "Mês 2",
        val: "+86% Agilidade",
        status: "Cliente edita tudo em 2 cliques",
        color: "#38BDF8",
      },
      {
        x: 462,
        y: 41,
        tag: "Escala",
        val: "+118% Conversão",
        status: "Métricas claras e vendas no automático",
        color: "#34D399",
      },
    ],
  },
  {
    id: "speed",
    label: "Retenção 1.2s vs 3s",
    accent: "#38BDF8",
    headline: "A cada segundo de lentidão, o cliente fecha a aba",
    kpis: [
      {
        value: "1.2s",
        label: "Tempo Wavem",
        sub: "Código limpo sem plugins pesados",
        color: "#38BDF8",
        icon: TbBolt,
      },
      {
        value: "-53%",
        label: "Perda após 3s",
        sub: "Fonte: Google Mobile Research",
        color: "#FB7185",
        icon: TbTrendingUp,
      },
      {
        value: "75%",
        label: "Credibilidade",
        sub: "Julgam a marca pelo visual (Stanford)",
        color: "#C4B5FD",
        icon: TbSparkles,
      },
    ],
    curvePath:
      "M 24 48 L 168 48 C 225 48, 275 76, 338 126 C 398 172, 452 196, 516 204",
    areaPath:
      "M 24 48 L 168 48 C 225 48, 275 76, 338 126 C 398 172, 452 196, 516 204 L 516 224 L 24 224 Z",
    baselinePath: "M 24 48 L 516 48",
    baselineLabel: "Zona de retenção ideal Wavem (96%+)",
    nodes: [
      {
        x: 78,
        y: 48,
        tag: "0.8s",
        val: "Instantâneo",
        status: "Abertura imediata no celular",
        color: "#34D399",
      },
      {
        x: 184,
        y: 48,
        tag: "1.2s · Wavem",
        val: "96% Retenção",
        status: "Cliente navega e compra sem travar",
        color: "#38BDF8",
      },
      {
        x: 332,
        y: 123,
        tag: "2.5s · Comum",
        val: "Queda Brusca",
        status: "Templates prontos cheios de plugins",
        color: "#FBBF24",
      },
      {
        x: 462,
        y: 197,
        tag: "3.5s+ · Lento",
        val: "53% Abandono",
        status: "Metade dos anúncios jogados fora",
        color: "#FB7185",
      },
    ],
  },
];

const LIVE_CMS_ACTIONS = [
  {
    id: "promo",
    label: "Destaque da vitrine",
    before: "Vitrine padrão",
    after: "No ar em 1 clique",
  },
  {
    id: "stock",
    label: "Agenda e estoque",
    before: "Planilha manual",
    after: "Sincronizado ao vivo",
  },
  {
    id: "pixel",
    label: "Origem de clientes",
    before: "Sem rastreio",
    after: "Rastreado pela WEM",
  },
];

export default function WhyWavem() {
  const sectionRef = useRef(null);
  const [modeId, setModeId] = useState("growth");
  const [activeNodeIdx, setActiveNodeIdx] = useState(3);
  const [activeActions, setActiveActions] = useState({
    promo: true,
    stock: true,
    pixel: false,
  });

  // Scroll-driven choreography para elementos que atravessam a tela
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  // Movimento horizontal da marca d'água espacial e das ondas de fundo conforme o scroll
  const watermarkX = useTransform(smoothScroll, [0, 1], ["12%", "-18%"]);
  const waveRibbonPathLength = useTransform(
    smoothScroll,
    [0.08, 0.58],
    [0, 1]
  );
  const leftLineProgress = useTransform(smoothScroll, [0.15, 0.65], [0, 1]);

  const currentMode =
    SPATIAL_MODES.find((m) => m.id === modeId) || SPATIAL_MODES[0];
  const selectedNode =
    currentMode.nodes[activeNodeIdx] ||
    currentMode.nodes[currentMode.nodes.length - 1];

  const toggleAction = (id) => {
    setActiveActions((prev) => ({ ...prev, [id]: !prev[id] }));
    trackAction({
      page: "home",
      section: "why_wavem_spatial",
      action: "toggle_live_cms_pill",
      label: id,
    });
  };

  return (
    <Box
      ref={sectionRef}
      component="section"
      id="por-que-wavem"
      className={styles.section}
    >
      {/* 1. TIPOGRAFIA GIGANTE ESPACIAL QUE ATRAVESSA O FUNDO COM A ROLAGEM DO MOUSE */}
      <motion.div
        aria-hidden
        style={{ x: watermarkX }}
        className={styles.spatialWatermark}
      >
        WEM · ENGENHARIA DE MÉTRICAS · 2 CLIQUES · AUTONOMIA
      </motion.div>

      {/* 2. FEIXE DE ONDA VETORIAL DE PONTA A PONTA DA TELA (DESFOCADO NO PLANO DE FUNDO) */}
      <div className={styles.fullBleedWaveContainer} aria-hidden>
        <svg
          viewBox="0 0 1600 500"
          preserveAspectRatio="none"
          className={styles.fullBleedWaveSvg}
        >
          <defs>
            <linearGradient
              id="fullScreenBeamGrad"
              x1="0%"
              y1="50%"
              x2="100%"
              y2="50%"
            >
              <stop offset="0%" stopColor="#7C3AED" stopOpacity="0" />
              <stop offset="25%" stopColor="#7C3AED" stopOpacity="0.32" />
              <stop offset="58%" stopColor="#A78BFA" stopOpacity="0.45" />
              <stop offset="85%" stopColor="#38BDF8" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#34D399" stopOpacity="0" />
            </linearGradient>
          </defs>

          <path
            d="M -40 390 C 340 410, 620 260, 960 280 C 1240 296, 1420 150, 1640 110"
            fill="none"
            stroke="rgba(167, 139, 250, 0.08)"
            strokeWidth="2"
            strokeDasharray="6 10"
          />

          <motion.path
            d="M -40 390 C 340 410, 620 260, 960 280 C 1240 296, 1420 150, 1640 110"
            fill="none"
            stroke="url(#fullScreenBeamGrad)"
            strokeWidth="4.5"
            style={{ pathLength: waveRibbonPathLength }}
          />
        </svg>
      </div>

      {/* Luzes Atmosféricas Abertas */}
      <div className={styles.ambientGlowLeft} aria-hidden />
      <div className={styles.ambientGlowRight} aria-hidden />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        <div className={styles.splitGrid}>
          {/* COLUNA ESQUERDA: NARRATIVA ABERTA CONECTADA À LINHA DE LUZ (ZERO CARDS) */}
          <div className={styles.textColumnWrapper}>
            <svg
              className={styles.connectorLineSvg}
              viewBox="0 0 16 460"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <defs>
                <linearGradient
                  id="wavemConnectorGrad"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#A78BFA" stopOpacity="1" />
                  <stop offset="55%" stopColor="#7C3AED" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#34D399" stopOpacity="1" />
                </linearGradient>
              </defs>

              <line
                x1="8"
                y1="6"
                x2="8"
                y2="454"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="1.5"
                strokeDasharray="3 5"
              />


              <motion.line
                x1="8"
                y1="6"
                x2="8"
                y2="454"
                stroke="url(#wavemConnectorGrad)"
                strokeWidth="2.5"
                strokeLinecap="round"
                style={{ pathLength: leftLineProgress }}
              />

            </svg>

            <div className={styles.textColumn}>
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={styles.overtitleRow}
              >
                <span className={styles.overtitle}>
                  WEM · WAVEM ENGENHARIA DE MÉTRICAS
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.06 }}
                className={styles.headline}
              >
                Mais que um site bonito:{" "}
                <span className={styles.headlineHighlight}>
                  o controle do seu negócio em poucos cliques.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.12 }}
                className={styles.description}
              >
                Não entregamos uma caixa-preta nem cobramos mensalidades para
                mudar uma vírgula. Desenhamos do zero, junto com você, o seu{" "}
                <strong>WEM (Wavem Engenharia de Métricas)</strong> para você
                acompanhar métricas reais e gerenciar seu próprio sistema sem
                depender de ninguém.
              </motion.p>

              {/* Marcos Abertos Integrados à Linha Vertical (Sem caixas fechadas!) */}
              <div className={styles.openCheckpointsList}>
                {STORY_CHECKPOINTS.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: 0.16 + idx * 0.08 }}
                    className={styles.openCheckpointRow}
                  >
                    <span
                      className={styles.checkpointNodeDot}
                      style={{
                        backgroundColor: item.color,
                        boxShadow: `0 0 12px ${item.color}`,
                      }}
                    />
                    <span
                      className={styles.checkpointMetric}
                      style={{ color: item.color }}
                    >
                      {item.metric}
                    </span>
                    <div className={styles.checkpointCopy}>
                      <strong className={styles.checkpointTitle}>
                        {item.title}
                      </strong>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.35 }}
                className={styles.ctaWrapper}
              >
                <GlowButton
                  to="/porque-wavem"
                  variant="primary"
                  size="large"
                  endIcon={<TbArrowRight size={18} strokeWidth={1.8} />}
                  onClick={() =>
                    trackAction({
                      page: "home",
                      section: "why_wavem_split",
                      action: "click_discover_effect",
                      label: "Conhecer a Engenharia Wavem",
                    })
                  }
                >
                  Conhecer a Engenharia Wavem
                </GlowButton>
              </motion.div>
            </div>
          </div>

          {/* COLUNA DIREITA: HORIZONTE DE DADOS ABERTO (ZERO CARDS, INTEGRADO AO ESPAÇO) */}
          <div className={styles.openSpatialStage}>
            {/* 1. Seletor Minimalista por Feixe de Luz (Sem borda de caixa) */}
            <div className={styles.openHeaderRow}>
              <div className={styles.openModeSwitcher}>
                {SPATIAL_MODES.map((m) => {
                  const active = m.id === modeId;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => {
                        setModeId(m.id);
                        setActiveNodeIdx(m.id === "growth" ? 3 : 1);
                      }}
                      className={`${styles.openModeBtn} ${
                        active ? styles.openModeBtnActive : ""
                      }`}
                    >
                      <span>{m.label}</span>
                      {active && (
                        <motion.span
                          layoutId="whyWavemOpenLaser"
                          className={styles.openModeLaser}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              <span className={styles.livePulseIndicator}>
                <span className={styles.liveDot} />
                Telemetria WEM
              </span>
            </div>

            {/* 2. Métricas Flutuantes em Espaço Aberto (Tipografia Pura, Zero Card) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`kpis-${currentMode.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={styles.openKpiRow}
              >
                {currentMode.kpis.map((kpi, idx) => {
                  const Icon = kpi.icon;
                  return (
                    <div key={kpi.label} className={styles.openKpiItem}>
                      <div className={styles.openKpiTop}>
                        <span
                          className={styles.openKpiNumber}
                          style={{ color: kpi.color }}
                        >
                          {kpi.value}
                        </span>
                        <Icon size={16} color={kpi.color} style={{ flexShrink: 0 }} />
                      </div>
                      <span className={styles.openKpiTitle}>{kpi.label}</span>
                      <span className={styles.openKpiSub}>{kpi.sub}</span>
                      {idx < currentMode.kpis.length - 1 && (
                        <div className={styles.openKpiDivider} aria-hidden />
                      )}
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>

            {/* 3. O GRÁFICO ESPACIAL FLUTUANDO NO FUNDO DO SITE (COM FEIXES LASER VERTICAIS) */}
            <div className={styles.openChartWrapper}>
              {/* Leitura Dinâmica do Ponto Focado */}
              <div className={styles.liveScannerHud}>
                <div className={styles.scannerHudLeft}>
                  <span
                    className={styles.scannerHudTag}
                    style={{ color: selectedNode.color }}
                  >
                    {selectedNode.tag}
                  </span>
                  <strong className={styles.scannerHudVal}>
                    {selectedNode.val}
                  </strong>
                  <span className={styles.scannerHudStatus}>
                    — {selectedNode.status}
                  </span>
                </div>
              </div>

              <svg
                viewBox="0 0 540 256"
                className={styles.openChartSvg}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Curva espacial interativa de métricas e performance Wavem"
              >
                <defs>
                  <linearGradient
                    id="openSpaceLineGrad"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="#7C3AED" />
                    <stop offset="50%" stopColor="#A78BFA" />
                    <stop
                      offset="100%"
                      stopColor={
                        currentMode.id === "growth" ? "#34D399" : "#FB7185"
                      }
                    />
                  </linearGradient>

                  <linearGradient
                    id="openSpaceAreaGrad"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor={
                        currentMode.id === "growth" ? "#7C3AED" : "#38BDF8"
                      }
                      stopOpacity="0.28"
                    />
                    <stop
                      offset="70%"
                      stopColor="#7C3AED"
                      stopOpacity="0.04"
                    />
                    <stop offset="100%" stopColor="#050505" stopOpacity="0" />
                  </linearGradient>

                  <linearGradient
                    id="laserBeamVertical"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor={selectedNode.color}
                      stopOpacity="0.85"
                    />
                    <stop
                      offset="100%"
                      stopColor={selectedNode.color}
                      stopOpacity="0"
                    />
                  </linearGradient>

                  <filter
                    id="neonCurveGlow"
                    x="-20%"
                    y="-20%"
                    width="140%"
                    height="140%"
                  >
                    <feDropShadow
                      dx="0"
                      dy="6"
                      stdDeviation="8"
                      floodColor="#7C3AED"
                      floodOpacity="0.45"
                    />
                  </filter>
                </defs>

                {/* Linhas de Horizonte Abertas */}
                <line
                  x1="0"
                  y1="64"
                  x2="540"
                  y2="64"
                  stroke="rgba(255,255,255,0.04)"
                  strokeDasharray="2 6"
                />
                <line
                  x1="0"
                  y1="142"
                  x2="540"
                  y2="142"
                  stroke="rgba(255,255,255,0.04)"
                  strokeDasharray="2 6"
                />
                <line
                  x1="0"
                  y1="224"
                  x2="540"
                  y2="224"
                  stroke="rgba(167,139,250,0.18)"
                  strokeWidth="1"
                />

                {/* Linha de Comparação Tracejada */}
                <path
                  d={currentMode.baselinePath}
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="1.5"
                  strokeDasharray="4 5"
                />
                <text
                  x="516"
                  y={currentMode.id === "growth" ? 214 : 38}
                  fill="rgba(228,228,231,0.4)"
                  fontSize="10"
                  textAnchor="end"
                  fontFamily="'Inter', sans-serif"
                >
                  {currentMode.baselineLabel}
                </text>

                {/* Área Luminosa Sob a Curva */}
                <motion.path
                  key={`open-area-${currentMode.id}`}
                  d={currentMode.areaPath}
                  fill="url(#openSpaceAreaGrad)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.45 }}
                />

                {/* Curva Principal com Brilho Neon */}
                <motion.path
                  key={`open-line-${currentMode.id}`}
                  d={currentMode.curvePath}
                  stroke="url(#openSpaceLineGrad)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  filter="url(#neonCurveGlow)"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* Feixe Laser Vertical no Ponto Ativo */}
                <line
                  x1={selectedNode.x}
                  y1={selectedNode.y}
                  x2={selectedNode.x}
                  y2="224"
                  stroke="url(#laserBeamVertical)"
                  strokeWidth="2"
                />

                {/* Nós Interativos na Curva Aberta (Tamanhos travados para zero pulo no hover) */}
                {currentMode.nodes.map((node, idx) => {
                  const isSelected = idx === activeNodeIdx;
                  return (
                    <g
                      key={`${currentMode.id}-node-${idx}`}
                      style={{ cursor: "pointer" }}
                      onMouseEnter={() => setActiveNodeIdx(idx)}
                      onClick={() => setActiveNodeIdx(idx)}
                    >
                      {/* Área de toque invisível */}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="26"
                        fill="transparent"
                      />

                      {/* Anel de foco externo com raio fixo (apenas opacidade muda) */}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="16"
                        stroke={node.color}
                        strokeWidth="1"
                        opacity={isSelected ? 0.38 : 0}
                        className={styles.chartNodeTransition}
                      />

                      {/* Halo luminoso com raio fixo (apenas opacidade muda) */}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="10"
                        fill={node.color}
                        opacity={isSelected ? 0.25 : 0.08}
                        className={styles.chartNodeTransition}
                      />

                      {/* Núcleo do Ponto com raio fixo */}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="5.2"
                        fill={isSelected ? "#FFFFFF" : node.color}
                        stroke={node.color}
                        strokeWidth="2.5"
                        className={styles.chartNodeTransition}
                      />

                      {/* Rótulo Acima do Ponto (fontSize e fontWeight fixos para não pular) */}
                      <text
                        x={node.x}
                        y={node.y - 16}
                        fill={isSelected ? "#FFFFFF" : "rgba(228,228,231,0.62)"}
                        fontSize="11"
                        fontWeight="700"
                        textAnchor="middle"
                        fontFamily="'Inter', sans-serif"
                        className={styles.chartNodeTransition}
                      >
                        {node.val}
                      </text>

                      {/* Rótulo de Tempo abaixo da linha do horizonte (fontSize e fontWeight fixos) */}
                      <text
                        x={node.x}
                        y="244"
                        fill={
                          isSelected ? node.color : "rgba(228,228,231,0.52)"
                        }
                        fontSize="10.8"
                        fontWeight="600"
                        textAnchor="middle"
                        fontFamily="'Inter', sans-serif"
                        className={styles.chartNodeTransition}
                      >
                        {node.tag}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* 4. Trilha Interativa "2 Cliques" Solta no Espaço (Estável sem pulos) */}
            <div className={styles.openCmsStrip}>
              <span className={styles.openCmsStripTitle}>
                Teste a regra dos 2 cliques no seu painel:
              </span>
              <div className={styles.openCmsPillsRow}>
                {LIVE_CMS_ACTIONS.map((act) => {
                  const isOn = Boolean(activeActions[act.id]);
                  return (
                    <button
                      key={act.id}
                      type="button"
                      onClick={() => toggleAction(act.id)}
                      className={`${styles.openCmsTrigger} ${
                        isOn ? styles.openCmsTriggerActive : ""
                      }`}
                    >
                      <span
                        className={styles.openCmsCheck}
                        style={{
                          backgroundColor: isOn
                            ? "#34D399"
                            : "rgba(255,255,255,0.12)",
                          color: isOn ? "#050505" : "rgba(255,255,255,0.5)",
                        }}
                      >
                        <TbCheck size={11} strokeWidth={3} />
                      </span>
                      <span className={styles.openCmsTextGroup}>
                        <strong className={styles.openCmsActionName}>
                          {act.label}
                        </strong>
                        <span
                          className={styles.openCmsActionState}
                          style={{
                            color: isOn
                              ? "#34D399"
                              : "rgba(228,228,231,0.52)",
                          }}
                        >
                          {isOn ? act.after : act.before}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Box>
  );
}
