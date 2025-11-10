//app/ui/features/cards/CardItem.tsx
"use client";
import React from "react";
import styles from "./Cards.module.css";

type CardItemProps = {
  id?:number;
  title: string;
  tagline: string;
  description: string;
  example: string;
  cta_text: string;
  cta_link: string;
  icon:string;
  order:number;
  
  
};

const CardItem = ({ title, tagline, description, cta_text,cta_link,icon,order}: CardItemProps) => {
  return (
    <div className={styles.card}>
      <h1 className={`${styles.cardTitle} text-primary`}>
        <span className={`text-[#FF7E00]`}>#</span>     
        <span className={`${styles.gradientUnderlineAnimated}`}>{title}</span>
      </h1>

      <p className={`${styles.cardTagline}  text-[#250c63]`}>
       {tagline}
      </p>
      <p className={`${styles.cardDescription} text-[#191970]`}>{description}</p> 
      <a href={cta_link} target="_blank" rel="noopener noreferrer"  className= "text-[#072d51] sm:text-sm"> 
         ➤ {cta_text}......
         <p>{icon} </p>
      </a>      
    </div>
  );
};

export default CardItem;
