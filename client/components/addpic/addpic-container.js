"use strict";

import React from "react";
import { connect } from "react-redux";
import { regExWeburl } from "./regex-weburl";
import { AddPic } from "./addpic.jsx";
import { picAdd } from "../../actions/pics-actions";
import { picAddDb } from "../../actions/utils";

const mapStateToProps = state => {
  return {
    ...state
  };
};

class AddPicContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      altvalue: "",
      urlvalue: "",
      serviceMessage: "\u2063"
    };
  }

  collapseHandler = () => { // ◄------------------------------------------------
    this.setState({ open: !this.state.open })
  };

  inputHandler = (event) => { // ◄----------------------------------------------
    this.setState({
      [event.target.name + "value"]: event.target.value,
      serviceMessage: "\u2063"
    });
  };

  submitHandler = () => { // ◄--------------------------------------------------
    if (this.state.urlvalue) {
      if (regExWeburl.test(this.state.urlvalue)) {
        picAddDb({
          alt: this.state.altvalue,
          url: this.state.urlvalue,
          owner: {
            _id: this.props.user._id,
            username: this.props.user.username,
            profilePhoto: this.props.user.profilePhotos ?
                this.props.user.profilePhotos["0"].value :
                undefined
          }
        })
        .then(result => {
          if (result.pic && result.message) {
            this.props.dispatch(picAdd([result.pic]));
            this.setState({
              altvalue: "",
              urlvalue: "",
              serviceMessage: result.message
            });
          } else {
            this.setState({ serviceMessage: "auth error" });
          }
        })
      }
      else {
        this.setState({ serviceMessage: "strange url" });
      }
    }
  };

  render() { // ◄---------------------------------------------------------------
    return (
        <AddPic
            open={this.state.open}
            serviceMessage={this.state.serviceMessage}
            values={{
              altvalue: this.state.altvalue,
              urlvalue: this.state.urlvalue
            }}
            collapseHandler={this.collapseHandler}
            inputHandler={this.inputHandler}
            submitHandler={this.submitHandler}
        />
    );
  }
}

export default connect(mapStateToProps)(AddPicContainer)