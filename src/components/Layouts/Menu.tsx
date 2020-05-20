import React, { FC } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { RegionsDropdown } from "./RegionsDropdown";
import { UserDropdown } from "./UserDropdown";

export const Menu: FC = () => {
  return (
    <Navbar expand="lg" className="mb-4">
      <Nav className="mr-auto">
        <RegionsDropdown />
      </Nav>
      <Nav>
        <UserDropdown />
      </Nav>
    </Navbar>
  )
};