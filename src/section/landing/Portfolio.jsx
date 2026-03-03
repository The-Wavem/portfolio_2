import { useEffect, useState } from 'react';
import {
	Box,
	Button,
	Container,
	Stack,
	Typography,
	useTheme
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import {
	getHomePortfolioContent,
	getHomePortfolioContentRemote,
	getPortfolioProjects,
	getPortfolioProjectsRemote
} from '@/service/content';
import ProjectCard from '@/components/organism/ProjectCard';
import ProjectDetailsModal from '@/components/organism/ProjectDetailsModal';
import { trackAction } from '@/service/analytics/tracking.service';

export default function Portfolio() {
	const theme = useTheme();
	const [portfolio, setPortfolio] = useState(() => getHomePortfolioContent());
	const [allProjects, setAllProjects] = useState(() => getPortfolioProjects());

	useEffect(() => {
		let isMounted = true;

		async function loadRemotePortfolio() {
			try {
				const [remotePortfolio, remoteProjects] = await Promise.all([
					getHomePortfolioContentRemote(),
					getPortfolioProjectsRemote()
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
	}, []);

	const selectedProjectIds = Array.isArray(portfolio?.selectedProjectIds)
		? portfolio.selectedProjectIds.map((id) => Number(id)).filter(Number.isFinite)
		: [];
	const projects = selectedProjectIds.length
		? allProjects.filter((project) => selectedProjectIds.includes(Number(project.id)))
		: allProjects;
	const [selectedProject, setSelectedProject] = useState(null);

	const handleOpenProject = (project) => {
		setSelectedProject(project);
		trackAction({
			page: 'home',
			section: 'portfolio',
			action: 'open_project',
			label: project?.title ?? 'Projeto'
		});
	};

	return (
		<Box component="section" sx={{ py: { xs: 10, md: 15 }, position: 'relative' }}>
			<Container maxWidth="lg">
				<Box mb={{ xs: 7, md: 10 }} textAlign="left" position="relative" zIndex={2}>
					<Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 0.6, sm: 1.3 }} sx={{ mb: 1.4 }}>
						{portfolio.topTags.map((item) => (
							<Typography key={item} sx={{ color: 'rgba(228,228,231,0.74)', fontSize: '0.75rem', letterSpacing: '0.04em', textTransform: 'uppercase', fontWeight: 700 }}>
								{item}
							</Typography>
						))}
					</Stack>

					<Typography variant="overline" color="primary" sx={{ letterSpacing: 4, fontWeight: 700, fontSize: '0.72rem', opacity: 0.95 }}>
						{portfolio.eyebrow}
					</Typography>
					<Typography
						variant="h3"
						fontWeight={800}
						sx={{
							mt: 1.4,
							mb: 2.4,
							maxWidth: 840,
							fontSize: { xs: '2rem', sm: '2.35rem', md: '3.1rem' },
							lineHeight: 1.06,
							letterSpacing: '-0.03em'
						}}
					>
						{portfolio.titleStart} <span style={{ color: theme.palette.primary.main }}>{portfolio.titleHighlight}</span>
					</Typography>
					<Typography
						sx={{
							maxWidth: 660,
							color: 'rgba(228,228,231,0.78)',
							lineHeight: 1.75,
							fontSize: { xs: '0.95rem', md: '1rem' },
							letterSpacing: '0.01em'
						}}
					>
						{portfolio.description}
					</Typography>

					<Button
						component={RouterLink}
						to={portfolio.cta.to}
						onClick={() => trackAction({ page: 'home', section: 'portfolio', action: 'click_portfolio_cta', label: portfolio.cta.label })}
						variant="outlined"
						sx={{
							mt: 3,
							borderColor: 'rgba(255,255,255,0.22)',
							color: '#fff',
							fontWeight: 700,
							px: 2,
							'&:hover': {
								borderColor: theme.palette.primary.main,
								backgroundColor: 'rgba(124,58,237,0.08)'
							}
						}}
					>
						{portfolio.cta.label}
					</Button>
				</Box>

				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
						gap: { xs: 2.4, sm: 2.8, md: 3.2 },
						alignItems: 'stretch'
					}}
				>
					{projects.map((project, index) => (
						<Box key={project.id} sx={{ gridColumn: project.grid }}>
							<ProjectCard
								project={project}
								index={index}
								onOpen={handleOpenProject}
								variant="home"
								titleSx={{
									fontSize: { xs: '1.58rem', md: project.id <= 2 ? '2.05rem' : '1.7rem' },
									maxWidth: { xs: '95%', md: '82%' }
								}}
								summarySx={{ maxWidth: { xs: '98%', md: '86%' } }}
							/>
						</Box>
					))}
				</Box>
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

