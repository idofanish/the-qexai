"use client";
import React from "react";
import styles from "./Cards.module.css";

type CardItemProps = {
  title: string;
  text: string;
  link: string;
};

const CardItem = ({ title, text, link }: CardItemProps) => {
  return (
    <div className={styles.card} >
      <h3 className={`${styles.cardTitle} text-primary`}>
        <span className={`${styles.cardTitle} text-[#FF7E00]`}>#</span>     
        {title}
      </h3>
      <p className={`${styles.cardDescription} text-[#0f006f`}>
        {text}
      </p>
      <a href={link} target="_blank" rel="noopener noreferrer"> 
         <span className= "text-primary">Read More</span>
      </a>
    </div>
  );
};

export default CardItem;
