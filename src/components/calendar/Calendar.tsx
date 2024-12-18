import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import FormDialog from "../modal/FormDialog";

const localizer = momentLocalizer(moment);

export type EventType = {
  title: string;
  start: Date | null;
  notes: string;
};

export default function CalendarTable() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [open, setOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<EventType>();
  const handleSelectSlot = () => {
    // slotInfo: {
    //   start: Date;
    // }
    setCurrentEvent(undefined);
    setOpen(true);
  };
  const handleAddEvent = (newEvent: EventType) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };
  const handleChangeEvent = (updatedEvent: EventType) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event === currentEvent ? { ...event, ...updatedEvent } : event
      )
    );
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSelectEvent = (selectedEvent: EventType) => {
    setCurrentEvent(selectedEvent);
    setOpen(true);
  };
  useEffect(() => {
    if (currentEvent) {
      setOpen(true);
    }
  }, [currentEvent]);
  // useEffect(() => {
  //   setEvents([
  //     {
  //       title: "Sample Event 1",
  //       start: new Date(2024, 10, 14, 10, 0),
  //       notes: "rtvtvwrtbwrbtrtb",
  //     },
  //     {
  //       title: "Sample Event 2",
  //       start: new Date(2024, 10, 15, 9, 0),
  //       notes: "rtvtvwrtbwrbtrtb",
  //     },
  //   ]);
  // }, []);

  return (
    <div style={{ height: "100vh" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="start"
        style={{ height: "100%" }}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={onSelectEvent}
      />
      <FormDialog
        isOpen={open}
        onClose={handleClose}
        onAddEvent={handleAddEvent}
        onChangeEvent={handleChangeEvent}
        changedEvent={currentEvent}
      />
    </div>
  );
}
