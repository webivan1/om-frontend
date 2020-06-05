import React, { FC } from "react";
import { Button, Row, Col, Spinner, Alert } from "react-bootstrap";
import { useEventList } from "./hooks/hookEventList";
import { Pagination } from "../../../UI/Pagination/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faSync } from "@fortawesome/free-solid-svg-icons";
import { Item } from "./Item";

export const List: FC = () => {

  const {
    list: { loader, currentPage, perPage, items, total },
    lastPage,
    region,
    handleReloadList,
    handleMoreList,
    handleNextPage
  } = useEventList();

  if (region === null) {
    return (
      <Alert variant="warning" className="d-flex align-items-center">
        <span>Подождите...</span>
        <Spinner className="ml-auto" animation="border" variant="dark" />
      </Alert>
    );
  }

  return (
    <div>
      <Row className="justify-content-between mb-4">
        <Col md="auto" className="mb-sm-2 mb-md-0">
          <p>Всего событий: {total}</p>
        </Col>
        <Col md="auto">
          <Button variant="outline-secondary" onClick={handleReloadList}>
            {loader ? (
              <Spinner size="sm" animation="border" variant="primary" />
            ) : (
              <FontAwesomeIcon icon={faSync} />
            )}
          </Button>
        </Col>
      </Row>

      <Row>
        {items.map(item => (
          <Col key={item.id} md={4} sm={6} xs={12} className="mb-4">
            <Item item={item} />
          </Col>
        ))}
      </Row>

      <div className="d-flex justify-content-center">
        <Pagination
          currentPage={currentPage}
          perPage={perPage}
          total={total}
          disabled={loader}
          onChange={handleNextPage}
        />
      </div>

      {currentPage === lastPage ? null : (
        <div className="text-center">
          <Button size="lg" variant="info" onClick={handleMoreList}>
            Показать ещё
            <FontAwesomeIcon className="ml-2" icon={faSync} />
          </Button>
        </div>
      )}
    </div>
  );
}