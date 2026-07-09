import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import {
  getHomePortfolioContent,
  getHomePortfolioContentRemote,
  getPortfolioProjects,
  getPortfolioProjectsRemote,
} from "@/service/content";
import ProjectCard from "@/components/organism/ProjectCard";
import ProjectDetailsModal from "@/components/organism/ProjectDetailsModal";
import { trackAction } from "@/service/analytics/tracking.service";
import styles from "./Portfolio.module.css";

export default function Portfolio({ content }) {
  const theme = useTheme();
  const [portfolio, setPortfolio] = useState(() => content || getHomePortfolioContent());
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

        if (Array.isArray(remoteProjects)) {
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
      sx={{ py: { xs: 10, md: 15 }, position: "relative" }}
    >
      <Container maxWidth="lg">
        <div className={styles.headerWrapper}>
          <Typography
            variant="overline"
            color="primary"
            className={styles.eyebrow}
          >
            {portfolio?.topTitle}
          </Typography>

          <Typography variant="h2" component="h2" className={styles.title}>
            {portfolio?.titleStart}{" "}
            <span style={{ color: theme.palette.primary.main }}>
              {portfolio?.titleHighlight}
            </span>
          </Typography>

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
            className={styles.ctaButton}
          >
            {portfolio?.buttonText}
          </Button>
        </div>

        <div className={styles.bentoGrid}>
          {projects.map((project, index) => (
            <div key={project.id} className={styles.bentoItem}>
              <ProjectCard
                project={project}
                index={index}
                onOpen={handleOpenProject}
                variant="home"
                titleSx={{
                  fontSize: {
                    xs: "1.58rem",
                    md: project.id <= 2 ? "2.05rem" : "1.7rem",
                  },
                  maxWidth: { xs: "95%", md: "82%" },
                }}
                summarySx={{ maxWidth: { xs: "98%", md: "86%" } }}
              />
            </div>
          ))}
        </div>
      </Container>

      <ProjectDetailsModal
        project={selectedProject}
        open={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
        actionLabel="Acessar projeto"
        coverMinHeight={{ xs: 250, md: 350 }}
      />
    </Box>
  );
}
