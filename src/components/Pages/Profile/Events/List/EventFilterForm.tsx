import React, { FC } from "react";
import DatePicker from "react-datepicker";
import { Form, FormControl, Row, Col, Button } from "react-bootstrap";
import { useEventFormSearch } from "../hooks/hookEventFormSearch";

// Types
import { EventFilterParamsType } from "../../../../../store/events/profile/list/types";
import { EventStatuses, EventStatusLabels } from "../../../../../store/events/types";

type PropTypes = {
  onSubmit: (form: EventFilterParamsType) => void;
}

export const EventFilterForm: FC<PropTypes> = ({ onSubmit }: PropTypes) => {

  const {
    hookForm: { register, handleSubmit },
    regions,
    startDate,
    handleChangeDate,
    decoratorSubmit
  } = useEventFormSearch();

  return (
    <Form onSubmit={handleSubmit(decoratorSubmit(onSubmit))}>
      <Row>
        <Col md={4}>
          <Form.Group>
            <Form.Label>Статус</Form.Label>
            <Form.Control
              as="select"
              name="status"
              ref={register<FormControl & HTMLSelectElement>()}
            >
              <option value="">Все</option>
              <option value={EventStatuses.approved}>{EventStatusLabels.approved}</option>
              <option value={EventStatuses.moderation}>{EventStatusLabels.moderation}</option>
              <option value={EventStatuses.draft}>{EventStatusLabels.draft}</option>
              <option value={EventStatuses.reject}>{EventStatusLabels.reject}</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label>Регион</Form.Label>
            <Form.Control
              as="select"
              name="regionSlug"
              ref={register<FormControl & HTMLSelectElement>()}
            >
              <option value="">Все</option>

              {regions.map(({ label, slug }) => (
                <option value={slug} key={slug}>{label}</option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label>Название</Form.Label>
            <Form.Control
              type="text"
              name="title"
              ref={register<FormControl & HTMLInputElement>()}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Дата начала митинга</Form.Label>

            <DatePicker
              selected={startDate}
              onChange={handleChangeDate}
              isClearable
              customInput={(
                <Form.Control type="text" />
              )}
            />
          </Form.Group>
        </Col>
      </Row>

      <div>
        <Button type="submit" variant="info">Найти</Button>
      </div>
    </Form>
  )
}