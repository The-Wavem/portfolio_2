import { homeEditorConfig } from './homeEditor.config';
import { servicesEditorConfig } from './servicesEditor.config';
import { aboutEditorConfig } from './aboutEditor.config';
import { projectsEditorConfig } from './projectsEditor.config';

export const pageLabelByKey = {
    home: 'Home',
    servicos: 'Serviços',
    sobre: 'Sobre',
    projetos: 'Projetos'
};

export const editorConfigByPageSection = {
    home: homeEditorConfig,
    servicos: servicesEditorConfig,
    sobre: aboutEditorConfig,
    projetos: projectsEditorConfig
};
