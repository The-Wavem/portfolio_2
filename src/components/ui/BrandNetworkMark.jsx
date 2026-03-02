import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import { getCurrentPathname, getRouteBrandTheme } from '@/theme/routeBrandTheme';

const MotionSvg = motion.create('svg');
const MotionCircle = motion.create('circle');
const MotionLine = motion.create('line');
const MotionPath = motion.create('path');
const MotionG = motion.create('g');

const nodes = [
    { id: 'l1', x: 90, y: 122, r: 34 },
    { id: 'l2', x: 234, y: 48, r: 28 },
    { id: 'l3', x: 186, y: 238, r: 24 },
    { id: 'r1', x: 620, y: 82, r: 28 },
    { id: 'r2', x: 668, y: 166, r: 31 },
    { id: 'r3', x: 538, y: 236, r: 24 }
];

const links = [
    ['l1', 'l2'],
    ['l1', 'l3'],
    ['l1', 'r2'],
    ['r1', 'r2'],
    ['r2', 'r3']
];

function findNode(nodeId) {
    return nodes.find((node) => node.id === nodeId);
}

function hexToRgba(hex, alpha) {
    if (typeof hex !== 'string') {
        return hex;
    }

    const value = hex.replace('#', '');
    const isShort = value.length === 3;
    const isLong = value.length === 6;

    if (!isShort && !isLong) {
        return hex;
    }

    const normalized = isShort
        ? value.split('').map((char) => `${char}${char}`).join('')
        : value;

    const red = Number.parseInt(normalized.slice(0, 2), 16);
    const green = Number.parseInt(normalized.slice(2, 4), 16);
    const blue = Number.parseInt(normalized.slice(4, 6), 16);

    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

export default function BrandNetworkMark({
    size = 420,
    textColor,
    nodeColor,
    linkColor,
    surface = 'dark'
}) {
    const currentPath = getCurrentPathname();
    const routeTheme = getRouteBrandTheme(currentPath);
    const autoNodeColor = routeTheme.end;
    const autoLinkColor = routeTheme.start;
    const resolvedNodeColor = nodeColor || autoNodeColor;
    const resolvedLinkColor = linkColor || autoLinkColor;
    const resolvedTextColor = textColor || (surface === 'light' ? '#111111' : '#F5F5F5');

    const nodeStart = hexToRgba(resolvedNodeColor, 0.75);
    const nodeEnd = hexToRgba(resolvedNodeColor, 1);
    const linkStroke = hexToRgba(resolvedLinkColor, 0.88);

    return (
        <Box sx={{ width: size, maxWidth: '100%', height: size * 0.4 }}>
            <MotionSvg
                viewBox="0 0 760 300"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: '100%', height: '100%', overflow: 'visible' }}
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.42, ease: 'easeOut' }}
            >
                <defs>
                    <linearGradient id="wavemNodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={nodeStart} />
                        <stop offset="100%" stopColor={nodeEnd} />
                    </linearGradient>
                    <linearGradient id="wavemShieldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={nodeStart} />
                        <stop offset="100%" stopColor={nodeEnd} />
                    </linearGradient>
                </defs>

                <MotionPath
                    d="M382 95 L438 119 L425 197 L382 238 L339 197 L326 119 Z"
                    fill="url(#wavemShieldGradient)"
                    initial={{ opacity: 0.45, scale: 0.95 }}
                    animate={{ opacity: [0.48, 0.75, 0.48], scale: [1, 1.03, 1] }}
                    transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ transformOrigin: '382px 166px' }}
                />

                {links.map(([sourceId, targetId], index) => {
                    const source = findNode(sourceId);
                    const target = findNode(targetId);

                    if (!source || !target) {
                        return null;
                    }

                    return (
                        <MotionLine
                            key={`${sourceId}-${targetId}`}
                            x1={source.x}
                            y1={source.y}
                            x2={target.x}
                            y2={target.y}
                            stroke={linkStroke}
                            strokeWidth="8"
                            strokeLinecap="round"
                            initial={{ pathLength: 0, opacity: 0.25 }}
                            animate={{ pathLength: 1, opacity: [0.35, 0.86, 0.35] }}
                            transition={{
                                pathLength: { duration: 0.72, delay: index * 0.05 },
                                opacity: { duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: index * 0.09 }
                            }}
                        />
                    );
                })}

                {nodes.map((node, index) => (
                    <MotionCircle
                        key={node.id}
                        cx={node.x}
                        cy={node.y}
                        r={node.r}
                        fill="url(#wavemNodeGradient)"
                        initial={{ scale: 0.6, opacity: 0.35 }}
                        animate={{ scale: [1, 1.05, 1], opacity: [0.72, 1, 0.72] }}
                        transition={{
                            scale: { duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.16 },
                            opacity: { duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.16 },
                            default: { duration: 0.42, delay: 0.08 * index }
                        }}
                    />
                ))}

                <MotionG
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.18 }}
                >
                    <text
                        x="380"
                        y="134"
                        textAnchor="middle"
                        fill={resolvedTextColor}
                        fontSize="72"
                        fontFamily="Inter, Arial, sans-serif"
                        letterSpacing="4"
                        fontWeight="500"
                    >
                        THE
                    </text>
                    <text
                        x="380"
                        y="236"
                        textAnchor="middle"
                        fill={resolvedTextColor}
                        fontSize="124"
                        fontFamily="Inter, Arial, sans-serif"
                        letterSpacing="7"
                        fontWeight="500"
                    >
                        WAVEM
                    </text>
                </MotionG>
            </MotionSvg>
        </Box>
    );
}
