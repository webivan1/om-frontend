import React, { FC, useState } from "react";
import { Button, Nav } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { AnimationElement } from "../AnimationElement/AnimationElement";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export const SideBar: FC = () => {

  const [isSidebar, toggleSidebar] = useState<boolean>(true);

  const handleToggleSidebar = () => {
    toggleSidebar(prev => !prev);
  }

  return (
    <>
      <nav id="sidebar" className={isSidebar ? 'active' : ''}>
        <div className="custom-menu">
          <button type="button" onClick={handleToggleSidebar}>
            <FontAwesomeIcon icon={faBars} />
            <span className="sr-only">Toggle Menu</span>
          </button>
        </div>
        <div className="sidebar-content p-4">
          <h1 className="sidebar-content-top display-5 font-weight-bolder text-white mb-4">
            <Link to={'/'} className="sidebar-content-logo">
              Our<span className="text-warning">Rights</span>
              <span className="d-block text-secondary mt-1">
                Онлайн митинги
              </span>
            </Link>
          </h1>
          <div className="sidebar-content-center">
            <Nav className="flex-column">
              <Nav.Link as={NavLink} to={'/'} exact className="sidebar-nav-link">
                Главная
              </Nav.Link>
              <Nav.Link as={NavLink} to={'/events'} className="sidebar-nav-link">
                События
              </Nav.Link>
              <Nav.Link as={NavLink} to={'/about'} className="sidebar-nav-link">
                О проекте
              </Nav.Link>
            </Nav>
          </div>
          <div className="sidebar-content-bottom text-center">
            <AnimationElement nameEvent="shake" delay={4} interval={10} iterations={5}>
              <Button
                variant="warning"
                className="left-col-donate-button depth-1"
              >Donate</Button>
            </AnimationElement>
          </div>
        </div>
      </nav>

      <div onClick={handleToggleSidebar} className="sidebar-shadow" />
    </>
  );
}