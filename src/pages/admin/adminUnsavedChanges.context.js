import { createContext, useContext } from 'react';

export const AdminUnsavedChangesContext = createContext({
    hasUnsavedChanges: false,
    setHasUnsavedChanges: () => {},
    requestNavigation: () => {},
    registerSaveAction: () => {},
    triggerSaveAction: null,
    isSaving: false,
    setIsSaving: () => {}
});

export function useAdminUnsavedChanges() {
    return useContext(AdminUnsavedChangesContext);
}
