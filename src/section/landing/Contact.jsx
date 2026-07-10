import { useEffect, useState, useRef } from 'react';
import {
    Alert,
    Box,
    Button,
    Container,
    Snackbar,
    Typography,
    useTheme
} from '@mui/material';
import { TbBrandGithub, TbBrandInstagram, TbBrandLinkedin, TbArrowUpRight } from 'react-icons/tb';
import { motion, useSpring } from 'framer-motion';
import {
    getHomeContactContent,
    getHomeContactContentRemote
} from '@/service/content';
import { trackAction } from '@/service/analytics/tracking.service';
import styles from './Contact.module.css';

// Hook Magnético e Componente Wrapper
const MagneticWrapper = ({ children, strength = 0.5, className }) => {
    const ref = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    
    const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
    const x = useSpring(0, springConfig);
    const y = useSpring(0, springConfig);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        
        const moveX = (clientX - centerX) * strength;
        const moveY = (clientY - centerY) * strength;
        
        x.set(moveX);
        y.set(moveY);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => setIsHovered(true)}
            style={{ x, y, display: 'inline-block' }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// Componente para Texto com Animação Staggered
const StaggeredText = ({ text, color, delayOffset = 0 }) => {
    if (!text) return null;
    const words = text.split(' ');

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: delayOffset
            }
        }
    };

    const wordVariants = {
        hidden: { y: '120%' },
        visible: { y: 0, transition: { ease: [0.16, 1, 0.3, 1], duration: 0.7 } }
    };

    return (
        <motion.span
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            {words.map((word, i) => (
                <span key={i} className={styles.wordContainer}>
                    <motion.span variants={wordVariants} className={styles.wordInner} style={{ color }}>
                        {word}
                    </motion.span>
                </span>
            ))}
        </motion.span>
    );
};

// Mapping Icons
const IconMap = {
    instagram: TbBrandInstagram,
    linkedin: TbBrandLinkedin,
    github: TbBrandGithub
};

export default function Contact({ content: overrideContent }) {
    const theme = useTheme();
    const [contact, setContact] = useState(() => overrideContent || getHomeContactContent());
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (overrideContent) {
            setContact(overrideContent);
        }
    }, [overrideContent]);

    const contactEmail = contact.emailAddress;
    const normalizedWhatsappPhone = String(contact.whatsappNumber || '').replace(/\D/g, '');
    const whatsappHref = normalizedWhatsappPhone
        ? `https://wa.me/${normalizedWhatsappPhone}`
        : '#';
    const ctaLink = contact.ctaLink || whatsappHref;

    useEffect(() => {
        if (overrideContent) return; // Se tiver override (Live Preview), não buscar do firebase
        let isMounted = true;
        async function loadRemoteContact() {
            try {
                const remoteContact = await getHomeContactContentRemote();
                if (isMounted && remoteContact) {
                    setContact(remoteContact);
                }
            } catch {
                return;
            }
        }
        loadRemoteContact();
        return () => {
            isMounted = false;
        };
    }, [overrideContent]);

    const handleCopyEmail = async (e) => {
        e.preventDefault();
        try {
            await navigator.clipboard.writeText(contactEmail);
            setCopied(true);
            trackAction({ page: 'home', section: 'contact', action: 'copy_email', label: 'Copiar e-mail grande' });
        } catch (error) {
            setCopied(false);
        }
    };

    return (
        <Box id="contato" component="section" className={styles.container}>
            <Container maxWidth="lg">
                <div className={styles.grid}>
                    {/* Eixo 1: Chamada para a Ação */}
                    <div className={styles.actionAxis}>
                        <Box>
                            <Typography variant="overline" color="primary" sx={{ letterSpacing: 4, fontWeight: 700, fontSize: '0.75rem', opacity: 0.95, mb: 2, display: 'block' }}>
                                {contact.eyebrow}
                            </Typography>
                            <Typography
                                variant="h2"
                                fontWeight={800}
                                sx={{
                                    fontSize: { xs: '2.4rem', sm: '3rem', md: '4rem' },
                                    lineHeight: 1.05,
                                    letterSpacing: '-0.03em',
                                    mb: 3
                                }}
                            >
                                <StaggeredText text={contact.titlePrefix} color="#ffffff" delayOffset={0} />
                                <br />
                                <StaggeredText text={contact.titleHighlight} color={theme.palette.primary.main} delayOffset={0.3} />
                            </Typography>
                            
                            <Typography sx={{ maxWidth: 500, color: 'rgba(228,228,231,0.72)', lineHeight: 1.75, fontSize: { xs: '1rem', md: '1.1rem' } }}>
                                {contact.description}
                            </Typography>
                        </Box>

                        <MagneticWrapper strength={0.4}>
                            <Button
                                component="a"
                                href={ctaLink}
                                onClick={() => trackAction({ page: 'home', section: 'contact', action: 'open_whatsapp_primary', label: contact.ctaLabel })}
                                target="_blank"
                                rel="noreferrer"
                                variant="contained"
                                endIcon={<TbArrowUpRight size={20} />}
                                sx={{
                                    borderRadius: '999px',
                                    fontWeight: 700,
                                    px: 4,
                                    py: 1.8,
                                    fontSize: '1rem',
                                    letterSpacing: '0.02em',
                                    bgcolor: '#ffffff',
                                    color: '#000000',
                                    transition: 'all 0.3s ease',
                                    '&:hover': { 
                                        bgcolor: theme.palette.primary.main,
                                        color: '#ffffff',
                                        transform: 'scale(1.02)',
                                        boxShadow: `0 12px 30px ${theme.palette.primary.main}40`
                                    }
                                }}
                            >
                                {contact.ctaLabel || 'Iniciar Conversa'}
                            </Button>
                        </MagneticWrapper>
                    </div>

                    {/* Eixo 2: Presença Direta */}
                    <div className={styles.presenceAxis}>
                        <MagneticWrapper strength={0.15}>
                            <a
                                href={`mailto:${contactEmail}`}
                                onClick={handleCopyEmail}
                                className={styles.emailOversized}
                                style={{ '--primary-color': theme.palette.primary.main }}
                                title="Clique para copiar"
                            >
                                {contactEmail}
                            </a>
                        </MagneticWrapper>

                        <div className={styles.socialRow}>
                            {contact.socials?.map((social) => {
                                const IconComp = IconMap[social.icon] || TbArrowUpRight;
                                return (
                                    <MagneticWrapper key={social.id} strength={0.6}>
                                        <a
                                            href={social.href}
                                            target="_blank"
                                            rel="noreferrer"
                                            className={styles.socialIcon}
                                            style={{ '--primary-color': theme.palette.primary.main }}
                                            aria-label={social.label}
                                        >
                                            <IconComp size={24} />
                                        </a>
                                    </MagneticWrapper>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </Container>

            <Snackbar open={copied} autoHideDuration={2500} onClose={() => setCopied(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert onClose={() => setCopied(false)} severity="success" variant="filled" sx={{ width: '100%', bgcolor: '#10B981', color: '#fff' }}>
                    {contact.emailFeedbackMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}

