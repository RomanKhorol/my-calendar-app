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
import { EventType } from "../calendar/Calendar";
// import TimePicker from "react-time-picker";
// import DatePicker from "react-datepicker";
import "react-time-picker/dist/TimePicker.css";
import "react-datepicker/dist/react-datepicker.css";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment, { Moment } from "moment";
interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEvent: (someEvent: EventType) => void;
  onChangeEvent: (someEvent: EventType) => void;
  changedEvent: EventType | undefined;
}
const FormDialog: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  onAddEvent,
  onChangeEvent,
  changedEvent,
}) => {
  const [eventName, setEventName] = useState("");
  const [eventDay, setEventDay] = useState<Date | null | undefined>(null);
  const [eventTime, setEventTime] = useState<Moment | null>(null);
  const [notes, setNotes] = useState("");
  useEffect(() => {
    if (changedEvent) {
      setEventName(changedEvent.title || "");
      setEventDay(changedEvent.start ? new Date(changedEvent.start) : null);
      setEventTime(changedEvent.start ? moment(changedEvent.start) : null);
      setNotes(changedEvent.notes || "");
    } else {
      setEventName("");
      setEventDay(null);
      setEventTime(null);
      setNotes("");
    }
  }, [changedEvent]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newEvent: EventType = {
      title: eventName,
      start: combineDateAndTime(eventDay, eventTime),
      notes,
    };

    if (changedEvent) {
      onChangeEvent(newEvent);
    } else {
      onAddEvent(newEvent);
    }

    setEventName("");
    setEventDay(null);
    setEventTime(null);
    setNotes("");
    onClose();
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={onClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Please fill form</DialogTitle>
        <DialogTitle>
          New Event
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
          <Button type="submit">Edit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default FormDialog;
