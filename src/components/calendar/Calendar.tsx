import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

const localizer = momentLocalizer(moment);

type EventType = {
  title: string;
  start: Date;
  end: Date;
};

export default function CalendarTable() {
  const [events, setEvents] = useState<EventType[]>([]);

  useEffect(() => {
    // Здесь можно подключить реальный источник данных, например, API
    setEvents([
      {
        title: "Sample Event 1",
        start: new Date(2024, 10, 14, 10, 0), // 20 апреля 2024 года, 10:00
        end: new Date(2024, 10, 14, 12, 0), // 20 апреля 2024 года, 12:00
      },
      {
        title: "Sample Event 2",
        start: new Date(2024, 10, 15, 9, 0), // 21 апреля 2024 года, 9:00
        end: new Date(2024, 10, 15, 11, 0), // 21 апреля 2024 года, 11:00
      },
    ]);
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
      />
    </div>
  );
}
