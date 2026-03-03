import { useEffect, useMemo, useState } from 'react';
import { Alert, Box, Button, Checkbox, Chip, Container, Dialog, DialogContent, DialogTitle, Stack, TextField, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { editorConfigByPageSection, pageLabelByKey } from './editors';
import { useAdminUnsavedChanges } from './adminUnsavedChanges.context';

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

function getMembersArray(draft, path) {
    const items = getNestedValue(draft, path);
    return Array.isArray(items) ? items : [];
}

function createEmptyMember(nextId) {
    return {
        id: nextId,
        name: 'Novo colaborador',
        role: 'Função',
        headline: 'Resumo profissional',
        bio: 'Descreva aqui a bio do colaborador.',
        accent: '#7C3AED',
        photo: '',
        specialties: ['Nova skill'],
        focuses: ['Novo aprendizado']
    };
}

function getFaqArray(draft, path) {
    const items = getNestedValue(draft, path);
    return Array.isArray(items) ? items : [];
}

function createEmptyFaq(nextId) {
    return {
        id: `faq-${nextId}`,
        question: 'Nova pergunta frequente',
        answer: 'Nova resposta.'
    };
}

function createContentSnapshot(data) {
    try {
        return JSON.stringify(data);
    } catch {
        return '';
    }
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
            <Stack spacing={1}>
                <Box sx={{ p: 1.3, borderRadius: '12px', border: '1px solid rgba(255,255,255,0.14)', bgcolor: 'rgba(255,255,255,0.02)' }}>
                    <Typography sx={{ color: draft.accent || '#38BDF8', textTransform: 'uppercase', fontWeight: 700, fontSize: '0.68rem', letterSpacing: '0.08em' }}>
                        {draft.eyebrow || 'EYEBROW'}
                    </Typography>
                    <Typography sx={{ mt: 0.7, color: 'rgba(228,228,231,0.78)', fontSize: '0.82rem', lineHeight: 1.55 }}>
                        {draft.description}
                    </Typography>
                    <Typography sx={{ mt: 0.9, color: '#fff', fontWeight: 700, fontSize: '0.78rem' }}>
                        Colaboradores: {(draft.members || []).length}
                    </Typography>
                </Box>

                {(draft.members || []).slice(0, 4).map((member) => (
                    <Box key={member.id || member.name} sx={{ p: 1, borderRadius: '10px', border: '1px solid rgba(255,255,255,0.14)', bgcolor: 'rgba(255,255,255,0.02)' }}>
                        <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.8rem' }}>{member.name}</Typography>
                        <Typography sx={{ color: 'rgba(228,228,231,0.7)', fontSize: '0.76rem', mt: 0.2 }}>{member.role}</Typography>
                    </Box>
                ))}
            </Stack>
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
            <Stack spacing={1}>
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

                {(draft.faqs || []).slice(0, 3).map((item, index) => (
                    <Box key={item.id || index} sx={{ p: 1, borderRadius: '10px', border: '1px solid rgba(255,255,255,0.14)', bgcolor: 'rgba(255,255,255,0.02)' }}>
                        <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.8rem' }}>{item.question}</Typography>
                        <Typography sx={{ color: 'rgba(228,228,231,0.72)', fontSize: '0.76rem', mt: 0.4 }}>{item.answer}</Typography>
                    </Box>
                ))}
            </Stack>
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
    const { setHasUnsavedChanges } = useAdminUnsavedChanges();
    const [draft, setDraft] = useState(() => structuredClone(config.getContent()));
    const [savedSnapshot, setSavedSnapshot] = useState(() => createContentSnapshot(config.getContent()));
    const [savedMessage, setSavedMessage] = useState(null);
    const [saveErrorMessage, setSaveErrorMessage] = useState('');
    const [isLoadingRemote, setIsLoadingRemote] = useState(false);
    const [isSavingRemote, setIsSavingRemote] = useState(false);
    const [dataMode, setDataMode] = useState(config.loadRemote ? 'firebase' : 'local');
    const [memberModalIndex, setMemberModalIndex] = useState(null);
    const [projectModalIndex, setProjectModalIndex] = useState(null);
    const [faqModalIndex, setFaqModalIndex] = useState(null);
    const [draggedProjectId, setDraggedProjectId] = useState(null);

    useEffect(() => {
        let isMounted = true;
        const initialData = structuredClone(config.getContent());
        setDraft(initialData);
        setSavedSnapshot(createContentSnapshot(initialData));
        setSavedMessage(null);
        setSaveErrorMessage('');
        setDataMode(config.loadRemote ? 'firebase' : 'local');
        setMemberModalIndex(null);
        setProjectModalIndex(null);
        setFaqModalIndex(null);

        async function loadRemoteContent() {
            if (!config.loadRemote) {
                return;
            }

            setIsLoadingRemote(true);

            try {
                const remoteData = await config.loadRemote();
                if (!isMounted) {
                    return;
                }

                if (remoteData) {
                    setDraft(structuredClone(remoteData));
                    setSavedSnapshot(createContentSnapshot(remoteData));
                    setDataMode('firebase');
                } else {
                    setDataMode('local');
                }
            } catch {
                if (!isMounted) {
                    return;
                }

                setDataMode('local');
            } finally {
                if (isMounted) {
                    setIsLoadingRemote(false);
                }
            }
        }

        loadRemoteContent();

        return () => {
            isMounted = false;
        };
    }, [config]);

    const currentSnapshot = useMemo(() => createContentSnapshot(draft), [draft]);
    const hasUnsavedChanges = currentSnapshot !== savedSnapshot;

    useEffect(() => {
        setHasUnsavedChanges(hasUnsavedChanges);

        return () => {
            setHasUnsavedChanges(false);
        };
    }, [hasUnsavedChanges, setHasUnsavedChanges]);

    useEffect(() => {
        if (!hasUnsavedChanges) {
            return undefined;
        }

        function handleBeforeUnload(event) {
            event.preventDefault();
            event.returnValue = '';
        }

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [hasUnsavedChanges]);

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

    async function handleSave() {
        setSavedMessage(null);
        setSaveErrorMessage('');

        if (!config.saveRemote) {
            setSavedSnapshot(currentSnapshot);
            setSavedMessage('local');
            return;
        }

        setIsSavingRemote(true);

        try {
            const response = await config.saveRemote(draft);

            if (response?.ok) {
                setSavedSnapshot(currentSnapshot);
                setSavedMessage('firebase');
                setDataMode('firebase');
                return;
            }

            setSavedMessage('local');
            setDataMode('local');
            setSaveErrorMessage('Não foi possível salvar no Firebase agora. O rascunho continua local.');
        } catch {
            setSavedMessage('local');
            setDataMode('local');
            setSaveErrorMessage('Falha ao conectar com o Firebase. O rascunho continua local.');
        } finally {
            setIsSavingRemote(false);
        }
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
        setProjectModalIndex(null);
    }

    function handleAddMember() {
        if (!config.dynamicMembersPath) {
            return;
        }

        setDraft((current) => {
            const members = getMembersArray(current, config.dynamicMembersPath);
            const nextId = members.length ? Math.max(...members.map((item) => Number(item.id) || 0)) + 1 : 1;
            const nextMembers = [...members, createEmptyMember(nextId)];
            return setNestedValue(current, config.dynamicMembersPath, nextMembers);
        });
    }

    function handleRemoveMember(index) {
        if (!config.dynamicMembersPath) {
            return;
        }

        setDraft((current) => {
            const members = getMembersArray(current, config.dynamicMembersPath);
            const nextMembers = members.filter((_, itemIndex) => itemIndex !== index);
            return setNestedValue(current, config.dynamicMembersPath, nextMembers);
        });
        setMemberModalIndex(null);
    }

    function handleMemberFieldChange(index, key, rawValue) {
        if (!config.dynamicMembersPath) {
            return;
        }

        setDraft((current) => {
            const members = getMembersArray(current, config.dynamicMembersPath);
            const nextMembers = members.map((member, memberIndex) => {
                if (memberIndex !== index) {
                    return member;
                }

                const nextValue = key === 'specialties' || key === 'focuses'
                    ? rawValue.split(';').map((part) => part.trim()).filter(Boolean)
                    : rawValue;

                return {
                    ...member,
                    [key]: nextValue
                };
            });

            return setNestedValue(current, config.dynamicMembersPath, nextMembers);
        });
    }

    function handleAddFaq() {
        if (!config.dynamicFaqPath) {
            return;
        }

        setDraft((current) => {
            const faqs = getFaqArray(current, config.dynamicFaqPath);
            const nextId = faqs.length + 1;
            const nextFaqs = [...faqs, createEmptyFaq(nextId)];
            return setNestedValue(current, config.dynamicFaqPath, nextFaqs);
        });
    }

    function handleRemoveFaq(index) {
        if (!config.dynamicFaqPath) {
            return;
        }

        setDraft((current) => {
            const faqs = getFaqArray(current, config.dynamicFaqPath);
            const nextFaqs = faqs.filter((_, itemIndex) => itemIndex !== index);
            return setNestedValue(current, config.dynamicFaqPath, nextFaqs);
        });
        setFaqModalIndex(null);
    }

    function handleFaqFieldChange(index, key, rawValue) {
        if (!config.dynamicFaqPath) {
            return;
        }

        setDraft((current) => {
            const faqs = getFaqArray(current, config.dynamicFaqPath);
            const nextFaqs = faqs.map((faq, faqIndex) => {
                if (faqIndex !== index) {
                    return faq;
                }

                return {
                    ...faq,
                    [key]: rawValue
                };
            });

            return setNestedValue(current, config.dynamicFaqPath, nextFaqs);
        });
    }

    function handleToggleSelectedProject(projectId) {
        if (!config.selectableProjectsPath) {
            return;
        }

        setDraft((current) => {
            const currentIds = getNestedValue(current, config.selectableProjectsPath);
            const normalizedIds = Array.isArray(currentIds)
                ? currentIds.map((id) => Number(id)).filter(Number.isFinite)
                : [];
            const numericProjectId = Number(projectId);
            const hasId = normalizedIds.includes(numericProjectId);
            const nextIds = hasId
                ? normalizedIds.filter((id) => id !== numericProjectId)
                : [...normalizedIds, numericProjectId];

            return setNestedValue(current, config.selectableProjectsPath, nextIds);
        });
    }

    function handleDropSelectedProject(targetProjectId) {
        if (!config.selectableProjectsPath || draggedProjectId === null) {
            return;
        }

        const draggedId = Number(draggedProjectId);
        const targetId = Number(targetProjectId);

        if (draggedId === targetId) {
            return;
        }

        setDraft((current) => {
            const currentIds = getNestedValue(current, config.selectableProjectsPath);
            const normalizedIds = Array.isArray(currentIds)
                ? currentIds.map((id) => Number(id)).filter(Number.isFinite)
                : [];

            const draggedIndex = normalizedIds.indexOf(draggedId);
            const targetIndex = normalizedIds.indexOf(targetId);

            if (draggedIndex === -1 || targetIndex === -1) {
                return current;
            }

            const reordered = [...normalizedIds];
            reordered.splice(draggedIndex, 1);
            reordered.splice(targetIndex, 0, draggedId);

            return setNestedValue(current, config.selectableProjectsPath, reordered);
        });
    }

    return (
        <Box
            sx={{
                p: { xs: 2.4, md: 3.2 },
                borderRadius: '18px',
                border: hasUnsavedChanges
                    ? '1px solid rgba(251,191,36,0.48)'
                    : '1px solid rgba(255,255,255,0.08)',
                background: hasUnsavedChanges
                    ? 'linear-gradient(160deg, rgba(251,191,36,0.08), rgba(25,25,28,0.98) 28%, rgba(10,10,12,0.98) 100%)'
                    : 'linear-gradient(160deg, rgba(25,25,28,0.98), rgba(10,10,12,0.98))',
                boxShadow: hasUnsavedChanges ? '0 12px 28px rgba(251,191,36,0.08)' : 'none',
                transition: 'border-color 180ms ease, background 180ms ease, box-shadow 180ms ease'
            }}
        >
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
                    label={
                        isLoadingRemote
                            ? 'Carregando Firebase...'
                            : dataMode === 'firebase'
                                ? 'Modo Firebase (ativo)'
                                : 'Modo local (fallback)'
                    }
                    sx={{
                        alignSelf: 'flex-start',
                        bgcolor: dataMode === 'firebase' ? 'rgba(16,185,129,0.18)' : 'rgba(124,58,237,0.22)',
                        border: dataMode === 'firebase' ? '1px solid rgba(16,185,129,0.45)' : '1px solid rgba(124,58,237,0.45)',
                        color: dataMode === 'firebase' ? '#D1FAE5' : '#DDD6FE',
                        fontWeight: 700
                    }}
                />
            </Stack>

            {hasUnsavedChanges ? (
                <Alert
                    severity="warning"
                    sx={{
                        mt: 1.2,
                        borderRadius: '12px',
                        bgcolor: 'rgba(251,191,36,0.14)',
                        color: '#FDE68A',
                        border: '1px solid rgba(251,191,36,0.35)'
                    }}
                >
                    Você tem alterações não salvas nesta seção.
                </Alert>
            ) : null}

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

                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
                                    gap: 1.2
                                }}
                            >
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
                                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                                            <Box>
                                                <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '0.86rem' }}>
                                                    {project.title || `Projeto ${index + 1}`}
                                                </Typography>
                                                <Typography sx={{ color: 'rgba(228,228,231,0.72)', fontSize: '0.78rem', mt: 0.2 }}>
                                                    {project.tag || 'Sem tag'}
                                                </Typography>
                                            </Box>
                                            <Button
                                                onClick={() => setProjectModalIndex(index)}
                                                sx={{
                                                    borderRadius: '999px',
                                                    textTransform: 'none',
                                                    fontWeight: 700,
                                                    color: '#DDD6FE',
                                                    border: '1px solid rgba(124,58,237,0.4)',
                                                    px: 1.2,
                                                    minWidth: 0
                                                }}
                                            >
                                                Editar
                                            </Button>
                                        </Stack>

                                        <Typography sx={{ mt: 0.8, color: 'rgba(228,228,231,0.68)', fontSize: '0.78rem', lineHeight: 1.5 }}>
                                            {project.summary || 'Sem resumo ainda.'}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    ) : null}

                    {config.dynamicMembersPath ? (
                        <Box sx={{ gridColumn: '1 / -1', mt: 0.6 }}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.1 }}>
                                <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '0.96rem' }}>
                                    Cards dos colaboradores
                                </Typography>
                                <Button
                                    onClick={handleAddMember}
                                    variant="outlined"
                                    sx={{
                                        borderRadius: '999px',
                                        textTransform: 'none',
                                        fontWeight: 700,
                                        color: '#E0F2FE',
                                        borderColor: 'rgba(56,189,248,0.48)'
                                    }}
                                >
                                    Adicionar colaborador
                                </Button>
                            </Stack>

                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
                                    gap: 1.2
                                }}
                            >
                                {getMembersArray(draft, config.dynamicMembersPath).map((member, index) => (
                                    <Box
                                        key={member.id || index}
                                        sx={{
                                            p: 1.2,
                                            borderRadius: '12px',
                                            border: '1px solid rgba(255,255,255,0.14)',
                                            bgcolor: 'rgba(255,255,255,0.02)'
                                        }}
                                    >
                                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                                            <Box>
                                                <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '0.86rem' }}>
                                                    {member.name || `Colaborador ${index + 1}`}
                                                </Typography>
                                                <Typography sx={{ color: 'rgba(228,228,231,0.72)', fontSize: '0.78rem', mt: 0.2 }}>
                                                    {member.role || 'Função não definida'}
                                                </Typography>
                                            </Box>
                                            <Button
                                                onClick={() => setMemberModalIndex(index)}
                                                sx={{
                                                    borderRadius: '999px',
                                                    textTransform: 'none',
                                                    fontWeight: 700,
                                                    color: '#DDD6FE',
                                                    border: '1px solid rgba(124,58,237,0.4)',
                                                    px: 1.2,
                                                    minWidth: 0
                                                }}
                                            >
                                                Editar
                                            </Button>
                                        </Stack>

                                        <Typography sx={{ mt: 0.8, color: 'rgba(228,228,231,0.68)', fontSize: '0.78rem', lineHeight: 1.5 }}>
                                            {member.headline || 'Sem headline ainda.'}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    ) : null}

                    {config.dynamicFaqPath ? (
                        <Box sx={{ gridColumn: '1 / -1', mt: 0.6 }}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.1 }}>
                                <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '0.96rem' }}>
                                    Perguntas do FAQ
                                </Typography>
                                <Button
                                    onClick={handleAddFaq}
                                    variant="outlined"
                                    sx={{
                                        borderRadius: '999px',
                                        textTransform: 'none',
                                        fontWeight: 700,
                                        color: '#C7D2FE',
                                        borderColor: 'rgba(99,102,241,0.45)'
                                    }}
                                >
                                    Adicionar FAQ
                                </Button>
                            </Stack>

                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
                                    gap: 1.2
                                }}
                            >
                                {getFaqArray(draft, config.dynamicFaqPath).map((faq, index) => (
                                    <Box
                                        key={faq.id || index}
                                        sx={{
                                            p: 1.2,
                                            borderRadius: '12px',
                                            border: '1px solid rgba(255,255,255,0.14)',
                                            bgcolor: 'rgba(255,255,255,0.02)'
                                        }}
                                    >
                                        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
                                            <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '0.84rem' }}>
                                                {faq.question || `FAQ ${index + 1}`}
                                            </Typography>
                                            <Button
                                                onClick={() => setFaqModalIndex(index)}
                                                sx={{
                                                    borderRadius: '999px',
                                                    textTransform: 'none',
                                                    fontWeight: 700,
                                                    color: '#DDD6FE',
                                                    border: '1px solid rgba(124,58,237,0.4)',
                                                    px: 1.2,
                                                    minWidth: 0
                                                }}
                                            >
                                                Editar
                                            </Button>
                                        </Stack>

                                        <Typography sx={{ mt: 0.8, color: 'rgba(228,228,231,0.68)', fontSize: '0.78rem', lineHeight: 1.5 }}>
                                            {faq.answer || 'Sem resposta ainda.'}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    ) : null}

                    {config.selectableProjectsPath && config.selectableProjectsSource ? (
                        <Box sx={{ gridColumn: '1 / -1', mt: 0.6 }}>
                            <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '0.96rem', mb: 1.1 }}>
                                Projetos exibidos na Home
                            </Typography>

                            <Typography sx={{ color: 'rgba(228,228,231,0.68)', fontSize: '0.8rem', mb: 0.9 }}>
                                Selecione com checkbox e arraste os itens selecionados para ordenar.
                            </Typography>

                            <Stack spacing={0.55} sx={{ mb: 1.2 }}>
                                {config.selectableProjectsSource().map((project) => {
                                    const selectedIds = getNestedValue(draft, config.selectableProjectsPath);
                                    const normalizedSelectedIds = Array.isArray(selectedIds)
                                        ? selectedIds.map((id) => Number(id)).filter(Number.isFinite)
                                        : [];
                                    const isSelected = normalizedSelectedIds.includes(Number(project.id));

                                    return (
                                        <Box
                                            key={`checkbox-${project.id}`}
                                            sx={{
                                                px: 1,
                                                py: 0.55,
                                                borderRadius: '10px',
                                                border: '1px solid rgba(255,255,255,0.12)',
                                                bgcolor: 'rgba(255,255,255,0.02)'
                                            }}
                                        >
                                            <Stack direction="row" alignItems="center" spacing={0.7}>
                                                <Checkbox
                                                    checked={isSelected}
                                                    onChange={() => handleToggleSelectedProject(project.id)}
                                                    sx={{
                                                        color: 'rgba(228,228,231,0.62)',
                                                        '&.Mui-checked': { color: '#A78BFA' },
                                                        p: 0.4
                                                    }}
                                                />
                                                <Typography sx={{ color: '#E4E4E7', fontSize: '0.84rem', fontWeight: 600 }}>
                                                    {project.title}
                                                </Typography>
                                            </Stack>
                                        </Box>
                                    );
                                })}
                            </Stack>

                            <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.84rem', mb: 0.7 }}>
                                Ordem de exibição
                            </Typography>

                            <Stack spacing={0.7}>
                                {(() => {
                                    const selectedIds = getNestedValue(draft, config.selectableProjectsPath);
                                    const normalizedSelectedIds = Array.isArray(selectedIds)
                                        ? selectedIds.map((id) => Number(id)).filter(Number.isFinite)
                                        : [];
                                    const projectsById = new Map(config.selectableProjectsSource().map((project) => [Number(project.id), project]));

                                    return normalizedSelectedIds.map((projectId) => {
                                        const project = projectsById.get(Number(projectId));

                                        if (!project) {
                                            return null;
                                        }

                                        return (
                                            <Box
                                                key={`selected-${project.id}`}
                                                draggable
                                                onDragStart={() => setDraggedProjectId(project.id)}
                                                onDragOver={(event) => event.preventDefault()}
                                                onDrop={() => {
                                                    handleDropSelectedProject(project.id);
                                                    setDraggedProjectId(null);
                                                }}
                                                onDragEnd={() => setDraggedProjectId(null)}
                                                sx={{
                                                    px: 1.1,
                                                    py: 0.9,
                                                    borderRadius: '10px',
                                                    border: draggedProjectId === project.id
                                                        ? '1px solid rgba(124,58,237,0.7)'
                                                        : '1px solid rgba(255,255,255,0.14)',
                                                    bgcolor: 'rgba(124,58,237,0.16)',
                                                    cursor: 'grab'
                                                }}
                                            >
                                                <Typography sx={{ color: '#DDD6FE', fontSize: '0.82rem', fontWeight: 700 }}>
                                                    ↕ {project.title}
                                                </Typography>
                                            </Box>
                                        );
                                    });
                                })()}
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
                    disabled={isSavingRemote}
                    sx={{
                        borderRadius: '999px',
                        textTransform: 'none',
                        fontWeight: 700,
                        bgcolor: '#7C3AED',
                        '&:hover': { bgcolor: '#6D28D9' }
                    }}
                >
                    {isSavingRemote ? 'Salvando...' : 'Salvar alterações'}
                </Button>
            </Stack>

            {savedMessage ? (
                <Alert
                    severity={savedMessage === 'firebase' ? 'success' : 'info'}
                    onClose={() => setSavedMessage(null)}
                    sx={{
                        mt: 1.6,
                        borderRadius: '12px',
                        bgcolor: savedMessage === 'firebase' ? 'rgba(16,185,129,0.16)' : 'rgba(124,58,237,0.14)',
                        color: savedMessage === 'firebase' ? '#D1FAE5' : '#DDD6FE',
                        border: savedMessage === 'firebase' ? '1px solid rgba(16,185,129,0.38)' : '1px solid rgba(124,58,237,0.35)'
                    }}
                >
                    {savedMessage === 'firebase'
                        ? 'Conteúdo salvo no Firebase com sucesso.'
                        : 'Rascunho salvo localmente (fallback).'}
                </Alert>
            ) : null}

            {saveErrorMessage ? (
                <Alert
                    severity="warning"
                    onClose={() => setSaveErrorMessage('')}
                    sx={{ mt: 1.1, borderRadius: '12px', bgcolor: 'rgba(245,158,11,0.12)', color: '#FDE68A', border: '1px solid rgba(245,158,11,0.35)' }}
                >
                    {saveErrorMessage}
                </Alert>
            ) : null}

            {config.dynamicMembersPath ? (
                <Dialog
                    open={memberModalIndex !== null}
                    onClose={() => setMemberModalIndex(null)}
                    maxWidth="md"
                    fullWidth
                    PaperProps={{
                        sx: {
                            borderRadius: '18px',
                            bgcolor: 'rgba(12,12,14,0.98)',
                            border: '1px solid rgba(255,255,255,0.12)'
                        }
                    }}
                >
                    <DialogTitle sx={{ color: '#fff', fontWeight: 800 }}>
                        Editar colaborador
                    </DialogTitle>
                    <DialogContent>
                        {(() => {
                            const members = getMembersArray(draft, config.dynamicMembersPath);
                            const member = memberModalIndex !== null ? members[memberModalIndex] : null;

                            if (!member) {
                                return null;
                            }

                            return (
                                <Stack spacing={1.2} sx={{ mt: 0.4 }}>
                                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' }, gap: 1.1 }}>
                                        <TextField
                                            label="ID"
                                            value={member.id ?? ''}
                                            onChange={(event) => handleMemberFieldChange(memberModalIndex, 'id', event.target.value)}
                                            sx={{ '& .MuiInputBase-root': { bgcolor: 'rgba(7,7,8,0.86)', borderRadius: '12px', color: '#F5F5F5' } }}
                                        />
                                        <TextField
                                            label="Accent (hex)"
                                            value={member.accent ?? ''}
                                            onChange={(event) => handleMemberFieldChange(memberModalIndex, 'accent', event.target.value)}
                                            sx={{ '& .MuiInputBase-root': { bgcolor: 'rgba(7,7,8,0.86)', borderRadius: '12px', color: '#F5F5F5' } }}
                                        />
                                        <TextField
                                            label="Nome"
                                            value={member.name ?? ''}
                                            onChange={(event) => handleMemberFieldChange(memberModalIndex, 'name', event.target.value)}
                                            sx={{ '& .MuiInputBase-root': { bgcolor: 'rgba(7,7,8,0.86)', borderRadius: '12px', color: '#F5F5F5' } }}
                                        />
                                        <TextField
                                            label="Função"
                                            value={member.role ?? ''}
                                            onChange={(event) => handleMemberFieldChange(memberModalIndex, 'role', event.target.value)}
                                            sx={{ '& .MuiInputBase-root': { bgcolor: 'rgba(7,7,8,0.86)', borderRadius: '12px', color: '#F5F5F5' } }}
                                        />
                                        <Box sx={{ gridColumn: '1 / -1' }}>
                                            <TextField
                                                label="Headline"
                                                fullWidth
                                                value={member.headline ?? ''}
                                                onChange={(event) => handleMemberFieldChange(memberModalIndex, 'headline', event.target.value)}
                                                sx={{ '& .MuiInputBase-root': { bgcolor: 'rgba(7,7,8,0.86)', borderRadius: '12px', color: '#F5F5F5' } }}
                                            />
                                        </Box>
                                        <Box sx={{ gridColumn: '1 / -1' }}>
                                            <TextField
                                                label="Bio"
                                                fullWidth
                                                multiline
                                                rows={4}
                                                value={member.bio ?? ''}
                                                onChange={(event) => handleMemberFieldChange(memberModalIndex, 'bio', event.target.value)}
                                                sx={{ '& .MuiInputBase-root': { bgcolor: 'rgba(7,7,8,0.86)', borderRadius: '12px', color: '#F5F5F5' } }}
                                            />
                                        </Box>
                                        <Box sx={{ gridColumn: '1 / -1' }}>
                                            <TextField
                                                label="Especialidades (separadas por ;)"
                                                fullWidth
                                                value={Array.isArray(member.specialties) ? member.specialties.join('; ') : ''}
                                                onChange={(event) => handleMemberFieldChange(memberModalIndex, 'specialties', event.target.value)}
                                                sx={{ '& .MuiInputBase-root': { bgcolor: 'rgba(7,7,8,0.86)', borderRadius: '12px', color: '#F5F5F5' } }}
                                            />
                                        </Box>
                                        <Box sx={{ gridColumn: '1 / -1' }}>
                                            <TextField
                                                label="Focos / Aprendizados (separados por ;)"
                                                fullWidth
                                                value={Array.isArray(member.focuses) ? member.focuses.join('; ') : ''}
                                                onChange={(event) => handleMemberFieldChange(memberModalIndex, 'focuses', event.target.value)}
                                                sx={{ '& .MuiInputBase-root': { bgcolor: 'rgba(7,7,8,0.86)', borderRadius: '12px', color: '#F5F5F5' } }}
                                            />
                                        </Box>
                                    </Box>

                                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ pt: 0.4 }}>
                                        <Button
                                            onClick={() => handleRemoveMember(memberModalIndex)}
                                            sx={{ color: '#FCA5A5', textTransform: 'none', fontWeight: 700 }}
                                        >
                                            Remover colaborador
                                        </Button>
                                        <Button
                                            onClick={() => setMemberModalIndex(null)}
                                            variant="contained"
                                            sx={{ borderRadius: '999px', textTransform: 'none', fontWeight: 700, bgcolor: '#7C3AED', '&:hover': { bgcolor: '#6D28D9' } }}
                                        >
                                            Fechar
                                        </Button>
                                    </Stack>
                                </Stack>
                            );
                        })()}
                    </DialogContent>
                </Dialog>
            ) : null}

            {config.dynamicProjectsPath ? (
                <Dialog
                    open={projectModalIndex !== null}
                    onClose={() => setProjectModalIndex(null)}
                    maxWidth="md"
                    fullWidth
                    PaperProps={{
                        sx: {
                            borderRadius: '18px',
                            bgcolor: 'rgba(12,12,14,0.98)',
                            border: '1px solid rgba(255,255,255,0.12)'
                        }
                    }}
                >
                    <DialogTitle sx={{ color: '#fff', fontWeight: 800 }}>
                        Editar projeto
                    </DialogTitle>
                    <DialogContent>
                        {(() => {
                            const projects = getProjectsArray(draft, config.dynamicProjectsPath);
                            const project = projectModalIndex !== null ? projects[projectModalIndex] : null;

                            if (!project) {
                                return null;
                            }

                            return (
                                <Stack spacing={1.2} sx={{ mt: 0.4 }}>
                                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' }, gap: 1.1 }}>
                                        <TextField
                                            label="ID"
                                            value={project.id ?? ''}
                                            onChange={(event) => handleProjectChange(projectModalIndex, 'id', event.target.value)}
                                            sx={{ '& .MuiInputBase-root': { bgcolor: 'rgba(7,7,8,0.86)', borderRadius: '12px', color: '#F5F5F5' } }}
                                        />
                                        <TextField
                                            label="Tag"
                                            value={project.tag ?? ''}
                                            onChange={(event) => handleProjectChange(projectModalIndex, 'tag', event.target.value)}
                                            sx={{ '& .MuiInputBase-root': { bgcolor: 'rgba(7,7,8,0.86)', borderRadius: '12px', color: '#F5F5F5' } }}
                                        />
                                        <Box sx={{ gridColumn: '1 / -1' }}>
                                            <TextField
                                                label="Título"
                                                fullWidth
                                                value={project.title ?? ''}
                                                onChange={(event) => handleProjectChange(projectModalIndex, 'title', event.target.value)}
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
                                                onChange={(event) => handleProjectChange(projectModalIndex, 'summary', event.target.value)}
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
                                                onChange={(event) => handleProjectChange(projectModalIndex, 'details', event.target.value)}
                                                sx={{ '& .MuiInputBase-root': { bgcolor: 'rgba(7,7,8,0.86)', borderRadius: '12px', color: '#F5F5F5' } }}
                                            />
                                        </Box>
                                        <TextField
                                            label="Stack (separada por ;)"
                                            value={Array.isArray(project.stack) ? project.stack.join('; ') : ''}
                                            onChange={(event) => handleProjectChange(projectModalIndex, 'stack', event.target.value)}
                                            sx={{ '& .MuiInputBase-root': { bgcolor: 'rgba(7,7,8,0.86)', borderRadius: '12px', color: '#F5F5F5' } }}
                                        />
                                        <TextField
                                            label="Accent (hex)"
                                            value={project.accent ?? ''}
                                            onChange={(event) => handleProjectChange(projectModalIndex, 'accent', event.target.value)}
                                            sx={{ '& .MuiInputBase-root': { bgcolor: 'rgba(7,7,8,0.86)', borderRadius: '12px', color: '#F5F5F5' } }}
                                        />
                                        <Box sx={{ gridColumn: '1 / -1' }}>
                                            <TextField
                                                label="Link do projeto"
                                                fullWidth
                                                value={project.href ?? ''}
                                                onChange={(event) => handleProjectChange(projectModalIndex, 'href', event.target.value)}
                                                sx={{ '& .MuiInputBase-root': { bgcolor: 'rgba(7,7,8,0.86)', borderRadius: '12px', color: '#F5F5F5' } }}
                                            />
                                        </Box>
                                    </Box>

                                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ pt: 0.4 }}>
                                        <Button
                                            onClick={() => handleRemoveProject(projectModalIndex)}
                                            sx={{ color: '#FCA5A5', textTransform: 'none', fontWeight: 700 }}
                                        >
                                            Remover projeto
                                        </Button>
                                        <Button
                                            onClick={() => setProjectModalIndex(null)}
                                            variant="contained"
                                            sx={{ borderRadius: '999px', textTransform: 'none', fontWeight: 700, bgcolor: '#7C3AED', '&:hover': { bgcolor: '#6D28D9' } }}
                                        >
                                            Fechar
                                        </Button>
                                    </Stack>
                                </Stack>
                            );
                        })()}
                    </DialogContent>
                </Dialog>
            ) : null}

            {config.dynamicFaqPath ? (
                <Dialog
                    open={faqModalIndex !== null}
                    onClose={() => setFaqModalIndex(null)}
                    maxWidth="md"
                    fullWidth
                    PaperProps={{
                        sx: {
                            borderRadius: '18px',
                            bgcolor: 'rgba(12,12,14,0.98)',
                            border: '1px solid rgba(255,255,255,0.12)'
                        }
                    }}
                >
                    <DialogTitle sx={{ color: '#fff', fontWeight: 800 }}>
                        Editar pergunta do FAQ
                    </DialogTitle>
                    <DialogContent>
                        {(() => {
                            const faqs = getFaqArray(draft, config.dynamicFaqPath);
                            const faq = faqModalIndex !== null ? faqs[faqModalIndex] : null;

                            if (!faq) {
                                return null;
                            }

                            return (
                                <Stack spacing={1.2} sx={{ mt: 0.4 }}>
                                    <TextField
                                        label="ID"
                                        value={faq.id ?? ''}
                                        onChange={(event) => handleFaqFieldChange(faqModalIndex, 'id', event.target.value)}
                                        sx={{ '& .MuiInputBase-root': { bgcolor: 'rgba(7,7,8,0.86)', borderRadius: '12px', color: '#F5F5F5' } }}
                                    />
                                    <TextField
                                        label="Pergunta"
                                        fullWidth
                                        value={faq.question ?? ''}
                                        onChange={(event) => handleFaqFieldChange(faqModalIndex, 'question', event.target.value)}
                                        sx={{ '& .MuiInputBase-root': { bgcolor: 'rgba(7,7,8,0.86)', borderRadius: '12px', color: '#F5F5F5' } }}
                                    />
                                    <TextField
                                        label="Resposta"
                                        fullWidth
                                        multiline
                                        rows={4}
                                        value={faq.answer ?? ''}
                                        onChange={(event) => handleFaqFieldChange(faqModalIndex, 'answer', event.target.value)}
                                        sx={{ '& .MuiInputBase-root': { bgcolor: 'rgba(7,7,8,0.86)', borderRadius: '12px', color: '#F5F5F5' } }}
                                    />

                                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ pt: 0.4 }}>
                                        <Button
                                            onClick={() => handleRemoveFaq(faqModalIndex)}
                                            sx={{ color: '#FCA5A5', textTransform: 'none', fontWeight: 700 }}
                                        >
                                            Remover FAQ
                                        </Button>
                                        <Button
                                            onClick={() => setFaqModalIndex(null)}
                                            variant="contained"
                                            sx={{ borderRadius: '999px', textTransform: 'none', fontWeight: 700, bgcolor: '#7C3AED', '&:hover': { bgcolor: '#6D28D9' } }}
                                        >
                                            Fechar
                                        </Button>
                                    </Stack>
                                </Stack>
                            );
                        })()}
                    </DialogContent>
                </Dialog>
            ) : null}
        </Box>
    );
}

export default function AdminSectionPlaceholder() {
    const { requestNavigation } = useAdminUnsavedChanges();
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
                                onClick={() => requestNavigation(`/admin/${page}/${sectionKey}`)}
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
