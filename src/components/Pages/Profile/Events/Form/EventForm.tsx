import React, { FC, ReactNode } from "react";
import { Form } from "react-bootstrap";
import { useEventForm } from "./hooks/hookEventForm";
import DatePicker from "react-datepicker";

// Types
import { EventFormType } from "../../../../../store/events/profile/types";

type PropTypes = {
  children: ReactNode;
  onSubmitHandler: (form: EventFormType) => void;
  defaultParams?: EventFormType;
}

export const EventForm: FC<PropTypes> = ({ children, onSubmitHandler, defaultParams }: PropTypes) => {

  const {
    register,
    handleSubmit,
    errors,
    regions,
    startDate,
    minDate,
    handleChangeDate,
    decoratorSubmit
  } = useEventForm(defaultParams);

  return (
    <Form onSubmit={handleSubmit(decoratorSubmit(onSubmitHandler))}>
      <Form.Group>
        <Form.Label>Заголовок</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          maxLength={150}
          name="title"
          ref={register({ required: true, minLength: 5, maxLength: 150 })}
          isInvalid={!!errors.title}
        />
        <Form.Control.Feedback type={'invalid'}>
          Заголовок протеста обязателен (от 5 до 150 символов)
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Form.Label>Описание</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          maxLength={255}
          name="description"
          ref={register({ required: true, minLength: 10, maxLength: 255 })}
          isInvalid={!!errors.description}
        />
        <Form.Control.Feedback type={'invalid'}>
          Заполните описание протеста (от 10 до 255 символов)
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Form.Label>Регион проведения митинга</Form.Label>
        <Form.Control
          as="select"
          name="region"
          ref={register({ required: true })}
          isInvalid={!!errors.region}
          disabled={!!defaultParams}
        >
          {regions.map(({ id, label }) => (
            <option value={id} key={id}>{label}</option>
          ))}
        </Form.Control>
        <Form.Control.Feedback type={'invalid'}>
          Выберите регион протеста
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Form.Label>Дата начала митинга</Form.Label>
        <DatePicker
          selected={startDate}
          onChange={handleChangeDate}
          minDate={minDate.toDate()}
          timeFormat="HH:mm"
          timeIntervals={60}
          showTimeSelect
          isClearable
          disabled={!!defaultParams}
          dateFormat="MMMM d, yyyy HH:mm"
          customInput={(
            <Form.Control type="text" />
          )}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Продолжительность митинга</Form.Label>
        <Form.Control
          as="select"
          name="duration"
          ref={register({ required: true })}
          isInvalid={!!errors.duration}
        >
          <option value={3600}>1 час</option>
          <option value={7200}>2 часа</option>
          <option value={10800}>3 часа</option>
          <option value={18000}>5 часов</option>
          <option value={28800}>8 часов</option>
          <option value={86400}>1 день</option>
        </Form.Control>
        <Form.Control.Feedback type={'invalid'}>
          Укажите продолжительность митинга
        </Form.Control.Feedback>
      </Form.Group>

      {children}
    </Form>
  )
};