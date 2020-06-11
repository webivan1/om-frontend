import React, { FC } from "react";
import { Alert, Button } from "react-bootstrap";
import { useDetectUser } from "./hook/hookDetectUser";
import { EventType } from "../../store/events/types";

type PropTypes = {
  event: EventType;
}

export const DetectUser: FC<PropTypes> = ({ event }: PropTypes) => {

  const {
    error, position, isOnline, offlineHandler, onlineHandler
  } = useDetectUser(event);

  if (error) {
    return <Alert variant="danger">{error}</Alert>
  }

  return (
    <div className="mb-3">
      <p>Ваши координаты: {position?.lat.toFixed(4)}, {position?.lng.toFixed(4)}</p>

      {isOnline ? (
        <div>
          <Alert variant="success" className="mb-2">
            Вы сейчас онлайн! Если хотите оставаться на митинге,
            то не закрывайте текущую страницу
          </Alert>

          <Button onClick={offlineHandler} variant="secondary">
            Отключиться
          </Button>
        </div>
      ) : (
        <Button onClick={onlineHandler} variant="success">
          Хочу участвовать!
        </Button>
      )}
    </div>
  )
}