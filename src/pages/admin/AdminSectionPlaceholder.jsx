import { Box, Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

const titleBySection = {
    'hero-perfil': 'Hero & Perfil',
    contato: 'Contato',
    filosofia: 'Filosofia',
    toolkit: 'Toolkit (Skills)',
    certificados: 'Certificados',
    projetos: 'Meus Projetos',
    faq: 'FAQ / Dúvidas'
};

export default function AdminSectionPlaceholder() {
    const { section } = useParams();
    const title = titleBySection[section] ?? 'Seção Admin';

    return (
        <Container maxWidth={false} sx={{ px: { xs: 2.2, md: 3.2 }, py: { xs: 2.4, md: 3.2 } }}>
            <Box sx={{ p: { xs: 3, md: 4 }, borderRadius: '18px', border: '1px solid rgba(255,255,255,0.08)', background: 'linear-gradient(160deg, rgba(25,25,28,0.98), rgba(10,10,12,0.98))' }}>
                <Typography sx={{ color: '#fff', fontWeight: 900, fontSize: { xs: '1.75rem', md: '2rem' }, letterSpacing: '-0.02em' }}>
                    {title}
                </Typography>
                <Typography sx={{ mt: 1, color: 'rgba(228,228,231,0.74)', fontSize: '1rem' }}>
                    Página base criada. No próximo passo, conectamos esta seção com os dados reais e formulários de edição.
                </Typography>
            </Box>
        </Container>
    );
}
