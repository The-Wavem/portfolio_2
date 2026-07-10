import { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import {
  getHomeProcessContent,
  getHomeProcessContentRemote,
  getProcessSteps,
} from "@/service/content";
import ElasticTimeline from "./ElasticTimeline";
import styles from "./Process.module.css";

export default function Process({ content }) {
  const [process, setProcess] = useState(() => content || getHomeProcessContent());
  const steps = process?.steps || getProcessSteps();

  useEffect(() => {
    let isMounted = true;

    if (content) {
      setProcess(content);
      return;
    }

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
  }, [content]);

  return (
    <Box
      component="section"
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

        {/* Linha do Tempo Centralizada (Componente Isolado) */}
        <Box sx={{ position: "relative", mt: { xs: 4, md: 8 } }}>
          <ElasticTimeline steps={steps} />
        </Box>
      </Container>
    </Box>
  );
}
