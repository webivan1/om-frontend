import React, { FC } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import { ProfileEvents } from "./Events/ProfileEvents";

export const Profile: FC = () => {

  const { path } = useRouteMatch();

  return (
    <div>
      {/* Here is profile navigation */}

      <Switch>
        <Route path={`/profile/events`} component={ProfileEvents} />
      </Switch>
    </div>
  )
}