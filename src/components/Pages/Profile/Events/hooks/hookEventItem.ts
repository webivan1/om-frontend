import { useEffect, useState } from "react";
import moment from "../../../../../services/moment";
import { isRemove, isEditable } from "../../../../../store/events/profile/rules";

// Types
import { EventType } from "../../../../../store/events/types";

export type HookEventFormSearchResponse = {
  begin: moment.Moment;
  end: moment.Moment;
  timeToMeeting: string;
  timeToFinish: string;
  isStarted: boolean;
  isFinished: boolean;
  canRemove: boolean;
  canEditable: boolean;
};

export const useEventItem = (item: EventType): HookEventFormSearchResponse => {
  const begin = moment(new Date(item.startAt));
  const end = moment(new Date(item.finishAt));

  const getFromNow = (): string => begin.fromNow();
  const getToFinish = (): string => end.fromNow();

  const [timeToMeeting, setTimeToMeeting] = useState<string>(getFromNow());
  const [timeToFinish, setTimeToFinish] = useState<string>(getToFinish());

  const [isStarted, setIsStarted] = useState<boolean>(item.isStarted);
  const [isFinished, setIsFinished] = useState<boolean>(item.isFinished);
  const [canRemove, setCanRemove] = useState<boolean>(false);
  const [canEditable, setCanEditable] = useState<boolean>(false);

  const handleCanRemove = () => setCanRemove(isRemove(item));
  const handleCanEditable = () => setCanEditable(isEditable(item));

  useEffect(() => {
    const timer = setInterval(() => {
      const currentDate: number = moment().valueOf();

      if (currentDate >= begin.valueOf() && currentDate < end.valueOf()) {
        setIsStarted(true);
      }

      if (currentDate >= end.valueOf()) {
        setIsFinished(true);
      }

      setTimeToMeeting(getFromNow());
      setTimeToFinish(getToFinish());

      handleCanRemove();
      handleCanEditable();
    }, 1000);

    return function cleanup() {
      clearInterval(timer);
    }
  }, [item.id]);

  return {
    begin,
    end,
    timeToMeeting,
    timeToFinish,
    isStarted,
    isFinished,
    canRemove,
    canEditable
  };
}