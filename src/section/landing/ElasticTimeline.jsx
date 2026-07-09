import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useInView,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";
import { Box, Typography, Stack, useTheme, useMediaQuery } from "@mui/material";
import {
  TbCoffee,
  TbPencil,
  TbFileText,
  TbCode,
  TbRocket,
} from "react-icons/tb";
import styles from "./ElasticTimeline.module.css";

const processIconMap = {
  coffee: TbCoffee,
  pencil: TbPencil,
  file: TbFileText,
  code: TbCode,
  rocket: TbRocket,
};

function CardContent({ step, Icon }) {
  return (
    <>
      <Stack direction="row" alignItems="center" spacing={2} mb={2.2}>
        <Box
          sx={{
            p: 1,
            borderRadius: "8px",
            background: "rgba(255,255,255,0.05)",
            color: step.color,
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <Icon size={28} />
        </Box>
        <Box>
          <Typography
            variant="caption"
            sx={{
              color: step.color,
              letterSpacing: 1.8,
              fontWeight: 700,
              textTransform: "uppercase",
              opacity: 0.95,
              fontSize: "0.68rem",
            }}
          >
            {step.subtitle}
          </Typography>
          <Typography
            variant="h5"
            fontWeight={800}
            color="white"
            sx={{ lineHeight: 1.12, letterSpacing: "-0.018em" }}
          >
            {step.title}
          </Typography>
        </Box>
      </Stack>
      <Typography
        variant="body1"
        sx={{
          color: "rgba(228,228,231,0.74)",
          lineHeight: 1.75,
          fontSize: { xs: "0.94rem", md: "0.98rem" },
          letterSpacing: "0.01em",
        }}
      >
        {step.description}
      </Typography>
    </>
  );
}

function TimelineStep({
  step,
  index,
  isMobile,
  waveX,
  waveY,
  totalSteps,
}) {
  const rowRef = useRef(null);
  const isEven = index % 2 === 0;
  const Icon = processIconMap[step.iconKey] ?? TbCode;

  const isActive = useInView(rowRef, {
    margin: "200% 0px -50% 0px",
    once: false,
  });

  const nodeX = useTransform([waveX, waveY], ([cx, cy]) => {
    if (!rowRef.current) return 0;
    const nodeY = rowRef.current.offsetTop + rowRef.current.offsetHeight / 2;
    const distance = Math.abs(nodeY - cy);

    const radius = 90;
    if (distance > radius) return 0;

    const intensity = Math.pow(1 - distance / radius, 2);
    return (cx - 40) * intensity;
  });

  return (
    <div className={styles.timelineRow} ref={rowRef}>
      {!isMobile && isEven ? (
        <div className={styles.contentLeft}>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className={styles.card}
            style={{
              borderColor: isActive ? step.color : "rgba(255,255,255,0.04)",
              boxShadow: isActive
                ? `0 0 34px ${step.color}24`
                : `0 0 0px transparent`,
            }}
          >
            <CardContent step={step} Icon={Icon} />

            <div
              className={styles.connectorLeft}
              style={{
                backgroundColor: isActive ? step.color : "#ffffff",
                opacity: isActive ? 0.8 : 0.15,
                boxShadow: isActive ? `0 0 12px ${step.color}` : "none",
              }}
            />
          </motion.div>
        </div>
      ) : (
        !isMobile && <div className={styles.contentLeft} />
      )}

      <div className={styles.nodeWrapper}>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
          className={styles.node}
          style={{
            x: nodeX,
            borderColor: isActive ? step.color : "rgba(255,255,255,0.1)",
            backgroundColor: isActive ? step.color : "#050505",
            color: isActive ? "#050505" : "rgba(255,255,255,0.4)",
            boxShadow: isActive
              ? `0 0 24px ${step.color}80`
              : `0 4px 16px rgba(0,0,0,0.6)`,
          }}
        >
          {step.id}
        </motion.div>
      </div>

      {isMobile || !isEven ? (
        <div className={styles.contentRight}>
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className={styles.card}
            style={{
              borderColor: isActive ? step.color : "rgba(255,255,255,0.04)",
              boxShadow: isActive
                ? `0 0 34px ${step.color}24`
                : `0 0 0px transparent`,
            }}
          >
            <CardContent step={step} Icon={Icon} />

            <div
              className={styles.connectorRight}
              style={{
                backgroundColor: isActive ? step.color : "#ffffff",
                opacity: isActive ? 0.8 : 0.15,
                boxShadow: isActive ? `0 0 12px ${step.color}` : "none",
              }}
            />
          </motion.div>
        </div>
      ) : (
        !isMobile && <div className={styles.contentRight} />
      )}
    </div>
  );
}

export default function ElasticTimeline({ steps = [] }) {
  const containerRef = useRef(null);
  const [svgHeight, setSvgHeight] = useState(800);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const waveY = useMotionValue(-200);
  const waveX = useMotionValue(40);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setSvgHeight(entry.target.clientHeight);
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // AMBIENT MOTION CONTÍNUO
  useAnimationFrame((t) => {
    if (!svgHeight) return;

    // A onda percorre de cima a baixo ao longo de 2.5 segundos, sumindo nas bordas
    const duration = 5500;
    const padding = 0; // Espaço invisível para a onda entrar e sair fluidamente
    const totalDistance = svgHeight + (padding * 2); 
    
    // Progresso linear de 0 a 1 que repete (sawtooth)
    const progress = (t % duration) / duration;
    
    // Calculamos o Y deslizando da margem superior para a margem inferior
    const cy = -padding + (progress * totalDistance);
    waveY.set(cy);

    // Oscilação rápida no X gerando a onda contida, max 14px
    const pull = Math.sin(t / 150) * 14; 
    waveX.set(40 + pull);
  });

  // CONSTRUÇÃO DO PATH SEGMENTADO (Onda Contínua)
  const pathD = useTransform([waveX, waveY], ([cx, cy]) => {
    const WAVE_RADIUS = 100;

    // Garantimos que a reta conectora nunca ultrapasse o SVG
    const startY = Math.max(0, cy - WAVE_RADIUS);
    const endY = Math.min(svgHeight, cy + WAVE_RADIUS);

    // Damping nas extremidades para que a onda desapareça graciosamente nas pontas do SVG
    const edgeDistance = Math.min(cy, svgHeight - cy);
    const edgeFactor = Math.max(0, Math.min(1, edgeDistance / WAVE_RADIUS));
    
    // Multiplicamos o deslocamento real do X pelo damping
    const dampedCx = 40 + ((cx - 40) * edgeFactor);

    return `M 40 0 L 40 ${startY} Q ${dampedCx} ${cy} 40 ${endY} L 40 ${svgHeight}`;
  });

  return (
    <div
      className={styles.timelineWrapper}
      ref={containerRef}
    >
      <div className={styles.svgContainer}>
        <div className={styles.hitbox} />
        <svg
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          viewBox={`0 0 80 ${svgHeight}`}
          className={styles.svgLine}
        >
          <defs>
            <linearGradient id="neonTimelineGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="50%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
          <motion.path
            d={pathD}
            vectorEffect="non-scaling-stroke"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="2"
          />
          <motion.path
            d={pathD}
            vectorEffect="non-scaling-stroke"
            fill="none"
            stroke="url(#neonTimelineGrad)"
            strokeWidth="4"
            style={{ pathLength: scaleY }}
          />
        </svg>
      </div>

      {steps.map((step, index) => (
        <TimelineStep
          key={step.id}
          step={step}
          index={index}
          isMobile={isMobile}
          waveX={waveX}
          waveY={waveY}
          totalSteps={steps.length}
        />
      ))}
    </div>
  );
}
