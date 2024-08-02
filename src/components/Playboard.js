import React, { useEffect, useMemo, useState } from "react";
import InputSection from "./InputSection";
import { maxLength } from "../constants";
import { calculateScore, getWords, submitWord } from "../apis/ScoreApi";
import { GrEdit } from "react-icons/gr";
import NameModal from "./NameModal";

const Playboard = () => {
  const originalLetters = Array(maxLength).fill("");

  const [name, setName] = useState("");
  const [letters, setLetters] = useState(originalLetters);
  const [score, setScore] = useState(0);
  const [wordError, setWordError] = useState("");
  const [nameModalOpen, setNameModalOpen] = useState(false);
  const word = useMemo(() => letters.join(""), [letters]);

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
  }, [word]);

  const handleSubmit = async () => {
    try {
      await submitWord(name, word);
      handleReset();
    } catch (e) {
      console.log("sad");
    }
  };

  return (
    <>
      <span>Name: {name}</span>
      <GrEdit onClick={() => setNameModalOpen(true)} />
      <InputSection letters={letters} setLetters={setLetters} />
      <span>Score: {score}</span>
      {wordError && <span>{wordError}</span>}
      <button onClick={handleReset}>Reset Tiles</button>
      <button onClick={handleSubmit} disabled={score === 0}>
        Submit Tiles
      </button>
      <button onClick={getWords}>Show high scores</button>
      <NameModal
        nameModalOpen={nameModalOpen}
        setNameModalOpen={setNameModalOpen}
        userName={name}
        setUserName={setName}
      />
    </>
  );
};

export default Playboard;
