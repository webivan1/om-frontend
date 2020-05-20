import React, { FC } from "react";
import { Spinner, Alert } from "react-bootstrap";
import { useEventDetail } from "./hooks/hookEventDetail";

import { EventDetailWrapper } from "./EventDetailWrapper";
import { Content } from "../../../Layouts/Content";

export const EventDetail: FC = () => {

  const { detail, loader, error } = useEventDetail();

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (loader || !detail) {
    return <Spinner animation="border" variant="primary" />;
  }

  return (
    <Content>
      <EventDetailWrapper event={detail} />
    </Content>
  );
};