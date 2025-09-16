"use client";

import { useMemo } from "react";
import { useCalendarContext } from "@/components/event-calendar/calendar-context";
import { router } from "@inertiajs/react";

import {
  EventCalendar,
  type CalendarEvent,
  type EventColor,
} from "@/components/event-calendar";

interface BigCalendarProps {
  initialEvents?: Array<{
    id: string; // Changed from number to string for ULIDs
    title: string;
    description?: string;
    start: string;
    end: string;
    allDay?: boolean;
    color?: EventColor;
    label?: string;
    location?: string;
  }>;
}

export default function Component({ initialEvents = [] }: BigCalendarProps) {
  // Convert database events to CalendarEvent format
  const convertedEvents = useMemo(() => {
    return initialEvents.map((event) => ({
      ...event,
      id: event.id, // No need to convert to string since it's already a ULID string
      start: new Date(event.start),
      end: new Date(event.end),
    }));
  }, [initialEvents]);

  const { isColorVisible } = useCalendarContext();

  // Filter events based on visible colors
  const visibleEvents = useMemo(() => {
    return convertedEvents.filter((event) => isColorVisible(event.color));
  }, [convertedEvents, isColorVisible]);

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
        // Reload the page to get the updated events from server
        router.reload();
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
        // Reload the page to get the updated events from server
        router.reload();
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
        // Reload the page to get the updated events from server
        router.reload();
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
