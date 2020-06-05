import React, { FC } from "react";
import { Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Content } from "../../../Layouts/Content";
import { EventList } from "./List/EventList";
import { EventFilterForm } from "./List/EventFilterForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faSync } from "@fortawesome/free-solid-svg-icons";
import { useEventList } from "./hooks/hookEventList";
import { Pagination } from "../../../UI/Pagination/Pagination";

type HeadingPropTypes = {
  total: number;
  loader: boolean;
  reloadList: () => void;
};

const Heading: FC<HeadingPropTypes> = ({ total, loader, reloadList }: HeadingPropTypes) => (
  <>
    <h2 className="mb-4">
      Список мероприятий
    </h2>

    <div className="d-flex justify-content-between align-content-center mb-4">
      <p>Всего: <b>{total}</b></p>

      <div className="d-flex align-content-center">
        {loader ? <Spinner animation="border" variant="primary" /> : null}

        <Button
          disabled={loader}
          variant="outline-info"
          className="mx-sm-1 mx-md-2"
          onClick={reloadList}
        >
          <FontAwesomeIcon icon={faSync} />
        </Button>

        <Button as={Link} to={'/profile/events/add'}>
          Добавить
        </Button>
      </div>
    </div>
  </>
)

export const ProfileEvents: FC = () => {

  const {
    eventList: { loader, total, items, currentPage, perPage, error, lastPage },
    handleReloadList,
    handleChangePagination,
    handleNextPage,
    handleSearchForm
  } = useEventList();

  return (
    <Content>
      {/* Local component */}
      <Heading
        total={total}
        loader={loader}
        reloadList={handleReloadList}
      />

      <EventFilterForm
        loader={loader}
        onSubmit={handleSearchForm}
      />

      <EventList items={items} />

      <div className="pt-4 mb-3 d-flex justify-content-center">
        <Pagination
          currentPage={currentPage}
          perPage={perPage}
          total={total}
          disabled={loader}
          onChange={handleChangePagination}
        />
      </div>

      {currentPage !== lastPage ? (
        <div className="text-center">
          <Button
            onClick={handleNextPage}
            disabled={loader}
            variant="outline-primary"
            size="lg"
          >
            Ещё {' '} <FontAwesomeIcon className="ml-2" icon={faSpinner} />
          </Button>
        </div>
      ) : null}
    </Content>
  )
}