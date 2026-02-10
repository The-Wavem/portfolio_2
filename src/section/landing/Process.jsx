import { useRef } from 'react';
import { Box, Container, Typography, Stack, useTheme, useMediaQuery } from '@mui/material';
import { motion, useScroll, useSpring } from 'framer-motion';

// Substituindo TbFileSignature por TbFileText
import { TbCoffee, TbPencil, TbFileText, TbCode, TbRocket } from 'react-icons/tb';

const steps = [
    {
        id: 1,
        title: "Descoberta & Conexão",
        subtitle: "O Café Virtual",
        description: "Tudo começa com uma conversa sem compromisso. Queremos ouvir sua ideia, entender suas dores e ver se temos a química certa para trabalharmos juntos. Sem termos técnicos difíceis aqui.",
        icon: TbCoffee,
        color: "#F59E0B" // Âmbar (Acolhedor)
    },
    {
        id: 2,
        title: "Rascunho & Escopo",
        subtitle: "A Visão Toma Forma",
        description: "Desenhamos os primeiros protótipos (wireframes) para validar se estamos na mesma página. Com a ideia visualizada, definimos o escopo real e apresentamos um orçamento justo.",
        icon: TbPencil,
        color: "#EC4899" // Rosa (Criativo)
    },
    {
        id: 3,
        title: "Design & Contrato",
        subtitle: "Formalização",
        description: "Com o aperto de mão (digital) e contrato assinado, nossa equipe foca nos detalhes. Criamos o layout final em alta fidelidade no Figma. É aqui que seu projeto ganha cara e cor.",
        icon: TbFileText,
        color: "#8B5CF6" // Roxo (Identidade Wavem)
    },
    {
        id: 4,
        title: "Desenvolvimento Puro",
        subtitle: "Construção da Estrutura",
        description: "Aprovou o design? Agora é conosco. Codificamos a estrutura robusta do sistema. Para garantir a entrega no prazo, mudanças estruturais nesta etapa exigem revisão, garantindo o foco total.",
        icon: TbCode,
        color: "#3B82F6" // Azul (Técnico/Confiança)
    },
    {
        id: 5,
        title: "Deploy & Evolução",
        subtitle: "O Grande Lançamento",
        description: "Configuramos servidores, domínio e colocamos seu projeto no ar. Oferecemos planos de suporte contínuo para que você nunca fique na mão e seu sistema continue evoluindo.",
        icon: TbRocket,
        color: "#10B981" // Verde (Sucesso/Go)
    }
];

const ProcessStep = ({ step, index, isMobile }) => {
    const Icon = step.icon;
    const isEven = index % 2 === 0;

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : (isEven ? 'row' : 'row-reverse'), // ZigZag
                alignItems: 'center',
                justifyContent: isMobile ? 'flex-start' : 'space-between',
                position: 'relative',
                mb: isMobile ? 8 : 15,
                width: '100%'
            }}
        >
            {/* Marcador Central (Bola com Número) */}
            <Box
                sx={{
                    position: 'absolute',
                    left: isMobile ? '20px' : '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 10,
                    display: 'flex', flexDirection: 'column', alignItems: 'center'
                }}
            >
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                >
                    <Box sx={{
                        width: 50, height: 50, borderRadius: '50%',
                        background: '#050505',
                        border: `2px solid ${step.color}`,
                        boxShadow: `0 0 20px ${step.color}40`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: step.color, fontWeight: 'bold', fontSize: '1.2rem'
                    }}>
                        {step.id}
                    </Box>
                </motion.div>
            </Box>

            {/* Lado Vazio (para dar equilibrio no Desktop) */}
            {!isMobile && <Box sx={{ width: '45%' }} />}

            {/* O Card de Conteúdo */}
            <motion.div
                initial={{ opacity: 0, x: isMobile ? 50 : (isEven ? -50 : 50) }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                style={{ width: isMobile ? 'calc(100% - 60px)' : '45%', marginLeft: isMobile ? '60px' : 0 }}
            >
                <Box
                    sx={{
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.05)',
                        borderRadius: '20px',
                        p: 4,
                        position: 'relative',
                        backdropFilter: 'blur(10px)',
                        transition: 'all 0.3s',
                        '&:hover': {
                            borderColor: step.color,
                            background: `linear-gradient(145deg, rgba(255,255,255,0.03) 0%, ${step.color}05 100%)`,
                            transform: 'translateY(-5px)'
                        }
                    }}
                >
                    <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                        <Box sx={{ p: 1, borderRadius: '12px', background: `${step.color}20`, color: step.color }}>
                            <Icon size={28} />
                        </Box>
                        <Box>
                            <Typography variant="caption" sx={{ color: step.color, fontWeight: 'bold', letterSpacing: 1, textTransform: 'uppercase' }}>
                                {step.subtitle}
                            </Typography>
                            <Typography variant="h5" fontWeight="bold" color="white">
                                {step.title}
                            </Typography>
                        </Box>
                    </Stack>

                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                        {step.description}
                    </Typography>
                </Box>
            </motion.div>
        </Box>
    );
};

export default function Process() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <Box component="section" ref={containerRef} sx={{ py: 15, position: 'relative', overflow: 'hidden' }}>
            <Container maxWidth="lg">
                {/* Header da Seção */}
                <Box mb={10} textAlign="center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Typography variant="overline" sx={{ color: '#A1A1AA', letterSpacing: 3 }}>
                            COMO TRABALHAMOS
                        </Typography>
                        <Typography variant="h3" fontWeight={800} sx={{ mt: 1, mb: 3 }}>
                            Do cafézinho ao <span style={{ color: theme.palette.primary.main }}>código.</span>
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '600px', mx: 'auto' }}>
                            Nosso processo é transparente e sem surpresas. Você acompanha cada etapa, sabendo exatamente o que está acontecendo.
                        </Typography>
                    </motion.div>
                </Box>

                <Box sx={{ position: 'relative' }}>
                    {/* Linha do Tempo Conectora */}
                    <Box
                        sx={{
                            position: 'absolute',
                            left: isMobile ? '45px' : '50%', // Ajuste da linha no mobile
                            top: 0, bottom: 0, width: '2px',
                            background: 'rgba(255,255,255,0.05)',
                            transform: 'translateX(-50%)',
                            zIndex: 0
                        }}
                    >
                        <motion.div
                            style={{
                                scaleY,
                                transformOrigin: 'top',
                                background: 'linear-gradient(180deg, #F59E0B 0%, #8B5CF6 50%, #10B981 100%)', // Gradiente acompanhando as cores dos passos
                                width: '100%', height: '100%',
                                boxShadow: '0 0 15px rgba(139, 92, 246, 0.3)'
                            }}
                        />
                    </Box>

                    {/* Render dos Passos */}
                    <Box sx={{ position: 'relative', zIndex: 1, mt: 5 }}>
                        {steps.map((step, index) => (
                            <ProcessStep key={step.id} step={step} index={index} isMobile={isMobile} />
                        ))}
                    </Box>

                    {/* Call to Action Final */}
                    <Box textAlign="center" mt={5}>
                        <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                            Gostou do processo?
                        </Typography>
                        {/* Aqui poderia vir um botão chamando pro contato */}
                    </Box>
                </Box>

            </Container>
        </Box>
    );
}

