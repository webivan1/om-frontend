import React, { FC } from "react";
import { Button, Alert } from "react-bootstrap";
import { EventForm } from "../Form/EventForm";
import { useProfileEventUpdate } from "./hooks/hookProfileEventUpdate";

// Types
import { EventFormType } from "../../../../../store/events/profile/types";
import { Content } from "../../../../Layouts/Content";
import { SpinnerBlock } from "../../../../UI/Spinner/Spinner";

export const ProfileEventUpdate: FC = () => {

  const { detail, form, submitHandler } = useProfileEventUpdate();

  if (detail.error) {
    return <Alert variant="danger">{detail.error}</Alert>
  }

  if (detail.loader || !detail.event) {
    return <SpinnerBlock />
  }

  const params: EventFormType = {
    title: detail.event.title,
    description: detail.event.description,
    region: detail.event.region.id,
    duration: detail.event.interval * 3600,
    startAt: detail.event.startAt
  }

  return (
    <Content>
      <h2 className="mb-4">Редактировать протест #{detail.event.id}</h2>

      <EventForm onSubmitHandler={submitHandler} defaultParams={params}>
        <Alert variant="info">
          При сохранении изменений, событие отправится на модерацию
        </Alert>

        {form.error ? <Alert variant="danger">{form.error}</Alert> : null}
        {form.success ? <Alert variant="success">{form.success}</Alert> : null}

        <Button disabled={form.loader} type="submit">
          Обновить
        </Button>
      </EventForm>
    </Content>
  )
}