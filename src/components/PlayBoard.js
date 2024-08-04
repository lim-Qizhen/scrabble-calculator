import React, { useEffect, useMemo, useState } from "react";
import WordInputSection from "./WordInputSection";
import { maxLength } from "../constants";
import { calculateScore, getWords, submitWord } from "../apis/ScoreApi";
import PlayBoardHeader from "./PlayBoardHeader";
import ScoresModal from "./ScoresModal";
import { mapScoreResponseToTableData } from "../mappers/ScoreMapper";

const PlayBoard = ({ name, setName }) => {
  const originalLetters = Array(maxLength).fill("");

  const [letters, setLetters] = useState(originalLetters);
  const [score, setScore] = useState(0);
  const [wordError, setWordError] = useState("");
  const [scoresModalOpen, setScoresModalOpen] = useState(false);
  const [scores, setScores] = useState([]);
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

  const handleShowScores = async () => {
    setScoresModalOpen(true);
    try {
      const response = await getWords();
      setScores(
        (response.data?.content ?? []).map(mapScoreResponseToTableData),
      );
    } catch (e) {
      console.log("sad");
    }
  };

  return (
    <>
      <PlayBoardHeader name={name} setName={setName} />
      <WordInputSection letters={letters} setLetters={setLetters} />
      <div className="flex flex-col h-14 mt-3">
        <span>Score: {score}</span>
        <span className="text-rose-500 h-6">{wordError}</span>
      </div>
      <div className="flex gap-2 relative top-10">
        <button onClick={handleReset} disabled={!word}>
          Reset Tiles
        </button>
        <button onClick={handleSubmit} disabled={score === 0}>
          Submit Tiles
        </button>
        <button onClick={handleShowScores}>Show high scores</button>
      </div>
      <ScoresModal
        isOpen={scoresModalOpen}
        onHide={() => setScoresModalOpen(false)}
        scores={scores}
      />
    </>
  );
};

export default PlayBoard;
