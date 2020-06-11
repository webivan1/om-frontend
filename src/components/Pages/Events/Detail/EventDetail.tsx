import React, { FC } from "react";
import { Alert } from "react-bootstrap";
import { useEventDetail } from "./hooks/hookEventDetail";
import { EventDetailWrapper } from "./EventDetailWrapper";
import { SpinnerBlock } from "../../../UI/Spinner/Spinner";

export const EventDetail: FC = () => {

  const { detail, loader, error } = useEventDetail();

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (loader || !detail) {
    return <SpinnerBlock />;
  }

  return (
    <div className="container py-sm-3 py-md-5 content">
      <EventDetailWrapper event={detail} />
    </div>
  );
};