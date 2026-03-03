import { createContext, useContext } from 'react';

export const AdminUnsavedChangesContext = createContext({
    hasUnsavedChanges: false,
    setHasUnsavedChanges: () => {},
    requestNavigation: () => {}
});

export function useAdminUnsavedChanges() {
    return useContext(AdminUnsavedChangesContext);
}
