"use strict";

import React from "react";
import {
  Nav,
  Navbar,
  NavItem
} from "react-bootstrap";

import "../shared.css";
import "./navbar.css";

import { Branding } from "./branding.jsx";

export const navbar = (props) => {
  return (
      <Navbar
          className="shadow"
          collapseOnSelect
          fluid
      >
        <Navbar.Header>
          <Branding />
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            {props.menuItems.map((one, index) =>
                <NavItem
                    eventKey={index}
                    key={one.name}
                    onClick={one.handler}
                >
                  {one.name}
                </NavItem>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
  )
};