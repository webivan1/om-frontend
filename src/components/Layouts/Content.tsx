import React, { FC, ReactNode, createRef } from "react";
import { useHistory } from "react-router-dom";

type PropTypes = {
  children: ReactNode;
}

export const Content: FC<PropTypes> = ({ children }: PropTypes) => {
  return (
    <div className="container py-sm-3 py-md-5 content animated fadeInDownBig">
      {children}
    </div>
  )
}