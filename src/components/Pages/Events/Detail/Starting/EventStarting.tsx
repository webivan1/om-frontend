import React, { FC, useState } from "react";
import { EventPropTypes } from "../types";
import { Card, Col, Row } from "react-bootstrap";

import { Map } from "../../../../Map/LeafletMap";

export const EventStarting: FC<EventPropTypes> = ({ event, timeToFinish }: EventPropTypes) => {

  const [total, setTotal] = useState<number>(0)

  return (
    <div>
      <Row className="justify-content-between">
        <Col md="auto">
          <p>Кол-во участников: {total}</p>
        </Col>
        <Col md="auto">
          <p>Окончание митинга {timeToFinish}</p>
        </Col>
      </Row>

      <Card className="depth-1">
        <Map
          event={event}
          onSetTotal={setTotal}
        />
      </Card>
    </div>
  );
};