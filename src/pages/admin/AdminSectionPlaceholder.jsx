import { useEffect, useState } from 'react';
import { Alert, Box, Button, Chip, Container, Stack, TextField, Typography } from '@mui/material';
import { NavLink, useParams } from 'react-router-dom';
import { editorConfigByPageSection, pageLabelByKey } from './editors';

function getNestedValue(obj, path) {
    return path.split('.').reduce((acc, key) => (acc ? acc[key] : undefined), obj);
}

function setNestedValue(obj, path, value) {
    const keys = path.split('.');
    const clone = structuredClone(obj);
    let current = clone;

    for (let index = 0; index < keys.length - 1; index += 1) {
        const key = keys[index];
        if (typeof current[key] !== 'object' || current[key] === null) {
            current[key] = {};
        }
        current = current[key];
    }

    current[keys[keys.length - 1]] = value;
    return clone;
}

function normalizePreviewList(items) {
    if (!Array.isArray(items)) {
        return [];
    }

    return items.filter(Boolean).slice(0, 4);
}

function getProjectsArray(draft, path) {
    const items = getNestedValue(draft, path);
    return Array.isArray(items) ? items : [];
}

function updateProjectField(draft, path, index, key, rawValue) {
    const items = getProjectsArray(draft, path);
    const nextItems = items.map((item, itemIndex) => {
        if (itemIndex !== index) {
            return item;
        }

        const nextValue = key === 'stack'
            ? rawValue.split(';').map((part) => part.trim()).filter(Boolean)
            : rawValue;

        return {
            ...item,
            [key]: nextValue
        };
    });

    return setNestedValue(draft, path, nextItems);
}

function createEmptyProject(nextId) {
    return {
        id: nextId,
        tag: 'Novo Projeto',
        title: 'Título do projeto',
        summary: 'Resumo rápido do projeto.',
        details: 'Detalhes do contexto, decisões e resultados esperados.',
        stack: ['React'],
        href: 'https://example.com',
        accent: '#7C3AED',
        cover: 'linear-gradient(145deg, rgba(124,58,237,0.35) 0%, rgba(8,8,8,0.35) 45%, rgba(8,8,8,0.9) 100%)',
        grid: { xs: '1 / -1', md: '1 / span 6' },
        minHeight: { xs: 300, md: 320 }
    };
}

