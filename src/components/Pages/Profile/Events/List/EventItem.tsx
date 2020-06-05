import React, { FC } from "react";
import { Badge, ButtonGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEventItem } from "../hooks/hookEventItem";

// Types
import {
  EventStatusClasses,
  EventStatuses,
  EventStatusLabels,
  EventType
} from "../../../../../store/events/types";

type PropTypes = {
  item: EventType;
}

type StatusPropTypes = {
  item: EventType;
  isStarted: boolean;
  isFinished: boolean;
  timeToMeeting: string;
}

const Status: FC<StatusPropTypes> = ({ item, isFinished, isStarted, timeToMeeting }: StatusPropTypes) => {
  let statusMeeting = null;

  if (item.status === EventStatuses.approved) {
    if (isFinished) {
      statusMeeting = <Badge variant="info">Мероприятие закончено</Badge>;
    } else if (isStarted && !isFinished) {
      statusMeeting = <Badge variant="success">Проходит сейчас!</Badge>
    } else {
      statusMeeting = <small className="text-success d-block">Митинг начнется {timeToMeeting}</small>;
    }
  } else {
    statusMeeting = <Badge variant={EventStatusClasses[item.status]}>
      {EventStatusLabels[item.status]}
    </Badge>
  }

  return statusMeeting;
}

export const EventItem: FC<PropTypes> = ({ item }: PropTypes) => {

  const {
    begin, end, isStarted, isFinished, timeToMeeting, canEditable, canRemove
  } = useEventItem(item);

  return (
    <div className="border-top border-bottom border-light row py-3 py-md-4 align-items-center justify-content-between">
      <div className="col-md-2 mb-sm-2 mb-md-0">
        <Status
          item={item}
          isStarted={isStarted}
          isFinished={isFinished}
          timeToMeeting={timeToMeeting}
        />
      </div>
      <div className="col-md-3 mb-sm-2 mb-md-0">
        {item.title}
      </div>
      <div className="col-md-auto text-uppercase mb-sm-2">
        {item.region.label} <small>{item.timezoneUTC}</small>
      </div>
      <div className="col-md-auto mb-sm-2 mb-md-0 mb-xs-2">
        {begin.format('Do MMMM, c HH:mm')} - {end.format('HH:mm')}<br />
        <span>Длительность</span> {item.interval} ч.
      </div>
      <div className="col-sm-12 col-md-auto mb-sm-2 mb-md-0">
        <ButtonGroup size="sm">
          {item.status === EventStatuses.approved ? (
            <Button as={Link} variant="info" to={`/events/${item.id}`}>
              <FontAwesomeIcon icon={faEye} />
            </Button>
          ) : null}
          {canEditable ? (
            <Button as={Link} variant="warning" to={`/profile/events/edit/${item.id}`}>
              <FontAwesomeIcon icon={faEdit} />
            </Button>
          ) : null}
          {canRemove ? (
            <Button variant="danger" type="button">
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          ) : null}
        </ButtonGroup>
      </div>
    </div>
  )
}