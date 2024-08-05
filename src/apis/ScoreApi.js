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
    const response = await axios.post(url, { name, word });
    return response.data;
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
