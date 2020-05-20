import React, { FC } from "react";
import { EventPropTypes } from "../types";
import moment from "../../../../../services/moment";
import { EventChart } from "./EventChart";

export const EventFinished: FC<EventPropTypes> = ({ event }: EventPropTypes) => {

  const finishDate = moment(event.finishAt)
    .utcOffset(event.timezoneUTC)
    .format('в HH:mm, Do MMM YYYY')

  return (
    <div>
      <p className="lead">
        Митинг заканчился {finishDate}
      </p>

      <EventChart event={event} />
    </div>
  )
}