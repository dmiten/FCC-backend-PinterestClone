"use strict";

import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import imagesLoaded from "imagesloaded";

import { picAdd } from "../../actions/pics-actions";
import { fetchPics } from "../../actions/utils";
import { Wall } from "./wall.jsx";

const mapStateToProps = state => ({
  ...state
});

class WallContainer extends React.Component {

  constructor(props) {
    super(props);
    this.masonryInstance = undefined;
    this.hasMore = true;
    this.limit = 20;
    this.page = 1;
    this.preservedPage = undefined;
    this.preservedHasMore = undefined;
  }

  componentWillReceiveProps(nextProps) { // ◄-----------------------------------

    imagesLoaded(".picimage", () => this.masonryInstance.forcePack());

    if (nextProps.mode.userIdToShow !== this.props.mode.userIdToShow) {
      if (!this.props.mode.userIdToShow && nextProps.mode.userIdToShow) {
        this.preservedPage = this.page;
        this.preservedHasMore = this.hasMore;
        this.page = 1;
        this.hasMore = true;
      }
      if (this.props.mode.userIdToShow && nextProps.mode.userIdToShow) {
        this.page = 1;
        this.hasMore = true;
      }
      if (!nextProps.mode.userIdToShow) {
        this.page = this.preservedPage;
        this.hasMore = this.preservedHasMore;
      }
      ReactDOM.findDOMNode(this.masonryInstance).scrollIntoView()
    }
  }

  getInstanceRef = node => this.masonryInstance = node; // ◄--------------------

  loadMore = () => { // ◄-------------------------------------------------------
    let params = {
      options: {
        limit: this.limit,
        page: this.page,
        sort: {created: -1}
      },
      query: {"owner._id": this.props.mode.userIdToShow}
    };
    fetchPics(params)
    .then(result => {
      if (result && result.data) {
        this.props.dispatch(picAdd(result.data.pics));
        this.hasMore = this.page * this.limit < result.data.total;
        if (this.hasMore) {
          this.page = result.data.currentPage + 1;
        }
      }
    })
    .catch(err => console.log(err))
  };

  render () { // ◄--------------------------------------------------------------
    const pics = this.props.mode.userIdToShow ?
        this.props.pics
          .filter(pic => pic.owner._id === this.props.mode.userIdToShow) :
        this.props.pics;

    return (
        <Wall
            getInstanceRef={this.getInstanceRef}
            hasMore={this.hasMore}
            loadMore={this.loadMore}
            pageStart={this.page}
            pics={pics}
        />
    )
  }
}

export default connect(mapStateToProps)(WallContainer)