import React, { FC } from "react";
import { Spinner as SpinnerBS, Container } from "react-bootstrap";

export const SpinnerBlock: FC = () => (
  <Container fluid>
    <div className="d-flex align-items-center justify-content-center py-3">
      <SpinnerBS animation={'grow'} variant={'info'} />
    </div>
  </Container>
);