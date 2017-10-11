"use strict";

import React from "react";
import { connect } from "react-redux";
import ScrollToTop from "react-scroll-up";

import {
  AddPic,
  Navbar,
  Wall
} from "../components";

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
          <ScrollToTop showUnder={160}>
            <b>UP</b>
          </ScrollToTop>
        </div>
    )
  }
}

export default connect(mapStateToProps)(AppContainer)