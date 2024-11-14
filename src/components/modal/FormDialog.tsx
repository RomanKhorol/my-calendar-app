import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { IconButton } from "@mui/material";
import { DesktopDatePicker, DesktopTimePicker } from "@mui/x-date-pickers";
import { Moment } from "moment";
import { combineDateAndTime } from "../../helpers/CombineDateAndTime";
interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const FormDialog: React.FC<EventModalProps> = ({ isOpen, onClose }) => {
  const [eventName, setEventName] = useState("");
  const [eventDay, setEventDay] = useState<Moment | null>(null);
  const [eventData, setEventData] = useState<Date | null>(null);
  const [eventTime, setEventTime] = useState<Moment | null>(null);
  const [notes, setNotes] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const newEventData = combineDateAndTime(eventDay, eventTime);
    setEventData(newEventData);
    console.log(newEventData);
    console.log(formJson);
    console.log(eventData);
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
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DesktopDatePicker
              label="Event Day"
              value={eventDay}
              onChange={(newValue: Moment | null) => setEventDay(newValue)}
            />
            <DesktopTimePicker
              label="Event Time"
              value={eventTime}
              onChange={(newValue: Moment | null) => setEventTime(newValue)}
            />
          </LocalizationProvider>
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
