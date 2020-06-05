import React, { FC } from "react";
import { Switch, Route, useRouteMatch, NavLink } from "react-router-dom";
import { Nav, Container } from "react-bootstrap";
import UserModel from "../../../store/user/models/UserModel";

// Pages
import { ProfileEvents } from "./Events/ProfileEvents";
import { ProfileEventCreate } from "./Events/Create/ProfileEventCreate";
import { ProfileEventUpdate } from "./Events/Update/ProfileEventUpdate";

export const Profile: FC = () => {

  const { path } = useRouteMatch();

  const model = UserModel.call();

  return (
    <>
      <Container fluid>
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link as={NavLink} to={path} exact>Профиль</Nav.Link>
          </Nav.Item>
          {model && model.canControlEvents() ? (
            <Nav.Item>
              <Nav.Link as={NavLink} to={`${path}/events`}>Мои протесты</Nav.Link>
            </Nav.Item>
          ) : null}
        </Nav>
      </Container>

      <Switch>
        {model && model.canControlEvents() ? (
          <>
            <Route path={`${path}/events`} exact component={ProfileEvents} />
            <Route path={`${path}/events/add`} component={ProfileEventCreate} />
            <Route path={`${path}/events/edit/:id`} component={ProfileEventUpdate} />
          </>
        ) : null}
      </Switch>
    </>
  )
}