function SectionPreview({ config, draft }) {
    if (config.previewType === 'aboutHero') {
        return (
            <Box sx={{ p: 1.3, borderRadius: '12px', border: '1px solid rgba(255,255,255,0.14)', bgcolor: 'rgba(255,255,255,0.02)' }}>
                <Typography sx={{ color: draft.accent || '#38BDF8', textTransform: 'uppercase', fontWeight: 700, fontSize: '0.68rem', letterSpacing: '0.08em' }}>
                    {draft.eyebrow || 'EYEBROW'}
                </Typography>
                <Typography sx={{ mt: 0.55, color: '#fff', fontWeight: 800, lineHeight: 1.24, fontSize: '0.96rem' }}>
                    {draft.titleStart} <span style={{ color: draft.accent || '#38BDF8' }}>{draft.titleHighlight}</span>
                </Typography>
                <Typography sx={{ mt: 0.7, color: 'rgba(228,228,231,0.78)', fontSize: '0.82rem', lineHeight: 1.55 }}>
                    {draft.description}
                </Typography>
            </Box>
        );
    }

    if (config.previewType === 'aboutStory') {
        return (
            <Stack spacing={1.1}>
                <Box sx={{ p: 1.3, borderRadius: '12px', border: '1px solid rgba(255,255,255,0.14)', bgcolor: 'rgba(255,255,255,0.02)' }}>
                    <Typography sx={{ color: '#67E8F9', textTransform: 'uppercase', fontWeight: 700, fontSize: '0.68rem', letterSpacing: '0.08em' }}>
                        {draft.eyebrow || 'EYEBROW'}
                    </Typography>
                    <Typography sx={{ mt: 0.55, color: '#fff', fontWeight: 800, lineHeight: 1.24, fontSize: '0.92rem' }}>
                        {draft.title}
                    </Typography>
                    <Stack spacing={0.55} sx={{ mt: 0.8 }}>
                        {normalizePreviewList(draft.paragraphs).map((item, index) => (
                            <Typography key={`${item}-${index}`} sx={{ color: 'rgba(228,228,231,0.78)', fontSize: '0.8rem' }}>• {item}</Typography>
                        ))}
                    </Stack>
                </Box>
            </Stack>
        );
    }

    if (config.previewType === 'aboutTeam') {
        return (
            <Box sx={{ p: 1.3, borderRadius: '12px', border: '1px solid rgba(255,255,255,0.14)', bgcolor: 'rgba(255,255,255,0.02)' }}>
                <Typography sx={{ color: draft.accent || '#38BDF8', textTransform: 'uppercase', fontWeight: 700, fontSize: '0.68rem', letterSpacing: '0.08em' }}>
                    {draft.eyebrow || 'EYEBROW'}
                </Typography>
                <Typography sx={{ mt: 0.7, color: 'rgba(228,228,231,0.78)', fontSize: '0.82rem', lineHeight: 1.55 }}>
                    {draft.description}
                </Typography>
            </Box>
        );
    }

    if (config.previewType === 'projectsHero') {
        return (
            <Box sx={{ p: 1.3, borderRadius: '12px', border: '1px solid rgba(255,255,255,0.14)', bgcolor: 'rgba(255,255,255,0.02)' }}>
                <Typography sx={{ color: draft.accent || '#4ADE80', textTransform: 'uppercase', fontWeight: 700, fontSize: '0.68rem', letterSpacing: '0.08em' }}>
                    {draft.eyebrow || 'EYEBROW'}
                </Typography>
                <Typography sx={{ mt: 0.55, color: '#fff', fontWeight: 800, lineHeight: 1.24, fontSize: '0.96rem' }}>
                    {draft.titleStart} <span style={{ color: draft.accent || '#4ADE80' }}>{draft.titleHighlight}</span>
                </Typography>
                <Typography sx={{ mt: 0.7, color: 'rgba(228,228,231,0.78)', fontSize: '0.82rem', lineHeight: 1.55 }}>
                    {draft.description}
                </Typography>
            </Box>
        );
    }

    if (config.previewType === 'projectsCatalog') {
        return (
            <Stack spacing={1.1}>
                <Box sx={{ p: 1.3, borderRadius: '12px', border: '1px solid rgba(255,255,255,0.14)', bgcolor: 'rgba(255,255,255,0.02)' }}>
                    <Typography sx={{ color: draft.accent || '#4ADE80', textTransform: 'uppercase', fontWeight: 700, fontSize: '0.68rem', letterSpacing: '0.08em' }}>
                        {draft.eyebrow || 'EYEBROW'}
                    </Typography>
                    <Typography sx={{ mt: 0.7, color: 'rgba(228,228,231,0.78)', fontSize: '0.82rem', lineHeight: 1.55 }}>
                        {draft.description}
                    </Typography>
                </Box>
                <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.8rem' }}>
                    Projetos no catálogo: {(draft.projects || []).length}
                </Typography>
                <Stack spacing={0.8}>
                    {normalizePreviewList(draft.projects || []).map((item, index) => (
                        <Box key={item.id || index} sx={{ p: 1, borderRadius: '10px', border: '1px solid rgba(255,255,255,0.14)', bgcolor: 'rgba(255,255,255,0.02)' }}>
                            <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.8rem' }}>{item.title}</Typography>
                            <Typography sx={{ color: 'rgba(228,228,231,0.68)', fontSize: '0.76rem', mt: 0.35 }}>{item.tag}</Typography>
                        </Box>
                    ))}
                </Stack>
            </Stack>
        );
    }

    if (config.previewType === 'homeHero') {
        return (
            <Stack spacing={1.1}>
                <Box sx={{ p: 1.3, borderRadius: '12px', border: '1px solid rgba(255,255,255,0.14)', bgcolor: 'rgba(255,255,255,0.02)' }}>
                    <Typography sx={{ color: 'rgba(228,228,231,0.72)', textTransform: 'uppercase', fontWeight: 700, fontSize: '0.68rem', letterSpacing: '0.08em' }}>
                        {draft.eyebrow || 'EYEBROW'}
                    </Typography>
                    <Typography sx={{ mt: 0.55, color: '#fff', fontWeight: 800, lineHeight: 1.24, fontSize: '0.96rem' }}>
                        {draft.titleStart} <span style={{ color: '#C4B5FD' }}>{draft.titleHighlight}</span>
                    </Typography>
                    <Typography sx={{ mt: 0.7, color: 'rgba(228,228,231,0.78)', fontSize: '0.82rem', lineHeight: 1.55 }}>
                        {draft.description}
                    </Typography>
                </Box>

                <Stack direction="row" spacing={0.8} flexWrap="wrap" useFlexGap>
                    {normalizePreviewList(draft.trustPills).map((item, index) => (
                        <Chip
                            key={`${item}-${index}`}
                            label={item}
                            sx={{ bgcolor: 'rgba(124,58,237,0.22)', color: '#EDE9FE', border: '1px solid rgba(124,58,237,0.45)' }}
                        />
                    ))}
                </Stack>

                <Box sx={{ p: 1.3, borderRadius: '12px', border: '1px solid rgba(255,255,255,0.14)', bgcolor: 'rgba(255,255,255,0.02)' }}>
                    <Typography sx={{ color: '#DDD6FE', fontWeight: 800, fontSize: '0.72rem', letterSpacing: '0.07em' }}>
                        {draft.executionContext?.eyebrow || 'CONTEXTO'}
                    </Typography>
                    <Typography sx={{ mt: 0.5, color: '#fff', fontWeight: 700, fontSize: '0.84rem' }}>
                        {draft.executionContext?.title}
                    </Typography>
                    <Stack spacing={0.55} sx={{ mt: 0.8 }}>
                        {(draft.executionContext?.steps || []).map((step) => (
                            <Typography key={step.id || step.text} sx={{ color: 'rgba(228,228,231,0.78)', fontSize: '0.8rem' }}>
                                {step.id ? `${step.id}. ` : ''}{step.text}
                            </Typography>
                        ))}
                    </Stack>
                </Box>
            </Stack>
        );
    }

    if (config.previewType === 'homeProcess') {
        return (
            <Stack spacing={1.1}>
                <Stack direction="row" spacing={0.8} flexWrap="wrap" useFlexGap>
                    {normalizePreviewList(draft.topTags).map((tag, index) => (
                        <Chip
                            key={`${tag}-${index}`}
                            label={tag}
                            sx={{ bgcolor: 'rgba(56,189,248,0.16)', color: '#BAE6FD', border: '1px solid rgba(56,189,248,0.35)' }}
                        />
                    ))}
                </Stack>
                <Box sx={{ p: 1.3, borderRadius: '12px', border: '1px solid rgba(255,255,255,0.14)', bgcolor: 'rgba(255,255,255,0.02)' }}>
                    <Typography sx={{ color: 'rgba(228,228,231,0.72)', textTransform: 'uppercase', fontWeight: 700, fontSize: '0.68rem', letterSpacing: '0.08em' }}>
                        {draft.eyebrow || 'EYEBROW'}
                    </Typography>
                    <Typography sx={{ mt: 0.55, color: '#fff', fontWeight: 800, lineHeight: 1.24, fontSize: '0.96rem' }}>
                        {draft.titleStart} <span style={{ color: '#67E8F9' }}>{draft.titleHighlight}</span>
                    </Typography>
                    <Typography sx={{ mt: 0.7, color: 'rgba(228,228,231,0.78)', fontSize: '0.82rem', lineHeight: 1.55 }}>
                        {draft.description}
                    </Typography>
                </Box>
            </Stack>
        );
    }

    if (config.previewType === 'homePortfolio') {
        return (
            <Stack spacing={1.1}>
                <Stack direction="row" spacing={0.8} flexWrap="wrap" useFlexGap>
                    {normalizePreviewList(draft.topTags).map((tag, index) => (
                        <Chip
                            key={`${tag}-${index}`}
                            label={tag}
                            sx={{ bgcolor: 'rgba(251,191,36,0.14)', color: '#FDE68A', border: '1px solid rgba(251,191,36,0.35)' }}
                        />
                    ))}
                </Stack>
                <Box sx={{ p: 1.3, borderRadius: '12px', border: '1px solid rgba(255,255,255,0.14)', bgcolor: 'rgba(255,255,255,0.02)' }}>
                    <Typography sx={{ color: 'rgba(228,228,231,0.72)', textTransform: 'uppercase', fontWeight: 700, fontSize: '0.68rem', letterSpacing: '0.08em' }}>
                        {draft.eyebrow || 'EYEBROW'}
                    </Typography>
                    <Typography sx={{ mt: 0.55, color: '#fff', fontWeight: 800, lineHeight: 1.24, fontSize: '0.96rem' }}>
                        {draft.titleStart} <span style={{ color: '#FCD34D' }}>{draft.titleHighlight}</span>
                    </Typography>
                    <Typography sx={{ mt: 0.7, color: 'rgba(228,228,231,0.78)', fontSize: '0.82rem', lineHeight: 1.55 }}>
                        {draft.description}
                    </Typography>
                    <Chip
                        label={`${draft.cta?.label || 'CTA'} → ${draft.cta?.to || '/rota'}`}
                        sx={{ mt: 1, bgcolor: 'rgba(251,191,36,0.14)', color: '#FDE68A', border: '1px solid rgba(251,191,36,0.35)' }}
                    />
                </Box>
            </Stack>
        );
    }

    if (config.previewType === 'homeContact') {
        return (
            <Stack spacing={1.1}>
                <Box sx={{ p: 1.3, borderRadius: '12px', border: '1px solid rgba(255,255,255,0.14)', bgcolor: 'rgba(255,255,255,0.02)' }}>
                    <Typography sx={{ color: 'rgba(228,228,231,0.72)', textTransform: 'uppercase', fontWeight: 700, fontSize: '0.68rem', letterSpacing: '0.08em' }}>
                        {draft.eyebrow || 'EYEBROW'}
                    </Typography>
                    <Typography sx={{ mt: 0.55, color: '#fff', fontWeight: 800, lineHeight: 1.24, fontSize: '0.96rem' }}>
                        {draft.titleStart} <span style={{ color: '#F9A8D4' }}>{draft.titleHighlight}</span>
                    </Typography>
                    <Typography sx={{ mt: 0.7, color: 'rgba(228,228,231,0.78)', fontSize: '0.82rem', lineHeight: 1.55 }}>
                        {draft.description}
                    </Typography>
                </Box>
                <Box sx={{ p: 1.3, borderRadius: '12px', border: '1px solid rgba(255,255,255,0.14)', bgcolor: 'rgba(255,255,255,0.02)' }}>
                    <Typography sx={{ color: '#FCE7F3', fontWeight: 700, fontSize: '0.8rem' }}>{draft.email}</Typography>
                    <Typography sx={{ mt: 0.6, color: 'rgba(228,228,231,0.78)', fontSize: '0.8rem', lineHeight: 1.55 }}>
                        {draft.quickMessage}
                    </Typography>
                </Box>
            </Stack>
        );
    }

    if (config.previewType === 'homeFaq') {
        return (
            <Box sx={{ p: 1.3, borderRadius: '12px', border: '1px solid rgba(255,255,255,0.14)', bgcolor: 'rgba(255,255,255,0.02)' }}>
                <Typography sx={{ color: 'rgba(228,228,231,0.72)', textTransform: 'uppercase', fontWeight: 700, fontSize: '0.68rem', letterSpacing: '0.08em' }}>
                    {draft.eyebrow || 'EYEBROW'}
                </Typography>
                <Typography sx={{ mt: 0.55, color: '#fff', fontWeight: 800, lineHeight: 1.24, fontSize: '0.96rem' }}>
                    {draft.titleStart} <span style={{ color: '#A5B4FC' }}>{draft.titleHighlight}</span>
                </Typography>
                <Typography sx={{ mt: 0.7, color: 'rgba(228,228,231,0.78)', fontSize: '0.82rem', lineHeight: 1.55 }}>
                    {draft.description}
                </Typography>
            </Box>
        );
    }

    if (config.previewType === 'servicesHero') {
        return (
            <Stack spacing={1.1}>
                <Box sx={{ p: 1.3, borderRadius: '12px', border: '1px solid rgba(255,255,255,0.14)', bgcolor: 'rgba(255,255,255,0.02)' }}>
                    <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '0.9rem' }}>Paleta</Typography>
                    <Stack direction="row" spacing={1} sx={{ mt: 0.9 }}>
                        <Box sx={{ width: 34, height: 34, borderRadius: '10px', border: '1px solid rgba(255,255,255,0.2)', bgcolor: draft.accent?.start || '#5E1624' }} />
                        <Box sx={{ width: 34, height: 34, borderRadius: '10px', border: '1px solid rgba(255,255,255,0.2)', bgcolor: draft.accent?.end || '#8C2438' }} />
                    </Stack>
                </Box>

                <Box sx={{ p: 1.3, borderRadius: '12px', border: '1px solid rgba(255,255,255,0.14)', bgcolor: 'rgba(255,255,255,0.02)' }}>
                    <Typography sx={{ color: 'rgba(228,228,231,0.72)', textTransform: 'uppercase', fontWeight: 700, fontSize: '0.68rem', letterSpacing: '0.08em' }}>
                        {draft.eyebrow || 'EYEBROW'}
                    </Typography>
                    <Typography sx={{ mt: 0.55, color: '#fff', fontWeight: 800, lineHeight: 1.24, fontSize: '0.96rem' }}>
                        {draft.title}
                    </Typography>
                    <Stack spacing={0.45} sx={{ mt: 0.9 }}>
                        {normalizePreviewList(draft.contextLines).map((line) => (
                            <Typography key={line} sx={{ color: 'rgba(228,228,231,0.76)', fontSize: '0.82rem' }}>{line}</Typography>
                        ))}
                    </Stack>
                </Box>

                <Stack direction="row" spacing={0.8} flexWrap="wrap" useFlexGap>
                    {(draft.impactStats || []).map((item) => (
                        <Chip
                            key={item.id || item.label}
                            label={`${item.value || '-'} ${item.label || ''}`.trim()}
                            sx={{ bgcolor: 'rgba(124,58,237,0.22)', color: '#EDE9FE', border: '1px solid rgba(124,58,237,0.45)' }}
                        />
                    ))}
                </Stack>
            </Stack>
        );
    }

    if (config.previewType === 'servicesHighlights') {
        return (
            <Stack spacing={1.1}>
                <Box sx={{ p: 1.3, borderRadius: '12px', border: '1px solid rgba(255,255,255,0.14)', bgcolor: 'rgba(255,255,255,0.02)' }}>
                    <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '0.9rem' }}>Primeira semana</Typography>
                    <Stack spacing={0.6} sx={{ mt: 0.8 }}>
                        {normalizePreviewList(draft.firstWeekExpectations).map((item, index) => (
                            <Typography key={`${item}-${index}`} sx={{ color: 'rgba(228,228,231,0.78)', fontSize: '0.82rem' }}>• {item}</Typography>
                        ))}
                    </Stack>
                </Box>
                <Box sx={{ p: 1.3, borderRadius: '12px', border: '1px solid rgba(255,255,255,0.14)', bgcolor: 'rgba(255,255,255,0.02)' }}>
                    <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '0.9rem' }}>Métricas de sucesso</Typography>
                    <Stack spacing={0.6} sx={{ mt: 0.8 }}>
                        {normalizePreviewList(draft.successMetrics).map((item, index) => (
                            <Typography key={`${item}-${index}`} sx={{ color: 'rgba(228,228,231,0.78)', fontSize: '0.82rem' }}>• {item}</Typography>
                        ))}
                    </Stack>
                </Box>
            </Stack>
        );
    }

    if (config.previewType === 'servicesProcess') {
        return (
            <Stack spacing={0.9}>
                {(draft.processTimeline || []).map((step, index) => (
                    <Box key={step.id || index} sx={{ p: 1.1, borderRadius: '12px', border: '1px solid rgba(255,255,255,0.14)', bgcolor: 'rgba(255,255,255,0.02)' }}>
                        <Typography sx={{ color: '#C4B5FD', fontWeight: 800, fontSize: '0.68rem', letterSpacing: '0.07em' }}>
                            ETAPA {step.stage || String(index + 1).padStart(2, '0')}
                        </Typography>
                        <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '0.88rem', mt: 0.4 }}>{step.title}</Typography>
                        <Typography sx={{ color: 'rgba(228,228,231,0.72)', fontSize: '0.78rem' }}>{step.subtitle}</Typography>
                    </Box>
                ))}
            </Stack>
        );
    }

    return (
        <Box sx={{ p: 1.3, borderRadius: '12px', border: '1px solid rgba(255,255,255,0.14)', bgcolor: 'rgba(255,255,255,0.02)' }}>
            <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '0.9rem' }}>Preview rápido</Typography>
            <Typography sx={{ mt: 0.8, color: 'rgba(228,228,231,0.78)', fontSize: '0.82rem' }}>
                Conteúdo carregado para edição local.
            </Typography>
        </Box>
    );
}

