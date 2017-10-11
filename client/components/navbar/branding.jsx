"use strict";

import React from "react";

import "../shared.css";
import "./navbar.css";

export const Branding = () => { // ◄--------------------------------------------

  return (
      <div id="branding">
        <div id="name">
          picTerest&nbsp;|&nbsp;
          <span id="discribe">
              <sub>
                piggy bank of pics
              </sub>
            </span>
        </div>
        <div id="copyright">
          <span>
                dmiten |&nbsp;
            <a href="https://github.com/dmiten/FCC-backend-PinterestClone"
               target="blank">
                <span className="fa fa-github" id="githublogo"/>
              </a>
          </span>
          &nbsp;2017
        </div>
        <br />
      </div>
  )
};