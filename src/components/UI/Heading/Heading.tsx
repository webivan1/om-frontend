import React, { FC, ReactNode } from "react";

type PropTypes = {
  children: ReactNode;
}

export const Heading: FC<PropTypes> = ({ children }: PropTypes) => <h2 className="mb-4">{children}</h2>