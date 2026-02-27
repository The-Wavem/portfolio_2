export const aboutMembers = [
    {
        id: 1,
        name: 'Weslley',
        role: 'Product Engineer',
        headline: 'Frontend estratégico com foco em conversão e experiência premium.',
        bio: 'Atua na ponte entre negócio, design e engenharia para transformar requisitos em produtos digitais claros, rápidos e escaláveis.',
        accent: '#7C3AED',
        photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80',
        specialties: ['React', 'UX de conversão', 'Arquitetura de interface'],
        workTools: [
            { key: 'react', name: 'React' },
            { key: 'React Expo', name: 'React Expo' },
            { key: 'framer motion', name: 'Framer Motion' },
            { key: 'figma', name: 'Figma' },
            { key: 'firebase', name: 'Firebase' }
        ],
        softSkills: ['Resolução de problemas', 'Conversação técnica', 'Organização técnica'],
        hobbies: ['RPG', 'Filmes', 'HQs'],
        focuses: ['Landing pages de alta conversão', 'Design systems', 'Performance web'],
        personalProjects: [
            {
                name: 'Studio Booking',
                description: 'Plataforma para agendamento de serviços com painel operacional.',
                tools: [
                    { key: 'react', label: 'React' },
                    { key: 'firebase', label: 'Firebase' },
                    { key: 'mui', label: 'MUI' }
                ],
                cover: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80',
                href: 'https://example.com'
            },
            {
                name: 'Creator Hub',
                description: 'Dashboard para creators com automações e métricas de conteúdo.',
                tools: [
                    { key: 'next.js', label: 'Next.js' },
                    { key: 'node.js', label: 'Node.js' },
                    { key: 'postgresql', label: 'PostgreSQL' }
                ],
                cover: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80',
                href: 'https://example.com'
            }
        ],
        links: [
            { key: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com' },
            { key: 'github', label: 'GitHub', href: 'https://github.com' }
        ]
    },
    {
        id: 2,
        name: 'Membro 02',
        role: 'Backend Engineer',
        headline: 'APIs robustas e integrações confiáveis para sistemas em produção.',
        bio: 'Especialista em arquitetura de serviços, regras de negócio e observabilidade para manter aplicações estáveis em escala.',
        accent: '#34D399',
        photo: 'https://images.unsplash.com/photo-1542204625-de293a4fd3c9?auto=format&fit=crop&w=1200&q=80',
        specialties: ['Node.js', 'Arquitetura de APIs', 'Banco de dados'],
        workTools: [
            { key: 'node.js', name: 'Node.js' },
            { key: 'nestjs', name: 'NestJS' },
            { key: 'postgresql', name: 'PostgreSQL' },
            { key: 'redis', name: 'Redis' },
            { key: 'docker', name: 'Docker' }
        ],
        softSkills: ['Resolução de problemas', 'Pensamento analítico', 'Organização técnica'],
        hobbies: ['Xadrez', 'Filmes sci-fi', 'Automação pessoal'],
        focuses: ['Sistemas internos', 'Integrações com gateways', 'Automação operacional'],
        personalProjects: [
            {
                name: 'Ops Monitor',
                description: 'Central de monitoramento com alertas e análise de incidentes.',
                tools: [
                    { key: 'node.js', label: 'Node.js' },
                    { key: 'grafana', label: 'Grafana' },
                    { key: 'prometheus', label: 'Prometheus' }
                ],
                cover: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
                href: 'https://example.com'
            },
            {
                name: 'Flow Integrator',
                description: 'Orquestrador de integrações para processos comerciais.',
                tools: [
                    { key: 'typescript', label: 'TypeScript' },
                    { key: 'rabbitmq', label: 'RabbitMQ' },
                    { key: 'postgresql', label: 'PostgreSQL' }
                ],
                cover: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
                href: 'https://example.com'
            }
        ],
        links: [
            { key: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com' },
            { key: 'github', label: 'GitHub', href: 'https://github.com' }
        ]
    },
    {
        id: 3,
        name: 'Membro 03',
        role: 'UI/UX Designer',
        headline: 'Identidade visual forte com interfaces elegantes e funcionais.',
        bio: 'Conduz pesquisas, prototipação e linguagem visual para produtos digitais que comunicam valor com clareza.',
        accent: '#60A5FA',
        photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80',
        specialties: ['Figma', 'UX Writing', 'UI Systems'],
        workTools: [
            { key: 'figma', name: 'Figma' },
            { key: 'figjam', name: 'FigJam' },
            { key: 'adobe cc', name: 'Adobe CC' },
            { key: 'notion', name: 'Notion' },
            { key: 'maze', name: 'Maze' }
        ],
        softSkills: ['Empatia com usuário', 'Storytelling visual', 'Facilitação de workshops'],
        hobbies: ['Fotografia', 'Arte digital', 'Leitura sobre design'],
        focuses: ['Web institucional premium', 'Fluxos de onboarding', 'Direção de interface'],
        personalProjects: [
            {
                name: 'Brand Blocks',
                description: 'Biblioteca visual para marcas digitais em crescimento.',
                tools: [
                    { key: 'figma', label: 'Figma' },
                    { key: 'design tokens', label: 'Design Tokens' },
                    { key: 'storybook', label: 'Storybook' }
                ],
                cover: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80',
                href: 'https://example.com'
            },
            {
                name: 'UX Canvas',
                description: 'Framework prático para definição de jornadas de usuário.',
                tools: [
                    { key: 'research', label: 'Research' },
                    { key: 'ux writing', label: 'UX Writing' },
                    { key: 'prototipação', label: 'Prototipação' }
                ],
                cover: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=80',
                href: 'https://example.com'
            }
        ],
        links: [
            { key: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com' },
            { key: 'behance', label: 'Behance', href: 'https://behance.net' }
        ]
    },
    {
        id: 4,
        name: 'Membro 04',
        role: 'Mobile Engineer',
        headline: 'Apps iOS/Android com performance alta e experiência nativa.',
        bio: 'Foca em arquitetura mobile e experiência contínua entre dispositivos para produtos de uso diário.',
        accent: '#F59E0B',
        photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80',
        specialties: ['React Native', 'Swift', 'Flutter'],
        workTools: [
            { key: 'react native', name: 'React Native' },
            { key: 'swift', name: 'Swift' },
            { key: 'flutter', name: 'Flutter' },
            { key: 'firebase', name: 'Firebase' },
            { key: 'expo', name: 'Expo' }
        ],
        softSkills: ['Foco em entrega', 'Adaptabilidade', 'Comunicação objetiva'],
        hobbies: ['Academia', 'Games mobile', 'Trilhas'],
        focuses: ['Aplicativos de serviço', 'MVPs mobile', 'Integração com backend'],
        personalProjects: [
            {
                name: 'Fit Journey',
                description: 'App de rotinas e progresso com gamificação leve.',
                tools: [
                    { key: 'react native', label: 'React Native' },
                    { key: 'firebase', label: 'Firebase' },
                    { key: 'reanimated', label: 'Reanimated' }
                ],
                cover: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=80',
                href: 'https://example.com'
            },
            {
                name: 'Smart Tasks',
                description: 'Gerenciador de tarefas com notificações inteligentes.',
                tools: [
                    { key: 'flutter', label: 'Flutter' },
                    { key: 'dart', label: 'Dart' },
                    { key: 'supabase', label: 'Supabase' }
                ],
                cover: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
                href: 'https://example.com'
            }
        ],
        links: [
            { key: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com' },
            { key: 'github', label: 'GitHub', href: 'https://github.com' }
        ]
    },
    {
        id: 5,
        name: 'Membro 05',
        role: 'Cloud & DevOps',
        headline: 'Infraestrutura segura e automação para deploy contínuo.',
        bio: 'Projeta pipelines e infraestrutura com foco em confiabilidade, custo controlado e escalabilidade.',
        accent: '#EC4899',
        photo: 'https://images.unsplash.com/photo-1590086782957-93c06ef21604?auto=format&fit=crop&w=1200&q=80',
        specialties: ['CI/CD', 'Cloud', 'Observabilidade'],
        workTools: [
            { key: 'github actions', name: 'GitHub Actions' },
            { key: 'azure', name: 'Azure' },
            { key: 'docker', name: 'Docker' },
            { key: 'terraform', name: 'Terraform' },
            { key: 'kubernetes', name: 'Kubernetes' }
        ],
        softSkills: ['Planejamento de risco', 'Disciplina operacional', 'Senso de dono'],
        hobbies: ['Mecânica', 'Ciclismo', 'Podcasts de tecnologia'],
        focuses: ['Deploy automatizado', 'Monitoramento', 'Hardening de ambiente'],
        personalProjects: [
            {
                name: 'Deploy Guard',
                description: 'Pipeline com validação de qualidade e rollback automático.',
                tools: [
                    { key: 'ci/cd', label: 'CI/CD' },
                    { key: 'docker', label: 'Docker' },
                    { key: 'sast', label: 'SAST' }
                ],
                cover: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=1200&q=80',
                href: 'https://example.com'
            },
            {
                name: 'Infra Lens',
                description: 'Painel de custos e saúde de infraestrutura cloud.',
                tools: [
                    { key: 'terraform', label: 'Terraform' },
                    { key: 'grafana', label: 'Grafana' },
                    { key: 'cloud apis', label: 'Cloud APIs' }
                ],
                cover: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
                href: 'https://example.com'
            }
        ],
        links: [
            { key: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com' },
            { key: 'github', label: 'GitHub', href: 'https://github.com' }
        ]
    },
    {
        id: 6,
        name: 'Membro 06',
        role: 'QA & Segurança',
        headline: 'Qualidade e segurança aplicadas desde o início do projeto.',
        bio: 'Conduz estratégia de testes e revisão de segurança para reduzir riscos e elevar a confiança de entrega.',
        accent: '#F87171',
        photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1200&q=80',
        specialties: ['Testes E2E', 'OWASP', 'Qualidade contínua'],
        workTools: [
            { key: 'playwright', name: 'Playwright' },
            { key: 'cypress', name: 'Cypress' },
            { key: 'owasp zap', name: 'OWASP ZAP' },
            { key: 'snyk', name: 'Snyk' },
            { key: 'postman', name: 'Postman' }
        ],
        softSkills: ['Atenção a detalhes', 'Pensamento crítico', 'Comunicação assertiva'],
        hobbies: ['Quebra-cabeças', 'Livros de não ficção', 'Treino funcional'],
        focuses: ['Prevenção de regressão', 'Auditoria técnica', 'Confiabilidade de release'],
        personalProjects: [
            {
                name: 'Quality Pulse',
                description: 'Métricas automatizadas de qualidade por sprint.',
                tools: [
                    { key: 'playwright', label: 'Playwright' },
                    { key: 'dashboards', label: 'Dashboards' },
                    { key: 'qa metrics', label: 'QA Metrics' }
                ],
                cover: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
                href: 'https://example.com'
            },
            {
                name: 'Secure Review',
                description: 'Checklist técnico para revisão de segurança em apps web.',
                tools: [
                    { key: 'owasp', label: 'OWASP' },
                    { key: 'threat modeling', label: 'Threat Modeling' },
                    { key: 'sast', label: 'SAST' }
                ],
                cover: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
                href: 'https://example.com'
            }
        ],
        links: [
            { key: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com' },
            { key: 'github', label: 'GitHub', href: 'https://github.com' }
        ]
    }
];

export function getAboutMembers() {
    return aboutMembers;
}
