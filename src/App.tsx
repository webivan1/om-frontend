import React, { FC, useEffect }  from "react";
import "./style/main.scss";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { autoLoginAsync } from "./store/login/actions";

// Types
import { RootState } from "./store/store";
import { UserStateType } from "./store/user/types";

// Layouts
import { SideBar } from "./components/Layouts/SideBar";
import { Menu } from "./components/Layouts/Menu";

// Routing
import { Home } from "./components/Pages/Home/Home";
import { EventList } from "./components/Pages/Events/List/EventList";
import { AboutUs } from "./components/Pages/AboutUs/AboutUs";
import { Profile } from "./components/Pages/Profile/Profile";
import { Login } from "./components/Auth/Login/Login";
import { EventDetail } from "./components/Pages/Events/Detail/EventDetail";

export const App: FC = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(autoLoginAsync());
  }, [dispatch]);

  const { user } = useSelector<RootState, UserStateType>(state => state.user);

  return (
    <BrowserRouter>
      <main>
        <SideBar />

        <Login />

        <div id="content" className="px-md-5 pb-md-5">
          <Menu />

          <Switch>
            <Route path={'/'} exact component={Home} />
            <Route path={'/events'} exact component={EventList} />
            <Route path={'/events/:id'} component={EventDetail} />
            <Route path={'/about'} exact component={AboutUs} />
            {user ? (
              <Route path={'/profile'} component={Profile} />
            ) : null}
          </Switch>
        </div>
      </main>
    </BrowserRouter>
  )
};
