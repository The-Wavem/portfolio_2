import { useState } from 'react';
import {
	Alert,
	Box,
	Button,
	Container,
	Divider,
	IconButton,
	Snackbar,
	Stack,
	Typography,
	useTheme
} from '@mui/material';
import { TbBrandWhatsapp, TbMail, TbCalendarEvent, TbCopy, TbArrowUpRight } from 'react-icons/tb';
import { getContactAssurances, getContactChannels } from '@/service/content';

const quickMessage = 'Olá, The Wavem! Quero conversar sobre um novo projeto e entender o melhor caminho para começar.';
const contactEmail = 'contato.thewavem@gmail.com';

export default function Contact() {
	const theme = useTheme();
	const channels = getContactChannels();
	const assurances = getContactAssurances();
	const whatsappChannel = channels.find((channel) => channel.id === 'whatsapp');
	const emailChannel = channels.find((channel) => channel.id === 'email');
	const meetingChannel = channels.find((channel) => channel.id === 'meeting');
	const [copied, setCopied] = useState(false);

	const handleCopyEmail = async () => {
		try {
			await navigator.clipboard.writeText(contactEmail);
			setCopied(true);
		} catch (error) {
			setCopied(false);
		}
	};

	return (
		<Box id="contato" component="section" sx={{ py: { xs: 10, md: 15 }, position: 'relative' }}>
			<Container maxWidth="lg">
				<Box mb={{ xs: 7, md: 9 }} textAlign="left">
					<Typography variant="overline" color="primary" sx={{ letterSpacing: 4, fontWeight: 700, fontSize: '0.72rem', opacity: 0.95 }}>
						CONTATO SEM FRICÇÃO
					</Typography>
					<Typography
						variant="h3"
						fontWeight={800}
						sx={{
							mt: 1.4,
							mb: 2.4,
							maxWidth: 860,
							fontSize: { xs: '2rem', sm: '2.35rem', md: '3.1rem' },
							lineHeight: 1.06,
							letterSpacing: '-0.03em'
						}}
					>
						Fale com a The Wavem com <span style={{ color: theme.palette.primary.main }}>clareza desde o primeiro clique.</span>
					</Typography>
					<Typography sx={{ maxWidth: 700, color: 'rgba(228,228,231,0.72)', lineHeight: 1.75, fontSize: { xs: '0.95rem', md: '1rem' }, letterSpacing: '0.01em' }}>
						Nada de formulário longo. Você escolhe o canal, abre a conversa na hora e já sabe exatamente o que foi enviado.
					</Typography>
				</Box>

				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
						gap: { xs: 2.4, sm: 2.8, md: 3.2 }
					}}
				>
					<Box sx={{ gridColumn: { xs: '1 / -1', md: '1 / span 8' } }}>
						<Box
							sx={{
								p: { xs: 2.6, md: 3.2 },
								borderRadius: '18px',
								background: 'rgba(10,10,10,0.62)',
								border: '1px solid rgba(255,255,255,0.08)',
								backdropFilter: 'blur(16px)',
								transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
								'&:hover': {
									borderColor: whatsappChannel?.accent ?? theme.palette.primary.main,
									boxShadow: `0 10px 34px ${(whatsappChannel?.accent ?? theme.palette.primary.main)}20`
								}
							}}
						>
							<Typography variant="caption" sx={{ color: whatsappChannel?.accent ?? 'primary.main', letterSpacing: 1.8, fontWeight: 700, textTransform: 'uppercase', fontSize: '0.68rem' }}>
								Canal recomendado
							</Typography>
							<Typography sx={{ mt: 0.8, color: '#fff', fontWeight: 800, fontSize: { xs: '1.24rem', md: '1.5rem' }, letterSpacing: '-0.018em', lineHeight: 1.12 }}>
								{whatsappChannel?.title}
							</Typography>
							<Typography sx={{ mt: 0.6, color: 'rgba(228,228,231,0.7)', lineHeight: 1.65, fontSize: '0.92rem' }}>
								{whatsappChannel?.subtitle}
							</Typography>
							<Typography sx={{ mt: 1.2, color: 'rgba(228,228,231,0.82)', lineHeight: 1.75, fontSize: { xs: '0.92rem', md: '0.98rem' } }}>
								{quickMessage}
							</Typography>

							<Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.2} sx={{ mt: 2.2 }}>
								<Button
									component="a"
									href={whatsappChannel?.href}
									target="_blank"
									rel="noreferrer"
									variant="contained"
									startIcon={<TbBrandWhatsapp size={18} />}
									sx={{ borderRadius: '10px', fontWeight: 700, px: 2.1, py: 0.95, bgcolor: whatsappChannel?.accent ?? '#25D366', '&:hover': { bgcolor: '#1FB85A' } }}
								>
									{whatsappChannel?.cta ?? 'Conversar no WhatsApp'}
								</Button>
							</Stack>

							<Divider sx={{ my: 2.0, borderColor: 'rgba(255,255,255,0.08)' }} />

						</Box>
					</Box>

					<Box sx={{ gridColumn: { xs: '1 / -1', md: '9 / span 4' } }}>
						<Box
							sx={{
								p: { xs: 2.6, md: 3.2 },
								borderRadius: '18px',
								background: 'rgba(10,10,10,0.62)',
								border: '1px solid rgba(255,255,255,0.08)',
								backdropFilter: 'blur(16px)',
								height: '100%'
							}}
						>
							<Typography variant="caption" sx={{ color: 'rgba(228,228,231,0.9)', letterSpacing: 1.8, fontWeight: 700, textTransform: 'uppercase', fontSize: '0.68rem' }}>
								Canal de segurança
							</Typography>
							<Typography sx={{ mt: 1.1, color: '#fff', fontWeight: 700, letterSpacing: '-0.01em', fontSize: '1.06rem' }}>
								{contactEmail}
							</Typography>
							<Typography sx={{ mt: 0.8, color: 'rgba(228,228,231,0.7)', fontSize: '0.9rem', lineHeight: 1.65 }}>
								Use este e-mail caso queira anexar briefing ou documentação técnica.
							</Typography>
							<IconButton
								onClick={handleCopyEmail}
								sx={{
									mt: 1.4,
									border: '1px solid rgba(255,255,255,0.16)',
									color: '#fff',
									borderRadius: '10px',
									'&:hover': { borderColor: 'primary.main', background: 'rgba(255,255,255,0.05)' }
								}}
							>
								<TbCopy size={18} />
							</IconButton>
						</Box>
					</Box>
				</Box>

				<Box sx={{ mt: { xs: 3, md: 4.2 }, p: { xs: 2.4, md: 2.8 }, borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(8,8,8,0.56)' }}>
					<Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
						{assurances.map((item) => (
							<Box key={item.id} sx={{ flex: 1 }}>
								<Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.96rem', letterSpacing: '-0.01em' }}>
									{item.title}
								</Typography>
								<Typography sx={{ mt: 0.6, color: 'rgba(228,228,231,0.72)', lineHeight: 1.65, fontSize: '0.88rem' }}>
									{item.description}
								</Typography>
							</Box>
						))}
					</Stack>
				</Box>
			</Container>

			<Snackbar open={copied} autoHideDuration={2500} onClose={() => setCopied(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
				<Alert onClose={() => setCopied(false)} severity="success" variant="filled" sx={{ width: '100%' }}>
					E-mail copiado com sucesso.
				</Alert>
			</Snackbar>
		</Box>
	);
}

