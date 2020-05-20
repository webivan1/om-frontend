import React, { FC } from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import { useUserDropdown } from "./hooks/hookUserDropdown";

export const UserDropdown: FC = () => {

  const {
    user,
    loaderLoginForm,
    handlerLogout,
    handleShowModal
  } = useUserDropdown();

  return (
    <>
      {user ? (
        <NavDropdown drop={'left'} id="user-profile" title={user.name}>
          <NavDropdown.Item>
            Профиль
          </NavDropdown.Item>
          <NavDropdown.Item onClick={handlerLogout}>
            Выйти
          </NavDropdown.Item>
        </NavDropdown>
      ) : (
        <Nav.Item>
          <Nav.Link
            disabled={loaderLoginForm}
            onClick={handleShowModal}
          >Войти</Nav.Link>
        </Nav.Item>
      )}
    </>
  );
}