import axios from "axios";

export const calculateScore = async (word) => {
  const url = "/scores/calculate";
  try {
    const {
      data: { score },
    } = await axios.get(url, { params: { word } });
    return score;
  } catch (e) {
    throw e;
  }
};

export const submitWord = async (name, word) => {
  const url = "/scores";
  try {
    await axios.post(url, { name, word });
  } catch (e) {
    throw e;
  }
};

export const getWords = async () => {
  const url = "/scores";
  try {
    return await axios.get(url);
  } catch (e) {
    throw e;
  }
};
