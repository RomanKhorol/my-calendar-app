import { EventType } from "./eventType";

export interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  changedEvent: EventType | undefined;
}
