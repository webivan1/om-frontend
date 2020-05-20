import React, { FC } from "react";
import { Content } from "../../../Layouts/Content";
import { List } from "./List";

export const EventList: FC = () => {
  return (
    <Content>
      <h1 className="mb-4">
        Все события
      </h1>

      <List />
    </Content>
  )
}