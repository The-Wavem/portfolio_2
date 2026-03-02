export const experienceItems = [
    {
        id: 1,
        title: 'Engenharia de Interface',
        role: 'Frontend & Design System',
        description: 'Não entregamos apenas telas, entregamos sistemas de design componentizados. Interfaces reativas que garantem consistência visual e manutenibilidade a longo prazo.',
        techs: [
            { name: 'React' },
            { name: 'Figma' },
            { name: 'Material UI' }
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
            { name: 'Firebase' },
            { name: 'Node.js' },
            { name: 'GCP' }
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
            { name: 'React Native' },
            { name: 'Swift' },
            { name: 'Flutter' }
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
            { name: 'OWASP' },
            { name: 'Pen Testing' },
            { name: 'Compliance' }
        ],
        color: '#F87171',
        bgType: 'code'
    }
];

export function getExperienceItems() {
    return experienceItems;
}
