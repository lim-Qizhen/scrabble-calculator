import React, { forwardRef } from "react";
import "./TileSlot.css";
import { letterScores } from "../constants";

const TileSlot = forwardRef(
  ({ letter, index, handleChange, handleKeydown }, ref) => {
    const score = letter ? letterScores[letter.toUpperCase()] : "";
    return (
      <div className="slot">
        <input
          maxLength={1}
          onChange={handleChange}
          onKeyDown={handleKeydown}
          value={letter}
          ref={ref}
        />
        <span className="score">{score}</span>
      </div>
    );
  },
);

export default TileSlot;
