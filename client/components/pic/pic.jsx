"use strict";

import React from "react";
import {
  Button,
  Image,
  OverlayTrigger,
  Panel,
  Tooltip
} from "react-bootstrap";

import "./pic.css";

export const Pic = (props) => {

  const isLiked = () => { // ◄--------------------------------------------------
    return props.pic.likes.indexOf(props.user._id) !== -1;
  };

  const handleImageError = () => { // ◄-----------------------------------------
    document.getElementById("image").src = "broken-image-stub.jpg";
  };

  const ownerButton = ( // ◄----------------------------------------------------
      <OverlayTrigger
          placement="top"
          overlay={
            <Tooltip id="ownertooltip">
              {props.pic.owner.username}
            </Tooltip>
          }
      >
          <Button
              className="picbutton"
              onClick={props.selectUserHandler}
          >
              <Image
                  responsive
                  rounded
                  src={props.pic.owner.profilePhoto || "no-avatar-stub.jpg"}
              />
        </Button>
      </OverlayTrigger>
  );

  const delButton = ( // ◄------------------------------------------------------
      <Button
          bsStyle="warning"
          className="picbutton"
          onClick={props.delHandler}
      >
        <i className="fa fa-times-circle" aria-hidden="true"/>
      </Button>
  );

  const likeButton = ( // ◄-----------------------------------------------------
      <Button
          bsStyle={isLiked() ? "info" : "primary"}
          className="picbutton"
          disabled={!props.user._id}
          onClick={props.likeHandler}
      >
        {props.pic.likes.length}&nbsp;
        <i aria-hidden="true"
           className={isLiked() ? "fa fa-thumbs-up" : "fa fa-thumbs-o-up"}
        />
      </Button>
  );

  return ( // ◄-----------------------------------------------------------------
      <div id="picdiv">
        <Panel
            bsStyle="primary"
            id="picpanel"
        >
          <Image
              responsive
              rounded
              id="image"
              className="picimage"
              src={props.pic.url}
              alt={props.pic.alt}
              onError={handleImageError}
          />
          <div
              className="text-center"
              id="picalttext"
          >
            {props.pic.alt}
          </div>
          <div id="picbuttons">
            {ownerButton}
            {props.pic.owner._id === props.user._id ? delButton : null}
            {likeButton}
          </div>
        </Panel>
      </div>
  )
};