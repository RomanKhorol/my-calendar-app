import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import FormDialog from "../modal/FormDialog";

const localizer = momentLocalizer(moment);

type EventType = {
  title: string;
  start: Date;
  notes: string;
};

export default function CalendarTable() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [open, setOpen] = useState(false);
  const handleSelectSlot = (slotInfo: { start: Date }) => {
    console.log(slotInfo);
    setOpen(true);
  };

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    setEvents([
      {
        title: "Sample Event 1",
        start: new Date(2024, 10, 14, 10, 0),
        notes: "rtvtvwrtbwrbtrtb",
      },
      {
        title: "Sample Event 2",
        start: new Date(2024, 10, 15, 9, 0),
        notes: "rtvtvwrtbwrbtrtb",
      },
    ]);
  }, []);

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
      />
      <FormDialog isOpen={open} onClose={handleClose} />
    </div>
  );
}
