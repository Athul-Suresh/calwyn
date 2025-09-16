import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { CalendarProvider } from '@/components/event-calendar/calendar-context';
import { Toaster } from '@/components/ui/sonner';
import { type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';
import { type EventColor } from '@/components/event-calendar';

interface Etiquette {
    id: string;
    name: string;
    color: string;
    is_active: boolean;
    sort_order: number;
}

export default function AppSidebarLayout({ children, breadcrumbs = [] }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    const { props } = usePage<{ etiquettes: Etiquette[] }>();

    // Convert etiquettes to the format expected by CalendarProvider
    const providerEtiquettes = (props.etiquettes || []).map((etiquette) => ({
        id: etiquette.id,
        name: etiquette.name,
        color: etiquette.color as EventColor,
        isActive: etiquette.is_active,
    }));

    return (
        <CalendarProvider etiquettes={providerEtiquettes}>
            <AppShell variant="sidebar">
                <AppSidebar />
                <AppContent variant="sidebar" className="overflow-x-hidden">
                    <AppSidebarHeader breadcrumbs={breadcrumbs} />
                    {children}
                </AppContent>
            </AppShell>
            <Toaster />
        </CalendarProvider>
    );
}
