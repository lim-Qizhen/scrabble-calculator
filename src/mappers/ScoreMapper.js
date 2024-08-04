export const mapScoreResponseToTableData = ({ name, value, word }) => {
  return {
    name,
    word,
    score: value,
  };
};
