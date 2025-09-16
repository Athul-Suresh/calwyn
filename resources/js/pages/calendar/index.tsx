
import AppLayout from '@/layouts/app-layout';
import { index } from '@/routes/calendar';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import BigCalendar from '@/components/big-calendar';
import { type EventColor } from '@/components/event-calendar';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Calendar',
        href: index().url,
    },
];

interface CalendarEvent {
    id: string; // Changed from number to string for ULIDs
    title: string;
    description?: string;
    start: string;
    end: string;
    allDay?: boolean;
    color?: EventColor;
    label?: string;
    location?: string;
}

interface Etiquette {
    id: string;
    name: string;
    color: EventColor;
    is_active: boolean;
    sort_order: number;
}

interface CalendarPageProps {
    events?: CalendarEvent[];
    etiquettes?: Etiquette[];
    selectedEvent?: CalendarEvent;
}

export default function Calendar({ events = [] }: CalendarPageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Calendar" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <BigCalendar initialEvents={events} />
            </div>
        </AppLayout>
    );
}
