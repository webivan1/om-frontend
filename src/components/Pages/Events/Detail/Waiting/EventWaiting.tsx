import React, { FC } from "react";
import { EventPropTypes } from "../types";

export const EventWaiting: FC<EventPropTypes> = ({ timeToMeeting }: EventPropTypes) => {
  return (
    <div className="h3 mt-5 mb-3 text-success">
      Митинг начнется {timeToMeeting.toLowerCase()}
    </div>
  )
}