import React, { useEffect, useState } from "react";
import { BadgeProps, CardProps } from "react-bootstrap";
import { useEventItem as useProfileEventItem } from "../../../Profile/Events/hooks/hookEventItem";

// Types
import { EventType } from "../../../../../store/events/types";

type ParamColorsType = {
  card: CardProps;
  badge: BadgeProps;
}

export const useEventItem = (item: EventType) => {
  const { timeToMeeting, isStarted, isFinished } = useProfileEventItem(item);

  const [params, setParams] = useState<ParamColorsType>({
    card: {
      bg: 'success',
      text: 'light'
    },
    badge: {
      variant: 'primary'
    }
  });

  useEffect(() => {
    if (isFinished) {
      setParams({
        card: {
          bg: 'primary',
          text: 'light'
        },
        badge: {
          variant: 'dark'
        }
      })
    }
  }, [isFinished]);

  return {
    timeToMeeting,
    isStarted,
    isFinished,
    params
  };
}