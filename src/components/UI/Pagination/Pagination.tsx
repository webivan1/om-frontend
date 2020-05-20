import React, { FC } from "react";
import PaginationComponent from "react-js-pagination";

export type PaginationPropTypes = {
  currentPage: number;
  perPage: number;
  total: number;
  disabled: boolean;
  onChange: (page: number) => void;
};

export const Pagination: FC<PaginationPropTypes> = (
  { currentPage, perPage, total, disabled, onChange }: PaginationPropTypes
) => {

  if (total <= perPage) {
    return null;
  }

  return (
    <PaginationComponent
      itemClass="page-item"
      linkClass="page-link"
      activePage={currentPage}
      itemsCountPerPage={perPage}
      totalItemsCount={total}
      pageRangeDisplayed={5}
      onChange={disabled ? () => {} : onChange}
    />
  )
}