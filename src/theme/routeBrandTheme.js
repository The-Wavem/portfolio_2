const routeBrandThemeMap = {
    '/': { start: '#7C3AED', end: '#A78BFA' },
    '/servicos': { start: '#5E1624', end: '#8C2438' },
    '/sobre': { start: '#06B6D4', end: '#38BDF8' },
    '/projetos': { start: '#22C55E', end: '#4ADE80' },
    '/contato': { start: '#F59E0B', end: '#FBBF24' }
};

export function getRouteBrandTheme(pathname = '/') {
    const matchedRoute = Object.keys(routeBrandThemeMap)
        .filter((route) => route !== '/')
        .find((route) => pathname.startsWith(route));

    if (matchedRoute) {
        return routeBrandThemeMap[matchedRoute];
    }

    return routeBrandThemeMap['/'];
}

export function getCurrentPathname() {
    if (typeof window === 'undefined') {
        return '/';
    }

    return window.location.pathname || '/';
}

export default routeBrandThemeMap;
