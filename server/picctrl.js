"use strict";

import { serverLog } from "./server";
import Pic from "./picmodel";

export const picCtrl = {};

picCtrl.get = (req, res) => { // ◄--------------------- get pics with pagination
  let params = JSON.parse(req.query.params);
  Pic.paginate(params.query, params.options, (err, result) => {
    if (err) {
      serverLog("error", "picCtrl.get - " + err.message);
      res.json({ message: err.message });
    } else {
      res.json({
        message: "ok",
        pics: result.docs,
        total: result.total,
        currentPage: params.options.page
      });
      serverLog("info", "picCtrl.get - getting pics ok");
    }
  });
};

picCtrl.add = (req, res) => { // ◄----------------------------------------------
  let pic = new Pic({ ...req.body.pic });
  pic.save((err, pic) => {
    if (err) {
      serverLog("error", "picCtrl.add - " + err.message);
      res.json({ message: err.message });
    } else {
      serverLog("info", "picCtrl.add - save - new pic added id" + pic._id);
      res.json({
        pic: pic,
        message: "new pic added"
      });
    }
  });
};

picCtrl.update = (req, res) => { // ◄-------------------------------------------
  Pic.findOneAndUpdate(
      { _id: req.body.pic._id },
      { likes: req.body.pic.likes },
      (err, pic) => {
    if (err) {
      serverLog("error", "picCtrl.update - " + err.message);
      res.json({ message: err.message });
    } else {
      serverLog("info", "picCtrl.update - pic updated" + pic._id);
      res.json({
        pic: pic,
        message: "pic updated"
      })
    }
  })
};

picCtrl.delete = (req, res) => { // ◄-------------------------------------------
  Pic.findOne({ _id: req.body.pic._id }, (err, pic) => {
    if (err) {
      serverLog("error", "picCtrl.delete - " + err.message);
      res.json({message: "deleting error"});
    } else {
      if (pic.owner._id === req.user._id) {
        pic.remove();
        serverLog("info", "picCtrl.delete - pic deleted id" + pic._id);
        res.json({ message: "pic deleted" })
      } else {
        serverLog("error", "picCtrl.delete auth error");
        res.json({ message: "it's not your pic" })
      }
    }
  })
};