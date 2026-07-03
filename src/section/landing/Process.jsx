import { useEffect, useRef, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  TbCoffee,
  TbPencil,
  TbFileText,
  TbCode,
  TbRocket,
} from "react-icons/tb";
import {
  getHomeProcessContent,
  getHomeProcessContentRemote,
  getProcessSteps,
} from "@/service/content";
import styles from "./Process.module.css";

const processIconMap = {
  coffee: TbCoffee,
  pencil: TbPencil,
  file: TbFileText,
  code: TbCode,
  rocket: TbRocket,
};

const ProcessStep = ({ step, index, isMobile }) => {
  const Icon = processIconMap[step.iconKey] ?? TbCode;
  const isEven = index % 2 === 0;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : isEven ? "row" : "row-reverse", // ZigZag
        alignItems: "center",
        justifyContent: isMobile ? "flex-start" : "space-between",
        position: "relative",
        mb: isMobile ? 8 : 13,
        width: "100%",
      }}
    >
      {/* Marcador Central (Bola com Número) */}
      <Box
        sx={{
          position: "absolute",
          left: isMobile ? "20px" : "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        >
          <Box
            sx={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              background: "#050505",
              border: `2px solid ${step.color}`,
              boxShadow: `0 0 20px ${step.color}32`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: step.color,
              fontWeight: 700,
              fontSize: "1.08rem",
              letterSpacing: "-0.01em",
            }}
          >
            {step.id}
          </Box>
        </motion.div>
      </Box>

      {/* Lado Vazio (para dar equilibrio no Desktop) */}
      {!isMobile && <Box sx={{ width: "45%" }} />}

      {/* O Card de Conteúdo */}
      <motion.div
        initial={{ opacity: 0, x: isMobile ? 50 : isEven ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        style={{
          width: isMobile ? "calc(100% - 60px)" : "45%",
          marginLeft: isMobile ? "60px" : 0,
        }}
      >
        <Box
          className={styles.cardHover}
          sx={{
            background: "rgba(10,10,10,0.62)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "18px",
            p: { xs: 3, md: 3.6 },
            position: "relative",
            backdropFilter: "blur(16px)",
            "&:hover": {
              borderColor: step.color,
              boxShadow: `0 8px 34px ${step.color}16`,
            },
          }}
        >
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
        </Box>
      </motion.div>
    </Box>
  );
};

export default function Process() {
  const theme = useTheme();
  const steps = getProcessSteps();
  const [process, setProcess] = useState(() => getHomeProcessContent());
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const containerRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    async function loadProcessRemote() {
      try {
        const remoteProcess = await getHomeProcessContentRemote();
        if (isMounted && remoteProcess) {
          setProcess(remoteProcess);
        }
      } catch {
        return;
      }
    }

    loadProcessRemote();

    return () => {
      isMounted = false;
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <Box
      component="section"
      ref={containerRef}
      sx={{ py: { xs: 10, md: 15 }, position: "relative", overflow: "hidden" }}
    >
      {/* Fundo Orgânico Animado */}
      <motion.div
        className={styles.bgBlob1}
        animate={{ y: [0, 40, 0], x: [0, -20, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className={styles.bgBlob2}
        animate={{ y: [0, -30, 0], x: [0, 20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* Header da Seção */}
        <div className={styles.headerWrapper}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="overline"
              color="primary"
              className={styles.eyebrow}
            >
              {process?.eyebrow || "METODOLOGIA"}
            </Typography>
            <Typography variant="h2" component="h2" className={styles.title}>
              {process?.titlePrefix || process?.titleStart}{" "}
              <span className={styles.titleHighlight}>
                {process?.titleHighlight}
              </span>
            </Typography>
          </motion.div>
        </div>

        <Box sx={{ position: "relative" }}>
          {/* Linha do Tempo Conectora Ondulada */}
          <Box
            sx={{
              position: "absolute",
              left: isMobile ? "45px" : "50%",
              top: 0,
              bottom: 0,
              width: "100px",
              transform: "translateX(-50%)",
              zIndex: 0,
              overflow: "visible",
            }}
          >
            <svg
              width="100%"
              height="100%"
              preserveAspectRatio="none"
              viewBox="0 0 100 1000"
              style={{ overflow: "visible" }}
            >
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F59E0B" />
                  <stop offset="50%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
              </defs>

              {/* Linha base suave apagada */}
              <motion.path
                d="M50 0 C 80 150, 20 350, 50 500 C 80 650, 20 850, 50 1000"
                vectorEffect="non-scaling-stroke"
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="2"
              />

              {/* Linha animada com gradiente */}
              <motion.path
                d="M50 0 C 80 150, 20 350, 50 500 C 80 650, 20 850, 50 1000"
                vectorEffect="non-scaling-stroke"
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="3"
                style={{ pathLength: scaleY }}
              />

              {/* Efeito Neon na linha (blur) */}
              <motion.path
                d="M50 0 C 80 150, 20 350, 50 500 C 80 650, 20 850, 50 1000"
                vectorEffect="non-scaling-stroke"
                fill="none"
                stroke="#A78BFA"
                strokeWidth="6"
                style={{
                  pathLength: scaleY,
                  filter: "blur(8px)",
                  opacity: 0.5,
                }}
              />
            </svg>
          </Box>

          {/* Render dos Passos */}
          <Box sx={{ position: "relative", zIndex: 1, mt: 5 }}>
            {steps.map((step, index) => (
              <ProcessStep
                key={step.id}
                step={step}
                index={index}
                isMobile={isMobile}
              />
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
