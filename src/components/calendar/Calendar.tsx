import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import FormDialog from "../modal/FormDialog";
import { EventType } from "../../models/eventType";
import { useGetEventsQuery } from "../../../redux/calendar-events/eventSlice";
import { Toaster } from "react-hot-toast";
import { Timestamp } from "firebase/firestore";

const localizer = momentLocalizer(moment);


export type slotInfo = {
  start: Date;
};

export default function CalendarTable(): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const [currentEvent, setCurrentEvent] = useState<EventType>();

  const { data: eventsList, isFetching, error } = useGetEventsQuery("events", {
    refetchOnFocus: true
  });
 
  
const formattedEvents = eventsList?.map((event: EventType) => {
  if (event.start) {
   const startDate =
     event.start instanceof Timestamp
       ? event.start.toDate()
       : new Date(event.start);
   return {
     ...event,
     start: startDate,
     end: startDate,
   };
 }
  
});
   
   
  const handleSelectSlot = (slotInfo: slotInfo) => {
    const date = new Date(slotInfo.start)
    const now = new Date();
    date.setHours(
      now.getHours(),
      now.getMinutes(),
      now.getSeconds(),
      now.getMilliseconds()
    );
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    if (date < midnight) {
      return;
    }
    setCurrentEvent({
      title: "",
      start: date,
      notes: "",
    });
    setOpen(true);
  };
 

  const handleClose = () => {
    setOpen(false);
  };

  const onSelectEvent = (selectedEvent: EventType) => {
    setCurrentEvent(selectedEvent);
    setOpen(true);
  };

if (isFetching) return <p>Loading...</p>;
if (error) {
  console.error("Ошибка API:", error);
  return <p>Ошибка: {error.message || "Неизвестная ошибка"}</p>;
}
  return (
    <>
      {formattedEvents && !error && (
        <div style={{ height: "100vh" }}>
          <Toaster position="top-right" reverseOrder={false} />
          <Calendar
            localizer={localizer}
            events={formattedEvents}
            startAccessor="start"
            endAccessor="start"
            style={{ height: "100%" }}
            selectable
            onSelectSlot={handleSelectSlot}
            onSelectEvent={onSelectEvent}
            views={["month", "week", "day"]}
            defaultView="month"
          />
          <FormDialog
            isOpen={open}
            onClose={handleClose}
            changedEvent={currentEvent}
          />
        </div>
      )}
    </>
  );
}
