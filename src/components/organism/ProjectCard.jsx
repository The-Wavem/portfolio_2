import { Box, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { TbArrowUpRight } from 'react-icons/tb';

const variantStyles = {
	home: {
		borderRadius: '24px',
		padding: { xs: 2.4, md: 3.1 },
		overlay: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.66) 58%, rgba(0,0,0,0.86) 100%)',
		detailLabel: 'Ver detalhes'
	},
	projects: {
		borderRadius: '22px',
		padding: { xs: 2.2, md: 2.8 },
		overlay: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.7) 60%, rgba(0,0,0,0.9) 100%)',
		detailLabel: 'Abrir estudo do projeto'
	}
};

export default function ProjectCard({
	project,
	index,
	onOpen,
	variant = 'home',
	minHeight,
	transition,
	titleSx,
	summarySx
}) {
	const styles = variantStyles[variant] ?? variantStyles.home;

	return (
		<motion.div
			initial={{ opacity: 0, y: 26 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.25 }}
			transition={transition ?? { duration: 0.52, delay: index * 0.08 }}
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
					minHeight: minHeight ?? project.minHeight,
					position: 'relative',
					borderRadius: styles.borderRadius,
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
						background: styles.overlay
					}}
				/>

				<Stack
					justifyContent="space-between"
					sx={{
						position: 'relative',
						zIndex: 2,
						height: '100%',
						p: styles.padding
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
								...titleSx
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
								...summarySx
							}}
						>
							{project.summary}
						</Typography>

						<Stack direction="row" alignItems="center" spacing={0.9} sx={{ mt: 2 }}>
							<Typography sx={{ color: '#fff', fontWeight: 600, fontSize: '0.88rem', letterSpacing: '0.01em' }}>
								{styles.detailLabel}
							</Typography>
							<TbArrowUpRight color="#ffffff" size={18} />
						</Stack>
					</Box>
				</Stack>
			</Box>
		</motion.div>
	);
}
