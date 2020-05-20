import React, { FC } from "react";
import { useEventDetailStatus } from "./hooks/hookEventDetailStatus";

// Components
import { EventWaiting } from "./Waiting/EventWaiting";
import { EventStarting } from "./Starting/EventStarting";
import { EventFinished } from "./Finished/EventFinished";

// Types
import { EventType } from "../../../../store/events/types";
import { ConfigType } from "./types";

type PropTypes = {
  event: EventType;
}

const config: ConfigType = {
  waiting: EventWaiting,
  starting: EventStarting,
  finished: EventFinished
};

export const EventDetailWrapper: FC<PropTypes> = ({ event }: PropTypes) => {
  const { status, timeToMeeting, timeToFinish } = useEventDetailStatus(event);
  const Component = config[status];

  return (
    <>
      <h2 className="mb-4">{event.title}</h2>

      <p className="lead mb-4">{event.description}</p>

      <Component
        event={event}
        timeToMeeting={timeToMeeting}
        timeToFinish={timeToFinish}
      />
    </>
  );
}