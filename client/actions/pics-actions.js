"use strict";

export const picUpdate = pic => ({
  type: "PIC_UPDATE",
  payload: pic
});

export const picAdd = pics => ({
  type: "PIC_ADD",
  payload: pics
});

export const picDelete = pic => ({
  type: "PIC_DELETE",
  payload: pic
});