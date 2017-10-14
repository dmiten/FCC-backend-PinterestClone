"use strict";

import axios from "axios";

export const fetchPics = params => { // ◄---------------------------------------
  return (
      axios.get("/api/pic/get?params=" + JSON.stringify(params))
      .then(result => result)
      .catch(err => console.log(err.message))
  );
};

export const picAddDb = pic => { // ◄-------------------------------------------
  return (
      axios.post("/api/pic/add", { pic: pic })
      .then(res => ({
        status: res.status,
        pic: res.data.pic,
        message: res.data.message
      }))
      .catch(err => console.log(err))
  );
};

export const picUpdateDb = pic => { // ◄----------------------------------------
  return (
      axios.post("/api/pic/update", { pic: pic })
      .then(res => ({
        status: res.status,
        pic: res.data.pic,
        message: res.data.message
      }))
      .catch(err => console.log(err))
  );
};

export const picDeleteDb = pic => { // ◄----------------------------------------
  return (
      axios.post("/api/pic/delete", { pic: pic })
      .then(res => ({
        status: res.status,
        message: res.data.message
      }))
  );
};