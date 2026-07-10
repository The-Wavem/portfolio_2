export const experienceItems = [
    {
        id: 'design',
        title: 'Design Centrado no Negócio',
        role: 'Experiência & Conversão',
        description: 'Interfaces práticas para o gestor e intuitivas para o usuário final. Focamos em jornadas claras que reduzem fricção e potencializam os resultados do seu produto.',
        color: '#A78BFA',
        bgType: 'code',
        tags: ['UX/UI', 'Figma', 'React', 'Framer Motion']
    },
    {
        id: 'architecture',
        title: 'Arquitetura Transparente',
        role: 'Escalabilidade & Performance',
        description: 'Sistemas robustos e escaláveis sem dores de cabeça com infraestrutura. Construímos bases sólidas para que sua operação cresça sem gargalos técnicos.',
        color: '#34D399',
        bgType: 'json',
        tags: ['Node.js', 'Firebase', 'PostgreSQL', 'AWS']
    },
    {
        id: 'mobile',
        title: 'Presença Nativa',
        role: 'Mobilidade & Engajamento',
        description: 'Aplicativos fluidos para aproximar a marca do dia a dia do cliente. Experiências imersivas nas palmas das mãos, mantendo seu negócio sempre acessível.',
        color: '#60A5FA',
        bgType: 'grid',
        tags: ['React Native', 'Swift', 'Kotlin']
    },
    {
        id: 'security',
        title: 'Confiança & Governança',
        role: 'Segurança & Estabilidade',
        description: 'Segurança blindada protegendo as operações do proprietário. Práticas de desenvolvimento rigorosas para garantir a integridade dos dados e a conformidade do seu negócio.',
        color: '#F87171',
        bgType: 'code',
        tags: ['Auth0', 'Jest', 'CI/CD']
    }
];

export function getExperienceItems() {
    return experienceItems;
}
