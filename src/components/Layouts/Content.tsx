import React, { FC, ReactNode } from "react";

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