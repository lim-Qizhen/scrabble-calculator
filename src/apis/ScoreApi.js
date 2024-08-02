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
