"use strict";

import React from "react";
import { connect } from "react-redux";

import {
  Navbar
} from "../components";

import { AddPic } from "../components";
import { Wall } from "../components";

const mapStateToProps = state => {
  return {
    ...state
  };
};

class AppContainer extends React.Component {

  render() {
    return (
        <div id="app-main">
          <Navbar />
            {
              this.props.user._id &&
              this.props.user._id === this.props.mode.userIdToShow ?
                <AddPic /> :
                null
            }
          <Wall />
        </div>
    )
  }
}

export default connect(mapStateToProps)(AppContainer)