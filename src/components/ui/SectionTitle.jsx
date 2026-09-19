import { Box, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

export default function SectionTitle({
    eyebrow,
    title,
    titlePrefix,
    titleHighlight,
    titleSuffix,
    subtitle,
    align = 'center',
    maxWidth = 840,
    animate = true,
    className = '',
    sx = {},
}) {
    const theme = useTheme();

    const isCenter = align === 'center';
    const isRight = align === 'right';

    const content = (
        <Box
            className={className}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: isCenter ? 'center' : isRight ? 'flex-end' : 'flex-start',
                textAlign: align,
                width: '100%',
                ...sx,
            }}
        >
            {eyebrow && (
                <Typography
                    variant="overline"
                    color="primary"
                    sx={{
                        letterSpacing: '0.22em',
                        fontWeight: 700,
                        fontSize: { xs: '0.7rem', md: '0.75rem' },
                        opacity: 0.95,
                        textTransform: 'uppercase',
                        mb: 1.5,
                        display: 'block',
                    }}
                >
                    {eyebrow}
                </Typography>
            )}

            <Typography
                variant="h2"
                component="h2"
                sx={{
                    maxWidth,
                    fontSize: { xs: '2rem', sm: '2.4rem', md: '3.1rem' },
                    lineHeight: { xs: 1.15, md: 1.08 },
                    letterSpacing: '-0.03em',
                    fontWeight: 800,
                    color: '#fff',
                    mb: subtitle ? 2 : 0,
                }}
            >
                {title ? (
                    title
                ) : (
                    <>
                        {titlePrefix && `${titlePrefix} `}
                        {titleHighlight && (
                            <Box
                                component="span"
                                sx={{
                                    color: theme.palette.primary.light || '#A78BFA',
                                    background: 'linear-gradient(135deg, #A78BFA 0%, #38BDF8 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                {titleHighlight}
                            </Box>
                        )}
                        {titleSuffix && ` ${titleSuffix}`}
                    </>
                )}
            </Typography>

            {subtitle && (
                <Typography
                    variant="body1"
                    sx={{
                        maxWidth: maxWidth ? maxWidth * 0.82 : 680,
                        fontSize: { xs: '0.95rem', md: '1.05rem' },
                        lineHeight: 1.65,
                        color: 'rgba(228, 228, 231, 0.72)',
                        letterSpacing: '0.01em',
                    }}
                >
                    {subtitle}
                </Typography>
            )}
        </Box>
    );

    if (!animate) {
        return content;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ width: '100%' }}
        >
            {content}
        </motion.div>
    );
}
