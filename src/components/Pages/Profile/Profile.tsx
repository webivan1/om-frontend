import React, { FC } from "react";
import { Switch, Route, useRouteMatch, NavLink } from "react-router-dom";

import { ProfileEvents } from "./Events/ProfileEvents";

export const Profile: FC = () => {

  const { path } = useRouteMatch();

  return (
    <div>
      <ul>
        <li>
          <NavLink to={path}>Home</NavLink>
        </li>
        <li>
          <NavLink to={`${path}/events`}>Events</NavLink>
        </li>
      </ul>

      <Switch>
        <Route path={`${path}/events`} exact component={ProfileEvents} />
        <Route path={`${path}/events/add`} component={ProfileEvents} />
        <Route path={`${path}/events/edit/:id`} component={ProfileEvents} />
      </Switch>
    </div>
  )
}