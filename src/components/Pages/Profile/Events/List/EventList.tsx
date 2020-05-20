import React, { FC } from "react";
import { Row, Col } from "react-bootstrap";
import { EventType } from "../../../../../store/events/types";
import { EventItem } from "./EventItem";

type PropTypes = {
  items: EventType[];
}

export const EventList: FC<PropTypes> = ({ items }: PropTypes) => {
  return (
    <Row className="mt-5">
      {items.map(item => (
        <Col xs={12} key={item.id}>
          <EventItem item={item} key={item.id} />
        </Col>
      ))}
    </Row>
  )
}