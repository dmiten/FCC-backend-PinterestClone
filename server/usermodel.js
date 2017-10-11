"use strict";

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  twitterId: String,
  username: "",
  displayName: "",
  profilePhotos: []
  }, {
  timestamp: true
});

export default mongoose.model("User", userSchema);