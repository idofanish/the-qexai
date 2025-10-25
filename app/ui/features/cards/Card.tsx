"use client";
import React from "react";
import Masonry from "react-masonry-css";
import CardItem from "./CardItem";
import data from "@/app/data/dataForCards.json";
import styles from "./Cards.module.css";

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1
};

const Cards = () => {
  if (!data || data.length === 0) return <p>No cards found.</p>;

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className={styles.myMasonryGrid}
      columnClassName={styles.myMasonryGridColumn}
    >
      {data.map((item) => (
        <CardItem
          key={item.id}
          id={item.id}
          title={item.title}
          text={item.text}
          link={item.link}
        />
      ))}
    </Masonry>
  );
};

export default Cards;

