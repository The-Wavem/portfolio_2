export const contactChannels = [
    {
        id: 'whatsapp',
        title: 'WhatsApp direto',
        subtitle: 'Resposta rápida em horário comercial',
        cta: 'Conversar no WhatsApp',
        href: 'https://wa.me/5541995424186?text=Ol%C3%A1%2C%20The%20Wavem!%20Quero%20falar%20sobre%20um%20projeto.',
        accent: '#25D366',
        kind: 'external'
    },
    {
        id: 'email',
        title: 'E-mail profissional',
        subtitle: 'Para escopo detalhado e anexos',
        cta: 'Enviar e-mail',
        href: 'mailto:contato.thewavem@gmail.com?subject=Novo%20projeto%20-%20The%20Wavem&body=Ol%C3%A1%20time%20The%20Wavem%2C%0A%0AQuero%20conversar%20sobre%20um%20projeto.%0A%0AObjetivo%3A%0APrazo%3A%0AOr%C3%A7amento%3A%0A%0AObrigado!',
        accent: '#7C3AED',
        kind: 'email'
    }
];

export const contactAssurances = [
    {
        id: 1,
        title: 'Canal aberto na hora',
        description: 'Você clica e já cai no canal escolhido, com mensagem inicial pronta.'
    },
    {
        id: 2,
        title: 'Confirmação sem dúvida',
        description: 'Nada de “será que enviou?”: o envio acontece no próprio WhatsApp ou e-mail.'
    },
    {
        id: 3,
        title: 'Próximo passo claro',
        description: 'Respondemos com diagnóstico inicial e proposta de direção para o projeto.'
    }
];

export function getContactChannels() {
    return contactChannels;
}

export function getContactAssurances() {
    return contactAssurances;
}
