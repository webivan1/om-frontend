import React, { FC } from "react";
import { Content } from "../../../Layouts/Content";
import { List } from "./List";
import { Heading } from "../../../UI/Heading/Heading";

export const EventList: FC = () => {
  return (
    <Content>
      <Heading>
        Все события
      </Heading>

      <List />
    </Content>
  )
}