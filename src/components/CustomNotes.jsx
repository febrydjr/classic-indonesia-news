import React from "react";

const CustomNotes = ({ text, fontSize, fontFamily }) => {
  const capitalizeFirstLetter = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  return (
    <Text fontFamily={fontFamily} fontSize={fontSize}>
      {capitalizeFirstLetter(text.charAt(0))}
      {text.slice(1)}
    </Text>
  );
};

export default CustomNotes;
