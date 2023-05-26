import Image from "next/image";
import React from "react";

export const CharactersCard = ({ name, species, image }) => {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      color: "black",
      alignItems: "center",
      boxShadow: '2px 2px 2px 2px black',
      borderRadius: '2em',
      width: "100%",
      height: "100%",
    }}>

      <Image src={image} width={260} height={168} alt={name} />
      <span>{name}</span>
      <span>{species}</span>
    </div>
  );
};
