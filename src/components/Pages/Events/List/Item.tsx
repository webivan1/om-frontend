import React, { FC } from "react";
import { Card, Badge, Button } from "react-bootstrap";
import { Link, useRouteMatch } from "react-router-dom";
import { useEventItem } from "./hooks/hookEventItem";

// Types
import { EventType } from "../../../../store/events/types";

type PropTypes = {
  item: EventType;
}

export const Item: FC<PropTypes> = ({ item }: PropTypes) => {

  const { timeToMeeting, isStarted, isFinished, params } = useEventItem(item);
  const { path } = useRouteMatch();

  const detailUrl: string = `${path}/${item.id}`;

  return (
    <Card {...params.card} className="circle-effect">
      <Card.Body>
        <Card.Title>
          {item.region.label}

          <Card.Subtitle className="mt-1">
            <Badge {...params.badge} className="depth-1">{timeToMeeting}</Badge>
          </Card.Subtitle>
        </Card.Title>
        <Card.Text>
          {item.title}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        {isFinished ? (
          <Button as={Link} to={detailUrl} variant="link" className="text-white">
            Посмотреть
          </Button>
        ) : (
          isStarted ? (
            <Button as={Link} to={detailUrl} variant="success" className="depth-1">
              Принять участие
            </Button>
          ) : (
            <Button as={Link} to={detailUrl} variant="warning" className="depth-1">
              Приму участие
            </Button>
          )
        )}
      </Card.Footer>
    </Card>
  )
}