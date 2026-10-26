import { useEffect, useState } from 'react';
import { Box } from '@mui/material';

import {
    getWemTemplates,
    getWemTemplatesRemote
} from '@/service/content';
import { trackPageView } from '@/service/analytics/tracking.service';
import WemTemplatesHeroSection from '@/section/wemTemplates/WemTemplatesHeroSection';
import WemTemplatesCatalogSection from '@/section/wemTemplates/WemTemplatesCatalogSection';
import WemTemplatesTestDriveModal from '@/section/wemTemplates/WemTemplatesTestDriveModal';

export default function WemTemplates() {
    const [templates, setTemplates] = useState(() => getWemTemplates());
    const [activeTemplate, setActiveTemplate] = useState(null);

    useEffect(() => {
        trackPageView('templates_wem');
    }, []);

    useEffect(() => {
        let isMounted = true;

        async function loadRemote() {
            try {
                const remote = await getWemTemplatesRemote();
                if (isMounted && Array.isArray(remote) && remote.length > 0) {
                    setTemplates(remote);
                }
            } catch {
                return;
            }
        }

        loadRemote();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <Box component="main" sx={{ minHeight: '100vh', position: 'relative' }}>
            <WemTemplatesHeroSection totalCount={templates.length} />
            <WemTemplatesCatalogSection
                templates={templates}
                onSelectTemplate={(template) => setActiveTemplate(template)}
            />
            <WemTemplatesTestDriveModal
                template={activeTemplate}
                onClose={() => setActiveTemplate(null)}
            />
        </Box>
    );
}
