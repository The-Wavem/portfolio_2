export const aboutStoryContent = {
    eyebrow: 'NOSSA HISTÓRIA',
    title: 'A The Wavem nasceu de uma conversa entre amigos programadores que decidiram construir algo maior juntos.',
    paragraphs: [
        'Em uma semana comum no trabalho de carteira assinada, um amigo do Eduardo precisava de ajuda para tirar um projeto web do papel. A conversa foi crescendo entre nós seis e, quando percebemos, já estávamos desenhando a aplicação completa em equipe.',
        'Foi desse momento que surgiu a The Wavem. Mais do que um grupo de desenvolvedores, somos uma mente coletiva unindo estratégia, design e engenharia para criar sistemas que funcionam na prática e evoluem com segurança.',
        'Nosso foco sempre é o usuário e o cliente ao mesmo tempo: quem paga pelo sistema e quem usa no dia a dia. Por isso, priorizamos experiência real, facilidade de uso, escalabilidade e decisões compartilhadas. Aqui o cliente participa de verdade da construção e acompanha cada etapa com clareza.'
    ],
    pillars: [
        {
            id: 'origem',
            title: 'Origem',
            description: 'A ideia começou em um projeto real entre amigos e virou uma operação colaborativa com propósito claro: transformar boas ideias em produtos confiáveis.'
        },
        {
            id: 'como-pensamos',
            title: 'Como pensamos',
            description: 'Não escolhemos tecnologia por tendência. Escolhemos o que melhora a jornada, reduz fricção e sustenta o crescimento do negócio no longo prazo.'
        },
        {
            id: 'processo',
            title: 'Processo com parceria',
            description: 'Trabalhamos em cinco etapas: Café Virtual (Descoberta & Conexão), Rascunho & Escopo, Design & Contrato, Desenvolvimento Puro e Deploy & Evolução.'
        }
    ]
};

export function getAboutStoryContent() {
    return aboutStoryContent;
}
