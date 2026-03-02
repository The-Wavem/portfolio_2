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

export function getStackIcon(toolMeta) {
    const directAliases = [toolMeta.key, toolMeta.name];
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

    return null;
}
