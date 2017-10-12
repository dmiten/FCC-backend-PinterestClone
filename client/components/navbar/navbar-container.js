"use strict";

import { connect } from "react-redux";

import { navbar } from "./navbar.jsx";
import { modeSwitch } from "../../actions/mode-actions";
import {
  userWithTwitter,
  userSignOut
} from "../../actions/user-actions";

const mapStateToProps = state => { // ◄-----------------------------------------
  return {
    displayName: state.user.displayName,
    userId: state.user._id
  };
};

const mergeProps = (stateProps, dispatchProps) => { // ◄------------------------
  const { dispatch } = dispatchProps,
        menuItems = stateProps.displayName ?
          [
            { name: "all pics", handler: () => dispatch(modeSwitch(undefined)) },
            { name: "my pics", handler: () => dispatch(modeSwitch(stateProps.userId)) },
            { name: "sign out", handler: () => dispatch(userSignOut()) }
          ] : [
            { name: "all pics", handler: () => dispatch(modeSwitch(undefined)) },
            { name: "with twitter", handler: () => dispatch(userWithTwitter()) }
          ];
  return {
    menuItems: menuItems
  };
};

const NavbarContainer = connect(mapStateToProps, null, mergeProps)(navbar);

export default NavbarContainer;