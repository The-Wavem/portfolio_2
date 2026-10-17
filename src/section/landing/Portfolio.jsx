import { useEffect, useState, lazy, Suspense } from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";
import { TbArrowUpRight } from "react-icons/tb";
import {
  getHomePortfolioContent,
  getHomePortfolioContentRemote,
  getPortfolioProjects,
  getPortfolioProjectsRemote,
} from "@/service/content";
import ProjectCard from "@/components/organism/ProjectCard";
import { trackAction } from "@/service/analytics/tracking.service";
import styles from "./Portfolio.module.css";

const ProjectDetailsModal = lazy(
  () => import("@/components/organism/ProjectDetailsModal")
);

function getBentoPosition(index) {
  if (index === 0) return "featured";
  if (index === 3) return "wide";
  return "side";
}

export default function Portfolio({ content }) {
  const [portfolio, setPortfolio] = useState(
    () => content || getHomePortfolioContent()
  );
  const [allProjects, setAllProjects] = useState(() => getPortfolioProjects());

  useEffect(() => {
    let isMounted = true;

    if (content) {
      setPortfolio(content);
      if (content.projects) {
        setAllProjects(content.projects);
      }
      return;
    }

    async function loadRemotePortfolio() {
      try {
        const [remotePortfolio, remoteProjects] = await Promise.all([
          getHomePortfolioContentRemote(),
          getPortfolioProjectsRemote(),
        ]);

        if (!isMounted) {
          return;
        }

        if (remotePortfolio) {
          setPortfolio(remotePortfolio);
        }

        if (Array.isArray(remoteProjects) && remoteProjects.length > 0) {
          setAllProjects(remoteProjects);
        }
      } catch {
        return;
      }
    }

    loadRemotePortfolio();

    return () => {
      isMounted = false;
    };
  }, [content]);

  const selectedProjectIds = Array.isArray(portfolio?.selectedProjectIds)
    ? portfolio.selectedProjectIds
        .map((id) => Number(id))
        .filter(Number.isFinite)
    : [];
  const projects = selectedProjectIds.length
    ? selectedProjectIds
        .map((id) => allProjects.find((project) => Number(project.id) === id))
        .filter(Boolean)
    : allProjects;
  const [selectedProject, setSelectedProject] = useState(null);

  const handleOpenProject = (project) => {
    setSelectedProject(project);
    trackAction({
      page: "home",
      section: "portfolio",
      action: "open_project",
      label: project?.title ?? "Projeto",
    });
  };

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 14 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Atmosfera Roxo Wavem Integrada ao Fundo */}
      <motion.div
        aria-hidden
        animate={{
          opacity: [0.14, 0.24, 0.14],
          scale: [1, 1.06, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          left: "-120px",
          top: "14%",
          width: 480,
          height: 480,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(124, 58, 237, 0.34) 0%, rgba(124, 58, 237, 0) 70%)",
          filter: "blur(64px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <motion.div
        aria-hidden
        animate={{
          opacity: [0.1, 0.18, 0.1],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        style={{
          position: "absolute",
          right: "-140px",
          bottom: "8%",
          width: 440,
          height: 440,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(167, 139, 250, 0.26) 0%, rgba(124, 58, 237, 0) 70%)",
          filter: "blur(64px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        <div className={styles.headerWrapper}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ mb: 1.4 }}
            >
              <Typography variant="overline" className={styles.eyebrow}>
                {portfolio?.topTitle || "PORTFÓLIO SELECIONADO"}
              </Typography>
            </Stack>

            <Typography variant="h2" component="h2" className={styles.title}>
              {portfolio?.titleStart || "Projetos reais com foco em"}{" "}
              <Box
                component="span"
                sx={{
                  background:
                    "linear-gradient(95deg, #C4B5FD 0%, #7C3AED 58%, #38BDF8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {portfolio?.titleHighlight || "resultado e confiança."}
              </Box>
            </Typography>

            <Typography
              sx={{
                mt: 1.5,
                maxWidth: 540,
                color: "rgba(228, 228, 231, 0.72)",
                fontSize: { xs: "0.94rem", md: "1.02rem" },
                lineHeight: 1.58,
              }}
            >
              Sistemas, lojas e páginas pensadas para simplificar a rotina de
              quem empreende e destacar marcas no mundo real.
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              component={RouterLink}
              to="/projetos"
              onClick={() =>
                trackAction({
                  page: "home",
                  section: "portfolio",
                  action: "click_portfolio_cta",
                  label: portfolio?.buttonText,
                })
              }
              variant="outlined"
              endIcon={<TbArrowUpRight size={18} />}
              className={styles.ctaButton}
            >
              {portfolio?.buttonText || "Ver página completa de projetos"}
            </Button>
          </motion.div>
        </div>

        <div className={styles.bentoGrid}>
          {projects.map((project, index) => {
            const bentoPosition = getBentoPosition(index);
            return (
              <div key={project.id || index} className={styles.bentoItem}>
                <ProjectCard
                  project={project}
                  index={index}
                  onOpen={handleOpenProject}
                  variant="home"
                  bentoPosition={bentoPosition}
                />
              </div>
            );
          })}
        </div>
      </Container>

      {selectedProject && (
        <Suspense fallback={null}>
          <ProjectDetailsModal
            project={selectedProject}
            open={Boolean(selectedProject)}
            onClose={() => setSelectedProject(null)}
            actionLabel="Acessar projeto"
            coverMinHeight={{ xs: 250, md: 350 }}
          />
        </Suspense>
      )}
    </Box>
  );
}
