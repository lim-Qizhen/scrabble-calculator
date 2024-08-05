import React from "react";

const ScoresTable = ({ rows }) => {
  return (
    <table className="w-full table-fixed rounded">
      <thead>
        <tr>
          <th scope="col" className="w-3 text-left">
            Name
          </th>
          <th scope="col" className="w-3 text-left">
            Word
          </th>
          <th scope="col" className="w-1 text-right">
            Score
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.length > 0 ? (
          rows.map((row) => (
            <tr key={`row-${row.name}-${row.word}`}>
              <td>{row.name}</td>
              <td>{row.word?.toUpperCase()}</td>
              <td className="text-right">{row.score}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={3} className="text-center p-10">
              No data
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ScoresTable;
