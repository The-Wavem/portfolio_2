import * as SimpleIcons from 'react-icons/si';

function normalizeValue(value) {
    return String(value ?? '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim();
}

function normalizeStrict(value) {
    return normalizeValue(value).replace(/[^a-z0-9]/g, '');
}

function expandTokenVariants(value) {
    const normalized = normalizeValue(value);
    const strict = normalizeStrict(value);

    const expanded = normalizeStrict(
        normalized
            .replace(/\.js/g, ' dotjs')
            .replace(/\+/g, ' plus ')
            .replace(/#/g, ' sharp ')
            .replace(/&/g, ' and ')
            .replace(/\//g, ' ')
    );

    return [strict, expanded].filter(Boolean);
}

function getAcronyms(value) {
    const text = String(value ?? '').trim();
    if (!text) {
        return [];
    }

    const upperOnly = text.replace(/[^A-Z]/g, '').toLowerCase();
    const words = text
        .toLowerCase()
        .split(/[^a-z0-9]+/)
        .filter(Boolean);
    const initials = words.map((word) => word[0]).join('');

    return [upperOnly, initials].filter(Boolean);
}

function buildIconAliasMap() {
    const map = new Map();

    Object.entries(SimpleIcons).forEach(([exportName, Icon]) => {
        if (!exportName.startsWith('Si') || typeof Icon !== 'function') {
            return;
        }

        const base = exportName.slice(2).toLowerCase();
        const aliases = [
            base,
            base.replace(/dot/g, ''),
            base.replace(/plus/g, ''),
            base.replace(/sharp/g, ''),
            base.replace(/and/g, '')
        ];

        aliases.forEach((alias) => {
            const normalized = normalizeStrict(alias);
            if (normalized && !map.has(normalized)) {
                map.set(normalized, Icon);
            }
        });
    });

    return map;
}

const iconAliasMap = buildIconAliasMap();

export function getToolMeta(tool) {
    if (typeof tool === 'string') {
        return {
            key: tool.toLowerCase().trim(),
            name: tool
        };
    }

    const rawKey = tool?.key ?? tool?.iconKey ?? tool?.name ?? tool?.label ?? '';
    const rawName = tool?.label ?? tool?.name ?? tool?.key ?? tool?.iconKey ?? '';

    return {
        key: String(rawKey).toLowerCase().trim(),
        name: String(rawName)
    };
}

const KEYWORD_ICON_FALLBACKS = [
    { pattern: /firebase|firestore/i, alias: 'firebase' },
    { pattern: /react/i, alias: 'react' },
    { pattern: /next(\.js|js)?/i, alias: 'nextdotjs' },
    { pattern: /node(\.js|js)?/i, alias: 'nodedotjs' },
    { pattern: /css\s*\.?\s*module/i, alias: 'cssmodules' },
    { pattern: /\bcss\b/i, alias: 'css3' },
    { pattern: /\bhtml\b/i, alias: 'html5' },
    { pattern: /material\s*ui|\bmui\b/i, alias: 'mui' },
    { pattern: /tailwind/i, alias: 'tailwindcss' },
    { pattern: /framer\s*motion/i, alias: 'framer' },
    { pattern: /postgres/i, alias: 'postgresql' },
    { pattern: /typescript|\bts\b/i, alias: 'typescript' },
    { pattern: /javascript|\bjs\b/i, alias: 'javascript' },
    { pattern: /python/i, alias: 'python' },
    { pattern: /docker/i, alias: 'docker' },
    { pattern: /stripe/i, alias: 'stripe' },
    { pattern: /cloudflare/i, alias: 'cloudflare' },
    { pattern: /vercel/i, alias: 'vercel' },
    { pattern: /netlify/i, alias: 'netlify' },
    { pattern: /figma/i, alias: 'figma' },
    { pattern: /git\b/i, alias: 'git' },
    { pattern: /github/i, alias: 'github' },
    { pattern: /mysql|sql/i, alias: 'mysql' },
    { pattern: /mongodb|mongo/i, alias: 'mongodb' },
    { pattern: /aws|amazon/i, alias: 'amazonaws' },
    { pattern: /vite/i, alias: 'vite' }
];

export function getStackIcon(toolMeta) {
    const rawString = `${toolMeta.key || ''} ${toolMeta.name || ''}`.trim();
    const directAliases = [
        toolMeta.key,
        toolMeta.name,
        // Strip version numbers like "React 19" -> "React" or "API v4"
        String(toolMeta.name || '').replace(/\b(v?\d+(\.\d+)*)\b/gi, '').trim()
    ].filter(Boolean);

    const allAliases = [
        ...directAliases.flatMap((value) => expandTokenVariants(value)),
        ...directAliases.flatMap((value) => getAcronyms(value).flatMap((alias) => expandTokenVariants(alias)))
    ];

    for (const alias of allAliases) {
        const icon = iconAliasMap.get(alias);
        if (icon) {
            return icon;
        }
    }

    for (const { pattern, alias } of KEYWORD_ICON_FALLBACKS) {
        if (pattern.test(rawString)) {
            const icon = iconAliasMap.get(alias);
            if (icon) {
                return icon;
            }
        }
    }

    // Try matching individual words (longest first) for compound names
    const words = rawString
        .toLowerCase()
        .split(/[^a-z0-9+#.]+/)
        .filter((w) => w.length >= 3)
        .sort((a, b) => b.length - a.length);

    for (const word of words) {
        for (const variant of expandTokenVariants(word)) {
            const icon = iconAliasMap.get(variant);
            if (icon) {
                return icon;
            }
        }
    }

    return null;
}
