import { Moment } from "moment";

export const combineDateAndTime = (
  eventDay: Date | null | undefined,
  eventTime: Moment | null
): Date | null => {
  if (!eventDay || !eventTime) return null;

  const combinedDate = new Date(eventDay);
  combinedDate.setHours(eventTime.hour(), eventTime.minute());

  return combinedDate;
};
