"use client";

import { useState, useMemo } from "react";
import { useCalendarContext } from "@/components/event-calendar/calendar-context";
import { router } from "@inertiajs/react";

import {
  EventCalendar,
  type CalendarEvent,
  type EventColor,
} from "@/components/event-calendar";

// Etiquettes data for calendar filtering
export const etiquettes = [
  {
    id: "my-events",
    name: "My Events",
    color: "emerald" as EventColor,
    isActive: true,
  },
  {
    id: "marketing-team",
    name: "Marketing Team",
    color: "orange" as EventColor,
    isActive: true,
  },
  {
    id: "interviews",
    name: "Interviews",
    color: "violet" as EventColor,
    isActive: true,
  },
  {
    id: "events-planning",
    name: "Events Planning",
    color: "blue" as EventColor,
    isActive: true,
  },
  {
    id: "holidays",
    name: "Holidays",
    color: "rose" as EventColor,
    isActive: true,
  },
];

interface BigCalendarProps {
  initialEvents?: any[];
}

export default function Component({ initialEvents = [] }: BigCalendarProps) {
  // Convert database events to CalendarEvent format
  const convertedEvents = useMemo(() => {
    return initialEvents.map((event) => ({
      ...event,
      id: event.id.toString(),
      start: new Date(event.start),
      end: new Date(event.end),
    }));
  }, [initialEvents]);

  const [events, setEvents] = useState<CalendarEvent[]>(convertedEvents);
  const { isColorVisible } = useCalendarContext();

  // Filter events based on visible colors
  const visibleEvents = useMemo(() => {
    return events.filter((event) => isColorVisible(event.color));
  }, [events, isColorVisible]);

  const handleEventAdd = (event: CalendarEvent) => {
    // Send POST request to create event
    router.post('/calendar', {
      title: event.title,
      description: event.description,
      start: event.start.toISOString(),
      end: event.end.toISOString(),
      allDay: event.allDay || false,
      color: event.color,
      label: event.label,
      location: event.location,
    }, {
      onSuccess: () => {
        // Update local state optimistically
        setEvents([...events, event]);
      },
      onError: (errors) => {
        console.error('Error creating event:', errors);
      }
    });
  };

  const handleEventUpdate = (updatedEvent: CalendarEvent) => {
    // Send PUT request to update event
    router.put(`/calendar/${updatedEvent.id}`, {
      title: updatedEvent.title,
      description: updatedEvent.description,
      start: updatedEvent.start.toISOString(),
      end: updatedEvent.end.toISOString(),
      allDay: updatedEvent.allDay || false,
      color: updatedEvent.color,
      label: updatedEvent.label,
      location: updatedEvent.location,
    }, {
      onSuccess: () => {
        // Update local state optimistically
        setEvents(
          events.map((event) =>
            event.id === updatedEvent.id ? updatedEvent : event,
          ),
        );
      },
      onError: (errors) => {
        console.error('Error updating event:', errors);
      }
    });
  };

  const handleEventDelete = (eventId: string) => {
    // Send DELETE request to remove event
    router.delete(`/calendar/${eventId}`, {
      onSuccess: () => {
        // Update local state optimistically
        setEvents(events.filter((event) => event.id !== eventId));
      },
      onError: (errors) => {
        console.error('Error deleting event:', errors);
      }
    });
  };

  return (
    <EventCalendar
      events={visibleEvents}
      onEventAdd={handleEventAdd}
      onEventUpdate={handleEventUpdate}
      onEventDelete={handleEventDelete}
      initialView="week"
    />
  );
}