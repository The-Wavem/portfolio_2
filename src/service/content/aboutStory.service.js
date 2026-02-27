export const aboutStoryContent = {
    eyebrow: 'NOSSA HISTÓRIA',
    title: 'Somos pessoas apaixonadas por transformar ideias em produtos digitais que funcionam no mundo real.',
    paragraphs: [
        'A The Wavem nasceu da vontade de tirar projetos do papel com qualidade técnica e comunicação clara. A gente acredita que tecnologia boa não é só bonita: ela precisa resolver problema, gerar resultado e ser sustentável para crescer.',
        'Por isso, atuamos com criação e manutenção de aplicações web e mobile, evoluindo cada projeto com responsabilidade, visão de negócio e proximidade com o cliente em todas as etapas.'
    ],
    pillars: [
        {
            id: 'missao',
            title: 'Missão',
            description: 'Construir soluções digitais confiáveis, úteis e escaláveis para acelerar negócios reais.'
        },
        {
            id: 'visao',
            title: 'Como trabalhamos',
            description: 'Unimos estratégia, design e engenharia com entregas objetivas, transparência e melhoria contínua.'
        },
        {
            id: 'compromisso',
            title: 'Compromisso',
            description: 'Tratar cada projeto como parceria de longo prazo, do primeiro rascunho até a operação em produção.'
        }
    ]
};

export function getAboutStoryContent() {
    return aboutStoryContent;
}
