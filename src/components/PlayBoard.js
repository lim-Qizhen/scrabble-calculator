import React, { useEffect, useMemo, useState } from "react";
import WordInputSection from "./WordInputSection";
import { maxLength } from "../constants";
import { calculateScore, getWords, submitWord } from "../apis/ScoreApi";
import PlayBoardHeader from "./PlayBoardHeader";
import ScoresModal from "./ScoresModal";
import { mapScoreResponseToTableData } from "../mappers/ScoreMapper";
import { toast, ToastContainer } from "react-toastify";
import { isAxiosError } from "axios";

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
          if (isAxiosError(e) && e.code === "ERR_NETWORK") {
            toast.error("There was a network error. Please try again.");
          } else {
            setScore(0);
            setWordError("Word is invalid");
          }
        }
      };
      if (word === "") {
        setScore(0);
        setWordError("");
      } else {
        word && getScore(word);
      }
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [word]);

  const handleSubmit = async () => {
    try {
      const response = await submitWord(name, word);
      handleReset();
      toast.success(
        `Congratulations ${response.name}! You have successfully submitted the word ${response.word} with a score of ${response.score}!`,
      );
    } catch (e) {
      toast.error(
        "Sorry, but there was an error submitting your word. Please try again!",
      );
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
      toast.error(
        "Sorry but there was an error retrieving the latest scores now. Please try again later!",
      );
    }
  };

  return (
    <>
      <PlayBoardHeader name={name} setName={setName} />
      <main className="App flex justify-center bg-gradient-to-br from-green-950 to-green-800 mt-[96px] h-[calc(100vh-96px)]">
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
        />
        <div className="flex flex-col justify-center items-center">
          <WordInputSection letters={letters} setLetters={setLetters} />
          {/*score and error message*/}
          <div className="flex flex-col h-14 mt-3">
            <span>Score: {score}</span>
            <span className="text-rose-500 h-6">{wordError}</span>
          </div>
          {/*buttons to reset tiles, submit word and show high scores*/}
          <div className="flex gap-2 relative top-10">
            <button onClick={handleReset} disabled={!word}>
              Reset Tiles
            </button>
            <button onClick={handleSubmit} disabled={score === 0}>
              Submit Word
            </button>
            <button onClick={handleShowScores}>Show High Scores</button>
          </div>
        </div>
      </main>
      <ScoresModal
        isOpen={scoresModalOpen}
        onHide={() => setScoresModalOpen(false)}
        scores={scores}
      />
    </>
  );
};

export default PlayBoard;
