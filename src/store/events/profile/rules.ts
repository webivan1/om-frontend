import { EventStatuses, EventType } from "../types";
import moment from "../../../services/moment";

export const isRemove = (item: EventType): boolean => {
  if (item.status === EventStatuses.draft || item.status === EventStatuses.reject) {
    return true;
  } else if (item.status === EventStatuses.moderation) {
    return false;
  } else if (item.status === EventStatuses.approved) {
    const currentDate = moment().utcOffset(item.timezoneUTC).valueOf();
    const meetingStart = moment(new Date(item.startAt)).subtract(3, 'days').valueOf();

    if (currentDate >= meetingStart) {
      return false;
    }

    return true;
  }

  throw new Error(`${item.status} undefined status`);
}

export const isEditable = (item: EventType): boolean => {
  return isRemove(item);
}