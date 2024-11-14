import { Moment } from "moment";

export const combineDateAndTime = (
  eventDay: Moment | null,
  eventTime: Moment | null
): Date | null => {
  if (!eventDay || !eventTime) return null;
  const combinedMoment = eventDay.clone();
  combinedMoment.set({
    hour: eventTime.hour(),
    minute: eventTime.minute(),
  });
  return combinedMoment.toDate();
};
