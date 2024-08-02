import { letterScores } from "./constants";

export const calculateScore = (letters) => {
  return letters.reduce((acc, cur) => {
    return acc + (letterScores[cur] ?? 0);
  }, 0);
};
