"use strict";

import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";

const picSchema = new mongoose.Schema({
  alt: String,
  url: String,
  likes: [],
  owner: {},
  created: {
    type: Date,
    default: Date.now
  }}, {
  timestamp: true
});

picSchema.plugin(mongoosePaginate);

export default mongoose.model("Pic", picSchema);