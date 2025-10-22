"use client";
import React from "react";
import Masonry from "react-masonry-css";

export default function TestMasonry() {
  return (
    <Masonry
      breakpointCols={{ default: 3 }}
      className="flex -ml-4"
      columnClassName="pl-4"
    >
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-gray-200 p-4 mb-4">
          Item {i + 1}
        </div>
      ))}
    </Masonry>
  );
}
