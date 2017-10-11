"use strict";

import removeDuplicates from "removeDuplicates";

export const pics = (state = [], action) => {

  let _state = [...state], index = 0;

  switch (action.type) {
    case "PIC_UPDATE": // ◄-----------------------------------------------------
      if (_state.some((pic, _index) => {
              index = _index;
              return pic._id === action.payload._id;
            }
          )
      ) {
        _state[index].likes = action.payload.likes;
        return _state;
      } else {
        return state;
      }

    case "PIC_DELETE": // ◄-----------------------------------------------------
      if (_state.some((pic, _index) => {
                index = _index;
                return pic._id === action.payload._id;
              }
          )
      ) {
        _state.splice(index, 1);
        return _state;
      } else {
        return state;
      }

    case "PIC_ADD": // ◄--------------------------------------------------------
        return (removeDuplicates([...state, ...action.payload], "_id")
                .sort((a, b) => new Date(b.created) - new Date(a.created)));

    default:
      return state;
  }
};