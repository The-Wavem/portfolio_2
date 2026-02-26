export const processSteps = [
    {
        id: 1,
        title: 'Descoberta & Conexão',
        subtitle: 'O Café Virtual',
        description: 'Tudo começa com uma conversa sem compromisso. Queremos ouvir sua ideia, entender suas dores e ver se temos a química certa para trabalharmos juntos. Sem termos técnicos difíceis aqui.',
        iconKey: 'coffee',
        color: '#F59E0B'
    },
    {
        id: 2,
        title: 'Rascunho & Escopo',
        subtitle: 'A Visão Toma Forma',
        description: 'Desenhamos os primeiros protótipos (wireframes) para validar se estamos na mesma página. Com a ideia visualizada, definimos o escopo real e apresentamos um orçamento justo.',
        iconKey: 'pencil',
        color: '#EC4899'
    },
    {
        id: 3,
        title: 'Design & Contrato',
        subtitle: 'Formalização',
        description: 'Com o aperto de mão (digital) e contrato assinado, nossa equipe foca nos detalhes. Criamos o layout final em alta fidelidade no Figma. É aqui que seu projeto ganha cara e cor.',
        iconKey: 'file',
        color: '#8B5CF6'
    },
    {
        id: 4,
        title: 'Desenvolvimento Puro',
        subtitle: 'Construção da Estrutura',
        description: 'Aprovou o design? Agora é conosco. Codificamos a estrutura robusta do sistema. Para garantir a entrega no prazo, mudanças estruturais nesta etapa exigem revisão, garantindo o foco total.',
        iconKey: 'code',
        color: '#3B82F6'
    },
    {
        id: 5,
        title: 'Deploy & Evolução',
        subtitle: 'O Grande Lançamento',
        description: 'Configuramos servidores, domínio e colocamos seu projeto no ar. Oferecemos planos de suporte contínuo para que você nunca fique na mão e seu sistema continue evoluindo.',
        iconKey: 'rocket',
        color: '#10B981'
    }
];

export function getProcessSteps() {
    return processSteps;
}
