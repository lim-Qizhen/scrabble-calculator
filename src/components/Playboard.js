import React, { useEffect, useState } from "react";
import InputSection from "./InputSection";
import { maxLength } from "../constants";
import { calculateScore } from "../apis/ScoreApi";

const Playboard = () => {
  const originalLetters = Array(maxLength).fill("");

  const [letters, setLetters] = useState(originalLetters);
  const [score, setScore] = useState(0);
  const [wordError, setWordError] = useState("");

  const handleReset = () => setLetters(originalLetters);

  // validate word and calculate score
  useEffect(() => {
    const handler = setTimeout(() => {
      const getScore = async (word) => {
        try {
          const calculatedScore = await calculateScore(word);
          setScore(calculatedScore ?? 0);
          setWordError("");
        } catch (e) {
          setScore(0);
          setWordError("Word is invalid");
        }
      };
      const word = letters.join("");
      if (word === "") {
        setScore(0);
        setWordError("");
      } else {
        word && getScore(word);
      }
    }, 1000);
    return () => {
      clearTimeout(handler);
    };
  }, [letters]);

  return (
    <>
      <InputSection letters={letters} setLetters={setLetters} />
      <span>Score: {score}</span>
      {wordError && <span>{wordError}</span>}
      <button onClick={handleReset}>Reset Tiles</button>
      <button onClick={handleReset}>Submit Tiles</button>
      <button onClick={handleReset}>Show high scores</button>
    </>
  );
};

export default Playboard;
