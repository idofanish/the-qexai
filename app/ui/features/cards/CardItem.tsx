"use client";
import React from "react";
import styles from "./Cards.module.css";

type CardItemProps = {
  id: number;
  title: string;
  text: string;
  link: string;
};

const CardItem = ({ id,title, text, link }: CardItemProps) => {
  return (
    <div className={styles.card}>
      <h3 className={`${styles.cardTitle} text-primary`}>
        {id}
        <span className={`${styles.cardTitle} text-accent`}>#</span>     
        {title}
      </h3>
      <p className={`${styles.cardDescription} text-primary`}>
        {text}
      </p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        
      >
        Read More
      </a>
    </div>
  );
};

export default CardItem;
