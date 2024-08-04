import React, { forwardRef } from "react";
import { letterScores } from "../constants";

const TileSlot = forwardRef(
  ({ letter, index, handleChange, handleKeydown }, ref) => {
    const score = letter ? letterScores[letter.toUpperCase()] : "";
    return (
      <div className="h-[50px] bg-cover bg-[url('/src/assets/scrabble_tile.png')] w-[50px] m-1 rounded flex justify-center align-middle border-1">
        <input
          className="h-full border-none bg-transparent text-center font-sans text-2xl font-bold cursor-pointer uppercase"
          maxLength={1}
          onChange={handleChange}
          onKeyDown={handleKeydown}
          value={letter}
          ref={ref}
        />
        <span className="text-black relative top-7 right-1 font-serif text-sm">
          {score}
        </span>
      </div>
    );
  },
);

export default TileSlot;
