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

const CardItem = ({ title, tagline, description,example, cta_text,cta_link,icon,order}: CardItemProps) => {
  return (
    <div className={styles.card}>
      <h1 className={`${styles.cardTitle} text-primary`}>{order}
        <span className={`text-[#FF7E00]`}>#</span>     
        {title}
      </h1>

      <p className={`${styles.cardTagline} text-[#0f006f]`}>
       {tagline}
      </p>
      
       <p className={`${styles.cardDescription} text-[#0f006f]`}>{description}</p> 
      <a href={cta_link} target="_blank" rel="noopener noreferrer"  className= "text-[#0f006f]"> 
         <span>{cta_text}....</span>
         <p>{icon} </p>
      </a>
      
    </div>
  );
};

export default CardItem;
