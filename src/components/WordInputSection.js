import React, { useRef } from "react";
import TileSlot from "./TileSlot";
import { maxLength } from "../constants";

const WordInputSection = ({ letters, setLetters }) => {
  const inputRefs = useRef(Array(maxLength).fill(null));
  const handleChange = (event, index) => {
    const newInput = [...letters];
    const newLetter = event.target.value;
    // update state
    if (newInput.length > index) {
      newInput[index] = newLetter?.toUpperCase();
      setLetters(newInput);
    }
    // shift cursor to next box
    if (newLetter && index < maxLength - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeydown = (event, index) => {
    if (!event.key.match(/^[A-Z]/i)) {
      event.preventDefault();
    }
    if (event.key === "Backspace" && !letters[index] && index > 0) {
      event.preventDefault();
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="flex flex-row">
      {letters.map((letter, i) => (
        <TileSlot
          letter={letter}
          key={i}
          handleChange={(e) => handleChange(e, i)}
          handleKeydown={(e) => handleKeydown(e, i)}
          ref={(element) => {
            inputRefs.current[i] = element;
          }}
        />
      ))}
    </div>
  );
};

export default WordInputSection;
