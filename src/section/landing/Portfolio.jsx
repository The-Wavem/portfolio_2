import { useState } from 'react';
import {
	Box,
	Button,
	Container,
	Stack,
	Typography,
	useTheme
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { getPortfolioProjects } from '@/service/content';
import ProjectCard from '@/components/organism/ProjectCard';
import ProjectDetailsModal from '@/components/organism/ProjectDetailsModal';

export default function Portfolio() {
	const theme = useTheme();
	const projects = getPortfolioProjects();
	const [selectedProject, setSelectedProject] = useState(null);

	return (
		<Box component="section" sx={{ py: { xs: 10, md: 15 }, position: 'relative' }}>
			<Container maxWidth="lg">
				<Box mb={{ xs: 7, md: 10 }} textAlign="left" position="relative" zIndex={2}>
					<Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 0.6, sm: 1.3 }} sx={{ mb: 1.4 }}>
						{['Cases publicados', 'Escopo orientado a negócio', 'Pós-lançamento ativo'].map((item) => (
							<Typography key={item} sx={{ color: 'rgba(228,228,231,0.74)', fontSize: '0.75rem', letterSpacing: '0.04em', textTransform: 'uppercase', fontWeight: 700 }}>
								{item}
							</Typography>
						))}
					</Stack>

					<Typography variant="overline" color="primary" sx={{ letterSpacing: 4, fontWeight: 700, fontSize: '0.72rem', opacity: 0.95 }}>
						PORTFÓLIO SELECIONADO
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
						Projetos reais com foco em <span style={{ color: theme.palette.primary.main }}>resultado e confiança.</span>
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
						Uma vitrine de produtos que nasceram de problemas reais. Em cada entrega, equilibramos estética, clareza de fluxo e engenharia sólida para gerar resultado contínuo.
					</Typography>

					<Button
						component={RouterLink}
						to="/projetos"
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
						Ver página completa de projetos
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
								onOpen={setSelectedProject}
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

