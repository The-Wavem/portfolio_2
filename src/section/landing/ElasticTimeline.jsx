import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useInView,
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
  ctrlX,
  ctrlY,
  svgHeight,
  totalSteps,
}) {
  const rowRef = useRef(null);
  const isEven = index % 2 === 0;
  const Icon = processIconMap[step.iconKey] ?? TbCode;

  const isActive = useInView(rowRef, {
    margin: "200% 0px -50% 0px",
    once: false,
  });

  const nodeX = useTransform([ctrlX, ctrlY], ([cx, cy]) => {
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

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // FÍSICA FLUIDA (Onda Aquática):
  const ctrlX = useSpring(40, { stiffness: 80, damping: 30, mass: 1 });
  // Y precisa ser responsivo para a onda acompanhar a altura do cursor rapidamente sem delay indesejado
  const ctrlY = useSpring(svgHeight / 2, { stiffness: 600, damping: 25 });

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const height = entry.target.clientHeight;
        setSvgHeight(height);
        ctrlY.set(height / 2);
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [ctrlY]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const lineX = isMobile ? 40 : rect.width / 2;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const diffX = mouseX - lineX;
    const distanceX = Math.abs(diffX);

    // Hitbox estreita: só interage se o cursor passar a até 50px da linha
    if (distanceX > 50) {
      ctrlX.set(40);
    } else {
      // Edge Damping (Fator de Resistência nas Pontas)
      const WAVE_RADIUS = 80;
      const edgeDistance = Math.min(mouseY, rect.height - mouseY);
      const edgeFactor = Math.max(0, Math.min(1, edgeDistance / WAVE_RADIUS));

      // Clamp de Amplitude: limita a distorção entre -20px e +20px
      const pull = Math.max(-20, Math.min(20, diffX * 0.8)) * edgeFactor;
      ctrlX.set(40 + pull);
    }
    
    ctrlY.set(mouseY);
  };

  const handleMouseLeave = () => {
    ctrlX.set(40);
    ctrlY.set(svgHeight / 2);
  };

  // CONSTRUÇÃO DO PATH SEGMENTADO (Onda Local)
  const pathD = useTransform([ctrlX, ctrlY], ([cx, cy]) => {
    const WAVE_RADIUS = 80;

    // Garantimos que a reta conectora nunca ultrapasse o SVG (Clamping Severo dos Eixos Y)
    const startY = Math.max(0, cy - WAVE_RADIUS);
    const endY = Math.min(svgHeight, cy + WAVE_RADIUS);

    // Passo 1: Reta até o início do raio de ação
    // Passo 2: Curva de Bezier (Q) usando o mouse como control point
    // Passo 3: Reta até o final do container
    return `M 40 0 L 40 ${startY} Q ${cx} ${cy} 40 ${endY} L 40 ${svgHeight}`;
  });

  return (
    <div
      className={styles.timelineWrapper}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
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
          <motion.path
            d={pathD}
            vectorEffect="non-scaling-stroke"
            fill="none"
            stroke="#A78BFA"
            strokeWidth="8"
            style={{ pathLength: scaleY, filter: "blur(8px)", opacity: 0.6 }}
          />
        </svg>
      </div>

      {steps.map((step, index) => (
        <TimelineStep
          key={step.id}
          step={step}
          index={index}
          isMobile={isMobile}
          ctrlX={ctrlX}
          ctrlY={ctrlY}
          svgHeight={svgHeight}
          totalSteps={steps.length}
        />
      ))}
    </div>
  );
}
