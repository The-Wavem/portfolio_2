import { useState } from 'react';
import {
	Box,
	Button,
	Chip,
	Container,
	Dialog,
	DialogContent,
	IconButton,
	Stack,
	Typography,
	useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import { TbArrowUpRight, TbExternalLink, TbX } from 'react-icons/tb';
import { getPortfolioProjects } from '@/service/content';

function PortfolioCard({ project, index, onOpen }) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 26 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.25 }}
			transition={{ duration: 0.52, delay: index * 0.08 }}
			style={{ height: '100%' }}
		>
			<Box
				onClick={() => onOpen(project)}
				role="button"
				tabIndex={0}
				onKeyDown={(event) => {
					if (event.key === 'Enter' || event.key === ' ') {
						event.preventDefault();
						onOpen(project);
					}
				}}
				sx={{
					height: '100%',
					minHeight: project.minHeight,
					position: 'relative',
					borderRadius: '24px',
					overflow: 'hidden',
					border: '1px solid rgba(255,255,255,0.08)',
					backgroundImage: project.cover,
					backgroundColor: '#0A0A0A',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					cursor: 'pointer',
					transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
					'&:hover': {
						transform: 'translateY(-4px)',
						borderColor: project.accent,
						boxShadow: `0 16px 46px ${project.accent}26`
					},
					'&:focus-visible': {
						outline: 'none',
						borderColor: project.accent,
						boxShadow: `0 0 0 2px ${project.accent}55`
					}
				}}
			>
				<Box
					sx={{
						position: 'absolute',
						inset: 0,
						background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.66) 58%, rgba(0,0,0,0.86) 100%)'
					}}
				/>

				<Stack
					justifyContent="space-between"
					sx={{
						position: 'relative',
						zIndex: 2,
						height: '100%',
						p: { xs: 2.4, md: 3.1 }
					}}
				>
					<Box>
						<Typography
							variant="caption"
							sx={{
								color: 'rgba(255,255,255,0.88)',
								letterSpacing: 1.6,
								fontWeight: 700,
								textTransform: 'uppercase',
								fontSize: '0.68rem'
							}}
						>
							{project.tag}
						</Typography>
					</Box>

					<Box>
						<Typography
							variant="h4"
							sx={{
								color: '#fff',
								fontWeight: 800,
								lineHeight: 1.08,
								letterSpacing: '-0.028em',
								fontSize: { xs: '1.58rem', md: project.id <= 2 ? '2.05rem' : '1.7rem' },
								maxWidth: { xs: '95%', md: '82%' }
							}}
						>
							{project.title}
						</Typography>
						<Typography
							sx={{
								mt: 1.4,
								color: 'rgba(228,228,231,0.8)',
								fontSize: { xs: '0.94rem', md: '1rem' },
								lineHeight: 1.65,
								letterSpacing: '0.01em',
								maxWidth: { xs: '98%', md: '86%' }
							}}
						>
							{project.summary}
						</Typography>

						<Stack direction="row" alignItems="center" spacing={0.9} sx={{ mt: 2 }}>
							<Typography sx={{ color: '#fff', fontWeight: 600, fontSize: '0.88rem', letterSpacing: '0.01em' }}>
								Ver detalhes
							</Typography>
							<TbArrowUpRight color="#ffffff" size={18} />
						</Stack>
					</Box>
				</Stack>
			</Box>
		</motion.div>
	);
}

export default function Portfolio() {
	const theme = useTheme();
	const projects = getPortfolioProjects();
	const [selectedProject, setSelectedProject] = useState(null);

	return (
		<Box component="section" sx={{ py: { xs: 10, md: 15 }, position: 'relative' }}>
			<Container maxWidth="lg">
				<Box mb={{ xs: 7, md: 10 }} textAlign="left" position="relative" zIndex={2}>
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
							color: 'rgba(228,228,231,0.72)',
							lineHeight: 1.75,
							fontSize: { xs: '0.95rem', md: '1rem' },
							letterSpacing: '0.01em'
						}}
					>
						Uma amostra do que já colocamos no ar. Cada projeto combina estratégia, design e engenharia para entregar uma presença digital com alto padrão.
					</Typography>
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
							<PortfolioCard project={project} index={index} onOpen={setSelectedProject} />
						</Box>
					))}
				</Box>
			</Container>

			<Dialog
				open={Boolean(selectedProject)}
				onClose={() => setSelectedProject(null)}
				maxWidth="md"
				fullWidth
				PaperProps={{
					sx: {
						background: '#080808',
						border: '1px solid rgba(255,255,255,0.08)',
						borderRadius: '18px',
						overflow: 'hidden'
					}
				}}
			>
				{selectedProject && (
					<DialogContent sx={{ p: 0 }}>
						<Box
							sx={{
								minHeight: { xs: 250, md: 350 },
								position: 'relative',
								backgroundImage: selectedProject.cover,
								borderBottom: '1px solid rgba(255,255,255,0.08)'
							}}
						>
							<Box
								sx={{
									position: 'absolute',
									inset: 0,
									background: 'linear-gradient(180deg, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.7) 72%, rgba(0,0,0,0.88) 100%)'
								}}
							/>

							<IconButton
								onClick={() => setSelectedProject(null)}
								sx={{
									position: 'absolute',
									top: 14,
									right: 14,
									color: '#fff',
									border: '1px solid rgba(255,255,255,0.18)',
									background: 'rgba(0,0,0,0.35)',
									'&:hover': { background: 'rgba(0,0,0,0.55)' }
								}}
							>
								<TbX size={20} />
							</IconButton>

							<Box sx={{ position: 'absolute', left: 24, right: 24, bottom: 24 }}>
								<Typography sx={{ color: 'rgba(255,255,255,0.88)', letterSpacing: 1.6, fontWeight: 700, textTransform: 'uppercase', fontSize: '0.68rem' }}>
									{selectedProject.tag}
								</Typography>
								<Typography
									variant="h4"
									sx={{
										color: '#fff',
										mt: 1,
										fontWeight: 800,
										lineHeight: 1.08,
										letterSpacing: '-0.024em',
										fontSize: { xs: '1.4rem', md: '2rem' }
									}}
								>
									{selectedProject.title}
								</Typography>
							</Box>
						</Box>

						<Box sx={{ p: { xs: 2.4, md: 3.2 } }}>
							<Typography sx={{ color: 'rgba(228,228,231,0.78)', lineHeight: 1.8, fontSize: { xs: '0.94rem', md: '1rem' } }}>
								{selectedProject.details}
							</Typography>

							<Stack direction="row" flexWrap="wrap" gap={1} sx={{ mt: 2.2 }}>
								{selectedProject.stack.map((item) => (
									<Chip
										key={item}
										label={item}
										size="small"
										sx={{
											color: '#fff',
											borderColor: 'rgba(255,255,255,0.22)',
											background: 'rgba(255,255,255,0.03)',
											'& .MuiChip-label': { px: 1.2, fontWeight: 600, fontSize: '0.72rem' }
										}}
										variant="outlined"
									/>
								))}
							</Stack>

							<Button
								href={selectedProject.href}
								target="_blank"
								rel="noreferrer"
								variant="contained"
								endIcon={<TbExternalLink size={18} />}
								sx={{
									mt: 3,
									px: 2.2,
									py: 1,
									fontWeight: 700,
									borderRadius: '10px'
								}}
							>
								Acessar projeto
							</Button>
						</Box>
					</DialogContent>
				)}
			</Dialog>
		</Box>
	);
}

