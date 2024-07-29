import React from 'react';
import "./ScrabbleTile.css"
import {letterScores} from "../constants";

const ScrabbleTile = ({letter}) => {
    const score = letter ? letterScores[letter.toUpperCase()] : '';
    return (
        <div className="tile">
            <span className="letter">{letter}</span>
            <span className="score">{score}</span>
        </div>
    );
};

export default ScrabbleTile;