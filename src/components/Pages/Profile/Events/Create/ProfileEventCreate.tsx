import React, { FC } from "react";
import { Button, Alert } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { EventForm } from "../Form/EventForm";
import { useNotification } from "../../../../Notification/hooks/hookNotification";
import { useProfileEventCreate } from "./hooks/hookProfileEventCreate";
import { Content } from "../../../../Layouts/Content";

export const ProfileEventCreate: FC = () => {
  const { add } = useNotification();
  const { loader, event, error, submitHandler } = useProfileEventCreate();

  if (event) {
    add('success', 'Вы успешно создали протест, сейчас он на модерации');
    return <Redirect to={`/profile/events`} />
  }

  return (
    <Content>
      <h2 className="mb-4">Создать протест</h2>

      <EventForm onSubmitHandler={submitHandler}>
        {error ? <Alert variant="danger">{error}</Alert> : null}

        <Button disabled={loader} type="submit">
          Создать
        </Button>
      </EventForm>
    </Content>
  )
}