function ContentEditor({ config }) {
    const [draft, setDraft] = useState(() => structuredClone(config.getContent()));
    const [savedMessage, setSavedMessage] = useState(false);

    useEffect(() => {
        setDraft(structuredClone(config.getContent()));
        setSavedMessage(false);
    }, [config]);

    function handleChange(field, rawValue) {
        const value = field.arraySeparator
            ? rawValue
                .split(field.arraySeparator)
                .map((item) => item.trim())
                .filter(Boolean)
            : rawValue;

        setDraft((current) => setNestedValue(current, field.path, value));
    }

    function displayValue(field) {
        const value = getNestedValue(draft, field.path);
        if (Array.isArray(value)) {
            return value.join(`${field.arraySeparator || ';'} `);
        }

        return value ?? '';
    }

    function handleReloadFromSource() {
        setDraft(structuredClone(config.getContent()));
        setSavedMessage(false);
    }

    function handleSave() {
        setSavedMessage(true);
    }

    function handleProjectChange(index, key, value) {
        if (!config.dynamicProjectsPath) {
            return;
        }

        setDraft((current) => updateProjectField(current, config.dynamicProjectsPath, index, key, value));
    }

    function handleAddProject() {
        if (!config.dynamicProjectsPath) {
            return;
        }

        setDraft((current) => {
            const projects = getProjectsArray(current, config.dynamicProjectsPath);
            const nextId = projects.length ? Math.max(...projects.map((item) => Number(item.id) || 0)) + 1 : 1;
            const nextProjects = [...projects, createEmptyProject(nextId)];
            return setNestedValue(current, config.dynamicProjectsPath, nextProjects);
        });
    }

    function handleRemoveProject(index) {
        if (!config.dynamicProjectsPath) {
            return;
        }

        setDraft((current) => {
            const projects = getProjectsArray(current, config.dynamicProjectsPath);
            const nextProjects = projects.filter((_, itemIndex) => itemIndex !== index);
            return setNestedValue(current, config.dynamicProjectsPath, nextProjects);
        });
    }

    return (
        <Box sx={{ p: { xs: 2.4, md: 3.2 }, borderRadius: '18px', border: '1px solid rgba(255,255,255,0.08)', background: 'linear-gradient(160deg, rgba(25,25,28,0.98), rgba(10,10,12,0.98))' }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={1.2}>
                <Box>
                    <Typography sx={{ color: '#fff', fontWeight: 900, fontSize: { xs: '1.35rem', md: '1.6rem' }, letterSpacing: '-0.02em' }}>
                        {config.title}
                    </Typography>
                    <Typography sx={{ mt: 0.6, color: 'rgba(228,228,231,0.74)', maxWidth: 760 }}>
                        {config.description}
                    </Typography>
                </Box>
                <Chip
                    label="Modo local (sem Firebase)"
                    sx={{
                        alignSelf: 'flex-start',
                        bgcolor: 'rgba(124,58,237,0.22)',
                        border: '1px solid rgba(124,58,237,0.45)',
                        color: '#DDD6FE',
                        fontWeight: 700
                    }}
                />
            </Stack>

            <Box sx={{ mt: 2.2, display: 'grid', gridTemplateColumns: { xs: '1fr', xl: 'minmax(0, 1.55fr) minmax(280px, 0.75fr)' }, gap: 1.6 }}>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
                        gap: 1.4
                    }}
                >
                    {config.fields.map((field, index) => {
                        if (field.type === 'heading') {
                            return (
                                <Box
                                    key={`${field.label}-${index}`}
                                    sx={{
                                        gridColumn: '1 / -1',
                                        mt: index === 0 ? 0 : 0.8,
                                        px: 1.1,
                                        py: 0.75,
                                        borderRadius: '10px',
                                        border: '1px solid rgba(124,58,237,0.3)',
                                        bgcolor: 'rgba(124,58,237,0.12)'
                                    }}
                                >
                                    <Typography sx={{ color: '#DDD6FE', fontWeight: 800, fontSize: '0.84rem', letterSpacing: '0.04em' }}>
                                        {field.label}
                                    </Typography>
                                </Box>
                            );
                        }

                        return (
                            <Box key={field.path} sx={{ gridColumn: field.fullWidth ? '1 / -1' : 'auto' }}>
                                <TextField
                                    label={field.label}
                                    fullWidth
                                    multiline={field.multiline}
                                    rows={field.rows}
                                    value={displayValue(field)}
                                    onChange={(event) => handleChange(field, event.target.value)}
                                    sx={{
                                        '& .MuiInputBase-root': {
                                            bgcolor: 'rgba(7,7,8,0.86)',
                                            borderRadius: '14px',
                                            color: '#F5F5F5'
                                        },
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'rgba(255,255,255,0.16)'
                                        },
                                        '& .MuiInputLabel-root': {
                                            color: 'rgba(228,228,231,0.74)'
                                        },
                                        '& .MuiInputLabel-root.Mui-focused': {
                                            color: '#C4B5FD'
                                        }
                                    }}
                                />
                            </Box>
                        );
                    })}

                    {config.dynamicProjectsPath ? (
                        <Box sx={{ gridColumn: '1 / -1', mt: 0.6 }}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.1 }}>
                                <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '0.96rem' }}>
                                    Projetos do catálogo
                                </Typography>
                                <Button
                                    onClick={handleAddProject}
                                    variant="outlined"
                                    sx={{
                                        borderRadius: '999px',
                                        textTransform: 'none',
                                        fontWeight: 700,
                                        color: '#EDE9FE',
                                        borderColor: 'rgba(124,58,237,0.48)'
                                    }}
                                >
                                    Adicionar projeto
                                </Button>
                            </Stack>

                            <Stack spacing={1.2}>
                                {(getProjectsArray(draft, config.dynamicProjectsPath)).map((project, index) => (
                                    <Box
                                        key={project.id || index}
                                        sx={{
                                            p: 1.2,
                                            borderRadius: '12px',
                                            border: '1px solid rgba(255,255,255,0.14)',
                                            bgcolor: 'rgba(255,255,255,0.02)'
                                        }}
                                    >
                                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                                            <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '0.84rem' }}>
                                                Projeto {index + 1}
                                            </Typography>
                                            <Button
                                                onClick={() => handleRemoveProject(index)}
                                                sx={{
                                                    borderRadius: '999px',
                                                    textTransform: 'none',
                                                    fontWeight: 700,
                                                    color: '#FCA5A5',
                                                    minWidth: 0,
                                                    px: 1.2
                                                }}
                                            >
                                                Remover
                                            </Button>
                                        </Stack>

                                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' }, gap: 1 }}>
                                            <TextField
                                                label="ID"
                                                value={project.id ?? ''}
                                                onChange={(event) => handleProjectChange(index, 'id', event.target.value)}
                                                sx={{ '& .MuiInputBase-root': { bgcolor: 'rgba(7,7,8,0.86)', borderRadius: '12px', color: '#F5F5F5' } }}
                                            />
                                            <TextField
                                                label="Tag"
                                                value={project.tag ?? ''}
                                                onChange={(event) => handleProjectChange(index, 'tag', event.target.value)}
                                                sx={{ '& .MuiInputBase-root': { bgcolor: 'rgba(7,7,8,0.86)', borderRadius: '12px', color: '#F5F5F5' } }}
                                            />
                                            <Box sx={{ gridColumn: '1 / -1' }}>
                                                <TextField
                                                    label="Título"
                                                    fullWidth
                                                    value={project.title ?? ''}
                                                    onChange={(event) => handleProjectChange(index, 'title', event.target.value)}
                                                    sx={{ '& .MuiInputBase-root': { bgcolor: 'rgba(7,7,8,0.86)', borderRadius: '12px', color: '#F5F5F5' } }}
                                                />
                                            </Box>
                                            <Box sx={{ gridColumn: '1 / -1' }}>
                                                <TextField
                                                    label="Resumo"
                                                    fullWidth
                                                    multiline
                                                    rows={2}
                                                    value={project.summary ?? ''}
                                                    onChange={(event) => handleProjectChange(index, 'summary', event.target.value)}
                                                    sx={{ '& .MuiInputBase-root': { bgcolor: 'rgba(7,7,8,0.86)', borderRadius: '12px', color: '#F5F5F5' } }}
                                                />
                                            </Box>
                                            <Box sx={{ gridColumn: '1 / -1' }}>
                                                <TextField
                                                    label="Detalhes"
                                                    fullWidth
                                                    multiline
                                                    rows={3}
                                                    value={project.details ?? ''}
                                                    onChange={(event) => handleProjectChange(index, 'details', event.target.value)}
                                                    sx={{ '& .MuiInputBase-root': { bgcolor: 'rgba(7,7,8,0.86)', borderRadius: '12px', color: '#F5F5F5' } }}
                                                />
                                            </Box>
                                            <TextField
                                                label="Stack (separada por ;)"
                                                value={Array.isArray(project.stack) ? project.stack.join('; ') : ''}
                                                onChange={(event) => handleProjectChange(index, 'stack', event.target.value)}
                                                sx={{ '& .MuiInputBase-root': { bgcolor: 'rgba(7,7,8,0.86)', borderRadius: '12px', color: '#F5F5F5' } }}
                                            />
                                            <TextField
                                                label="Accent (hex)"
                                                value={project.accent ?? ''}
                                                onChange={(event) => handleProjectChange(index, 'accent', event.target.value)}
                                                sx={{ '& .MuiInputBase-root': { bgcolor: 'rgba(7,7,8,0.86)', borderRadius: '12px', color: '#F5F5F5' } }}
                                            />
                                            <Box sx={{ gridColumn: '1 / -1' }}>
                                                <TextField
                                                    label="Link do projeto"
                                                    fullWidth
                                                    value={project.href ?? ''}
                                                    onChange={(event) => handleProjectChange(index, 'href', event.target.value)}
                                                    sx={{ '& .MuiInputBase-root': { bgcolor: 'rgba(7,7,8,0.86)', borderRadius: '12px', color: '#F5F5F5' } }}
                                                />
                                            </Box>
                                        </Box>
                                    </Box>
                                ))}
                            </Stack>
                        </Box>
                    ) : null}
                </Box>

                <Box
                    sx={{
                        p: 1.3,
                        borderRadius: '14px',
                        border: '1px solid rgba(255,255,255,0.12)',
                        bgcolor: 'rgba(7,7,8,0.78)',
                        height: 'fit-content',
                        position: { xs: 'static', xl: 'sticky' },
                        top: { xl: 18 }
                    }}
                >
                    <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '0.92rem' }}>Preview ao vivo</Typography>
                    <Typography sx={{ mt: 0.4, color: 'rgba(228,228,231,0.68)', fontSize: '0.78rem' }}>
                        Atualiza conforme você edita.
                    </Typography>
                    <Box sx={{ mt: 1.1 }}>
                        <SectionPreview config={config} draft={draft} />
                    </Box>
                </Box>
            </Box>

            <Stack direction="row" spacing={1.1} sx={{ mt: 2 }}>
                <Button
                    variant="contained"
                    onClick={handleSave}
                    sx={{
                        borderRadius: '999px',
                        textTransform: 'none',
                        fontWeight: 700,
                        bgcolor: '#7C3AED',
                        '&:hover': { bgcolor: '#6D28D9' }
                    }}
                >
                    Salvar alterações
                </Button>
                <Button
                    variant="outlined"
                    onClick={handleReloadFromSource}
                    sx={{
                        borderRadius: '999px',
                        textTransform: 'none',
                        fontWeight: 700,
                        color: 'rgba(244,244,245,0.9)',
                        borderColor: 'rgba(255,255,255,0.2)'
                    }}
                >
                    Recarregar da fonte
                </Button>
            </Stack>

            {savedMessage ? (
                <Alert
                    severity="success"
                    onClose={() => setSavedMessage(false)}
                    sx={{ mt: 1.6, borderRadius: '12px', bgcolor: 'rgba(16,185,129,0.16)', color: '#D1FAE5', border: '1px solid rgba(16,185,129,0.38)' }}
                >
                    Rascunho salvo localmente. No próximo passo, conectamos este botão ao Firebase.
                </Alert>
            ) : null}
        </Box>
    );
}

