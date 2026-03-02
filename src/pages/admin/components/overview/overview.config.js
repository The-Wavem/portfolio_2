export const INTERACTIONS_BATCH_BY_DEVICE = {
    mobile: { initial: 20, next: 20 },
    tablet: { initial: 50, next: 50 },
    desktop: { initial: 50, next: 50 }
};

export function getInteractionsBatchConfig() {
    if (typeof window === 'undefined') {
        return INTERACTIONS_BATCH_BY_DEVICE.tablet;
    }

    const width = window.innerWidth;

    if (width < 600) {
        return INTERACTIONS_BATCH_BY_DEVICE.mobile;
    }

    if (width < 1200) {
        return INTERACTIONS_BATCH_BY_DEVICE.tablet;
    }

    return INTERACTIONS_BATCH_BY_DEVICE.desktop;
}
