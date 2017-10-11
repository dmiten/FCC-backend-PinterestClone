"use strict";

import React from "react";
import MasonryInfiniteScroller from "react-masonry-infinite";

import { Pic } from "../../components";

const sizes = [
  {columns: 1, gutter: 15},
  {mq: "600px", columns: 2, gutter: 15},
  {mq: "768px", columns: 3, gutter: 15},
  {mq: "1024px", columns: 4, gutter: 15}
];

export const Wall = (props) => {
  return (
      <MasonryInfiniteScroller
          hasMore={props.hasMore}
          loadMore={props.loadMore}
          pageStart={props.pageStart}
          sizes={sizes}
          style={{ margin: "auto" }}
          ref={props.getInstanceRef}
          pack={true}
      >
        {
          props.pics.map(pic =>
              <Pic
                  key={pic._id}
                  pic={pic}
              />
          )
        }
      </MasonryInfiniteScroller>
  )
};