export default function AdminSectionPlaceholder() {
    const { page, section } = useParams();
    const pageLabel = pageLabelByKey[page] ?? 'Página';
    const pageConfig = editorConfigByPageSection[page] ?? {};
    const editorConfig = section ? pageConfig[section] : null;
    const sectionsList = Object.entries(pageConfig);

    const isEditable = Boolean(editorConfig?.getContent && editorConfig?.fields);

    return (
        <Container maxWidth={false} sx={{ px: { xs: 2.2, md: 3.2 }, py: { xs: 2.4, md: 3.2 } }}>
            {isEditable ? (
                <ContentEditor config={editorConfig} />
            ) : section && editorConfig ? (
                <Box sx={{ p: { xs: 3, md: 4 }, borderRadius: '18px', border: '1px solid rgba(255,255,255,0.08)', background: 'linear-gradient(160deg, rgba(25,25,28,0.98), rgba(10,10,12,0.98))' }}>
                    <Typography sx={{ color: '#fff', fontWeight: 900, fontSize: { xs: '1.75rem', md: '2rem' }, letterSpacing: '-0.02em' }}>
                        {editorConfig.title}
                    </Typography>
                    <Typography sx={{ mt: 1, color: 'rgba(228,228,231,0.74)', fontSize: '1rem' }}>
                        Estrutura pronta. Nesta próxima fase conectamos os campos reais desta seção.
                    </Typography>
                </Box>
            ) : page ? (
                <Box sx={{ p: { xs: 3, md: 4 }, borderRadius: '18px', border: '1px solid rgba(255,255,255,0.08)', background: 'linear-gradient(160deg, rgba(25,25,28,0.98), rgba(10,10,12,0.98))' }}>
                    <Typography sx={{ color: '#fff', fontWeight: 900, fontSize: { xs: '1.75rem', md: '2rem' }, letterSpacing: '-0.02em' }}>
                        {pageLabel}
                    </Typography>
                    <Typography sx={{ mt: 1, color: 'rgba(228,228,231,0.74)', fontSize: '1rem' }}>
                        Selecione uma sub-seção para editar os dados desta página.
                    </Typography>

                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 2 }}>
                        {sectionsList.map(([sectionKey, config]) => (
                            <Button
                                key={sectionKey}
                                component={NavLink}
                                to={`/admin/${page}/${sectionKey}`}
                                sx={{
                                    borderRadius: '999px',
                                    textTransform: 'none',
                                    fontWeight: 700,
                                    color: 'rgba(244,244,245,0.9)',
                                    border: '1px solid rgba(255,255,255,0.18)',
                                    '&:hover': { bgcolor: 'rgba(255,255,255,0.06)' }
                                }}
                            >
                                {config.navLabel ?? sectionKey}
                            </Button>
                        ))}
                    </Stack>
                </Box>
            ) : (
                <Box sx={{ p: { xs: 3, md: 4 }, borderRadius: '18px', border: '1px solid rgba(255,255,255,0.08)', background: 'linear-gradient(160deg, rgba(25,25,28,0.98), rgba(10,10,12,0.98))' }}>
                    <Typography sx={{ color: '#fff', fontWeight: 900, fontSize: { xs: '1.75rem', md: '2rem' }, letterSpacing: '-0.02em' }}>
                        Seção Admin
                    </Typography>
                    <Typography sx={{ mt: 1, color: 'rgba(228,228,231,0.74)', fontSize: '1rem' }}>
                        Selecione uma página no menu lateral para começar a edição por sessões.
                    </Typography>
                </Box>
            )}
        </Container>
    );
}
