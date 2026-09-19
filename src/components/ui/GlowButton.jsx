import { forwardRef } from 'react';
import { Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const GlowButton = forwardRef(function GlowButton(
    {
        children,
        to,
        href,
        variant = 'primary',
        size = 'medium',
        startIcon,
        endIcon,
        fullWidth = false,
        disabled = false,
        className = '',
        sx = {},
        onClick,
        ...props
    },
    ref
) {
    const isPrimary = variant === 'primary';
    const isOutlined = variant === 'outlined';

    const getPadding = () => {
        if (size === 'large') return { xs: '12px 28px', md: '14px 34px' };
        if (size === 'small') return '8px 18px';
        return '10px 24px';
    };

    const getFontSize = () => {
        if (size === 'large') return { xs: '0.95rem', md: '1.02rem' };
        if (size === 'small') return '0.82rem';
        return '0.9rem';
    };

    const componentProps = to
        ? { component: RouterLink, to }
        : href
        ? { component: 'a', href, target: '_blank', rel: 'noopener noreferrer' }
        : {};

    const buttonStyles = isPrimary
        ? {
              background: 'linear-gradient(135deg, #7C3AED 0%, #6366F1 50%, #38BDF8 100%)',
              color: '#FFFFFF',
              border: 'none',
              boxShadow: '0 0 22px rgba(124, 58, 237, 0.38), 0 0 40px rgba(56, 189, 248, 0.12)',
              '&:hover': {
                  background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 50%, #38BDF8 100%)',
                  boxShadow: '0 0 30px rgba(124, 58, 237, 0.6), 0 0 50px rgba(56, 189, 248, 0.25)',
                  transform: 'translateY(-1px)',
              },
          }
        : isOutlined
        ? {
              background: 'rgba(10, 10, 12, 0.6)',
              color: '#FFFFFF',
              border: '1px solid rgba(124, 58, 237, 0.4)',
              boxShadow: '0 0 16px rgba(124, 58, 237, 0.15)',
              '&:hover': {
                  borderColor: '#A78BFA',
                  background: 'rgba(124, 58, 237, 0.12)',
                  boxShadow: '0 0 24px rgba(124, 58, 237, 0.35)',
                  transform: 'translateY(-1px)',
              },
          }
        : {
              background: 'rgba(255, 255, 255, 0.05)',
              color: '#FFFFFF',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              '&:hover': {
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderColor: 'rgba(255, 255, 255, 0.25)',
                  transform: 'translateY(-1px)',
              },
          };

    return (
        <motion.div
            whileTap={{ scale: disabled ? 1 : 0.98 }}
            style={{ display: fullWidth ? 'block' : 'inline-block', width: fullWidth ? '100%' : 'auto' }}
        >
            <Button
                ref={ref}
                disabled={disabled}
                onClick={onClick}
                startIcon={startIcon}
                endIcon={endIcon}
                fullWidth={fullWidth}
                className={className}
                {...componentProps}
                {...props}
                sx={{
                    borderRadius: '999px',
                    fontWeight: 700,
                    letterSpacing: '0.02em',
                    textTransform: 'none',
                    padding: getPadding(),
                    fontSize: getFontSize(),
                    transition: 'all 0.25s ease-in-out',
                    ...buttonStyles,
                    ...sx,
                }}
            >
                {children}
            </Button>
        </motion.div>
    );
});

export default GlowButton;
