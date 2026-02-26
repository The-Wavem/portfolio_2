export const experienceItems = [
    {
        id: 1,
        title: 'Engenharia de Interface',
        role: 'Frontend & Design System',
        description: 'Não entregamos apenas telas, entregamos sistemas de design componentizados. Interfaces reativas que garantem consistência visual e manutenibilidade a longo prazo.',
        techs: [
            { name: 'React / Next.js', iconKey: 'react' },
            { name: 'Figma', iconKey: 'figma' },
            { name: 'Tailwind', iconKey: 'tailwind' }
        ],
        color: '#A78BFA',
        bgType: 'code'
    },
    {
        id: 2,
        title: 'Arquitetura Cloud & Dados',
        role: 'Backend & Serverless',
        description: 'Escalabilidade nativa. Construímos APIs que aguentam picos de tráfego usando arquitetura serverless, reduzindo custos de infraestrutura ociosa.',
        techs: [
            { name: 'Firebase', iconKey: 'firebase' },
            { name: 'Node.js', iconKey: 'node' },
            { name: 'GCP', iconKey: 'gcp' }
        ],
        color: '#34D399',
        bgType: 'json'
    },
    {
        id: 3,
        title: 'Ecossistema Mobile',
        role: 'iOS & Android',
        description: 'Apps nativos e híbridos com performance de 60fps. Unificamos a lógica de negócios enquanto respeitamos as diretrizes de design da Apple e Google.',
        techs: [
            { name: 'React Native', iconKey: 'react' },
            { name: 'Swift', iconKey: 'swift' },
            { name: 'Flutter', iconKey: 'flutter' }
        ],
        color: '#60A5FA',
        bgType: 'grid'
    },
    {
        id: 4,
        title: 'Cybersegurança',
        role: 'Proteção & Compliance',
        description: 'Segurança integrada desde o design. Implementamos práticas de segurança em cada etapa do desenvolvimento, garantindo proteção contra ameaças e conformidade com regulamentações.',
        techs: [
            { name: 'OWASP', iconKey: 'ruler' },
            { name: 'Pen Testing', iconKey: 'code' },
            { name: 'Compliance', iconKey: 'json' }
        ],
        color: '#F87171',
        bgType: 'code'
    }
];

export function getExperienceItems() {
    return experienceItems;
}
