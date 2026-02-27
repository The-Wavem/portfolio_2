import {
    SiAdobe,
    SiCypress,
    SiDart,
    SiDocker,
    SiExpo,
    SiFigma,
    SiFirebase,
    SiFlutter,
    SiGithub,
    SiGithubactions,
    SiGrafana,
    SiKubernetes,
    SiMui,
    SiNestjs,
    SiNodedotjs,
    SiNotion,
    SiPostgresql,
    SiPostman,
    SiPrometheus,
    SiRabbitmq,
    SiReact,
    SiRedis,
    SiStorybook,
    SiSupabase,
    SiSwift,
    SiTerraform,
    SiTypescript
} from 'react-icons/si';

const stackIconMap = {
    react: SiReact,
    'react expo': SiExpo,
    'framer motion': SiReact,
    figma: SiFigma,
    firebase: SiFirebase,
    'node.js': SiNodedotjs,
    nestjs: SiNestjs,
    postgresql: SiPostgresql,
    redis: SiRedis,
    docker: SiDocker,
    figjam: SiFigma,
    'adobe cc': SiAdobe,
    notion: SiNotion,
    maze: SiFigma,
    'react native': SiReact,
    swift: SiSwift,
    flutter: SiFlutter,
    expo: SiExpo,
    'github actions': SiGithubactions,
    azure: SiGithub,
    terraform: SiTerraform,
    kubernetes: SiKubernetes,
    playwright: SiCypress,
    cypress: SiCypress,
    'owasp zap': SiPostman,
    snyk: SiGithub,
    postman: SiPostman,
    reanimated: SiReact,
    supabase: SiSupabase,
    dart: SiDart,
    'ci/cd': SiGithubactions,
    'cloud apis': SiGithub,
    grafana: SiGrafana,
    prometheus: SiPrometheus,
    typescript: SiTypescript,
    rabbitmq: SiRabbitmq,
    'design tokens': SiFigma,
    storybook: SiStorybook,
    research: SiFigma,
    'ux writing': SiFigma,
    prototipação: SiFigma,
    dashboards: SiGrafana,
    'qa metrics': SiCypress,
    'threat modeling': SiPostman,
    sast: SiGithub,
    mui: SiMui
};

export function getToolMeta(tool) {
    return {
        key: tool.key.toLowerCase().trim(),
        name: tool.label ?? tool.name ?? tool.key
    };
}

export function getStackIcon(toolKey) {
    const key = toolKey.toLowerCase().trim();
    return stackIconMap[key];
}
