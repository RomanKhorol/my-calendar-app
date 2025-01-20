import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton } from "@mui/material";
import DatePicker from "react-widgets/DatePicker";
import "react-widgets/styles.css";
import { combineDateAndTime } from "../../helpers/CombineDateAndTime";
import "react-time-picker/dist/TimePicker.css";
import "react-datepicker/dist/react-datepicker.css";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment, { Moment } from "moment";
import { EventType } from "../../models/eventType";
import { useAddEventMutation, useDeleteEventMutation, useUpdateEventMutation } from "../../../redux/calendar-events/eventSlice";
import { EventModalProps } from "../../models/eventModalProps";
import { toast } from "react-hot-toast";
// import TimePicker from "react-time-picker";
// import DatePicker from "react-datepicker";

const FormDialog: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  changedEvent,
}) => {
  const [eventName, setEventName] = useState("");
  const [eventDay, setEventDay] = useState<Date | null | undefined >(null);
  const [eventTime, setEventTime] = useState<Moment | null>(null);
  const [notes, setNotes] = useState("");
  const [addEvent, { isLoading: isAdding, error: addError }] =
    useAddEventMutation();
  
const [updateEvent, { isLoading: isUpdating, error: updateError }] =
    useUpdateEventMutation();
  const [deleteEvent, { error: deleteError}] =
    useDeleteEventMutation();
  useEffect(() => {
    if (changedEvent) {
      setEventName(changedEvent.title || "");
      setEventDay(changedEvent.start);
      setEventTime(moment(changedEvent.start));
      setNotes(changedEvent.notes || "");
    } else {
      setEventName("");
      setEventDay(null);
      setEventTime(null);
      setNotes("");
    }
  }, [changedEvent]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newEvent: EventType = {
      title: eventName,
      start: combineDateAndTime(eventDay, eventTime),
      notes,
    };
try {
  if (changedEvent?.id) {
    await updateEvent({
      coll: "events",
      id: changedEvent.id,
      data: {
        title: eventName,
        start: combineDateAndTime(eventDay, eventTime) || "",
        notes,
      },
    }).unwrap();
    toast.success("Event successfully updated!");
  } else {
    await addEvent({
      coll: "events",
      data: newEvent,
    }).unwrap();
    toast.success("Event successfully added!");
  }
} catch (error) {
  console.error("Error:", error);
  toast.error(`Cannot add. Error: ${addError}`);
  
}
    setEventName("");
    setEventDay(null);
    setEventTime(null);
    setNotes("");
    onClose();
  };
  const handleDelete = async() => {
try {
  if (changedEvent?.id) {
    await deleteEvent({
      coll: "events",
      id: changedEvent?.id,
    }).unwrap();
    
    toast.success("Event successfully deleted!");
    setEventName("");
    setEventDay(null);
    setEventTime(null);
    setNotes("");
    onClose();
  }
} catch (error) {
  toast.error(`Cannot delete. Error: ${deleteError}`);

  console.error("Error:", error);
}
  }

  return (
    <>
      {isAdding && <p>Adding event...</p>}
      {isUpdating && <p>Updating event...</p>}

      {addError && <p>Error adding event: {addError.message}</p>}
      {updateError && <p>Error updating event: {updateError.message}</p>}
      <Dialog
        open={isOpen}
        onClose={onClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>
          {changedEvent?.title === "" ? "New Event" : changedEvent?.title}
        </DialogTitle>
        <DialogTitle>
          <IconButton
            aria-label="close"
            onClick={onClose}
            style={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            required
            margin="dense"
            id="eventName"
            name="eventName"
            label="Event Name"
            type="text"
            fullWidth
            variant="standard"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />

          <div>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <TimePicker
                label="Select time"
                value={eventTime}
                onChange={(newValue) => setEventTime(newValue)}
              />
            </LocalizationProvider>
            {/* <TimePicker
              onChange={(time) => setEventTime(time)}
              value={eventTime}
            /> */}
          </div>
          <div>
            <DatePicker
              value={eventDay}
              min={new Date()}
              onChange={(date: Date | null | undefined) => setEventDay(date)}
            />

            {/* <DatePicker selected={eventDay} /> */}
          </div>

          <TextField
            autoFocus
            required
            margin="dense"
            id="notes"
            name="notes"
            label="Notes"
            type="text"
            fullWidth
            variant="standard"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">
            {changedEvent?.title === "" ? "Add" : "Edit"}
          </Button>
          {changedEvent?.id && <button onClick={(e) => {e.stopPropagation();
    e.preventDefault(); handleDelete()}}>Delete</button>}
        </DialogActions>
      </Dialog>
    </>
  );
};
export default FormDialog;
