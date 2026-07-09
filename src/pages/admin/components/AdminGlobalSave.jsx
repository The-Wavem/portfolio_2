import { Box, Button, CircularProgress } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { TbDeviceFloppy } from 'react-icons/tb';
import { useAdminUnsavedChanges } from '../adminUnsavedChanges.context';

export default function AdminGlobalSave() {
    const { hasUnsavedChanges, isSaving, triggerSaveAction } = useAdminUnsavedChanges();

    return (
        <AnimatePresence>
            {hasUnsavedChanges && (
                <Box
                    component={motion.div}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.9 }}
                    transition={{ duration: 0.3, type: 'spring', bounce: 0.4 }}
                    sx={{
                        position: 'fixed',
                        bottom: { xs: 24, md: 32 },
                        right: { xs: 24, md: 40 },
                        zIndex: 1300,
                    }}
                >
                    <Button
                        onClick={() => triggerSaveAction && triggerSaveAction()}
                        disabled={isSaving}
                        variant="contained"
                        sx={{
                            borderRadius: '999px',
                            px: 3.5,
                            py: 1.5,
                            fontWeight: 800,
                            fontSize: '1rem',
                            textTransform: 'none',
                            bgcolor: '#7C3AED',
                            color: '#fff',
                            boxShadow: '0 8px 32px rgba(124,58,237,0.45)',
                            '&:hover': {
                                bgcolor: '#6D28D9',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 12px 40px rgba(124,58,237,0.55)',
                            },
                            transition: 'all 0.2s ease-in-out',
                        }}
                    >
                        {isSaving ? (
                            <CircularProgress size={24} sx={{ color: '#fff', mr: 1 }} />
                        ) : (
                            <TbDeviceFloppy size={24} style={{ marginRight: 8 }} />
                        )}
                        {isSaving ? 'Salvando...' : 'Salvar Alterações'}
                    </Button>
                </Box>
            )}
        </AnimatePresence>
    );
}
