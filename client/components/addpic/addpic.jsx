"use strict";

import React from "react";
import {
  Button,
  FormControl,
  Panel
} from "react-bootstrap";

import "./addpic.css";

export const AddPic = (props) => {
  return (
      <div>
        <Button
            bsSize="xsmall"
            bsStyle="primary"
            onClick={props.collapseHandler}
        >
          add new pic
        </Button>
        <Panel
            collapsible
            expanded={props.open}
            id="addpicpanel"
        >
          <div id="addpicpanelbody">
            <div
                className="inlineblock"
                id="addpicinputdiv"
            >
              <FormControl
                  bsSize="small"
                  className="text-center margin2px"
                  id="urlinput"
                  name="url"
                  placeholder="pic url"
                  type="url"
                  onChange={event => props.inputHandler(event)}
                  value={props.values.urlvalue}
              />
              <FormControl
                  bsSize="small"
                  className="text-center margin2px"
                  id="altinput"
                  name="alt"
                  placeholder="description"
                  type="text"
                  onChange={event => props.inputHandler(event)}
                  value={props.values.altvalue}
              />
            </div>
            <Button
                id="addpicbutton"
                bsStyle="success"
                onClick={props.submitHandler}
            >
              <i aria-hidden="true"
                 className="fa fa-plus-circle"
              />
            </Button>
          </div>
          <div className="text-center">
            <span id="addpicservicemessage">
              {props.serviceMessage}
            </span>
          </div>
        </Panel>
      </div>
  );
};