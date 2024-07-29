import React from 'react';
import ScrabbleTile from "./ScrabbleTile";
import "./TileSlot.css"

const TileSlot = ({letter}) => {
    return letter ? <ScrabbleTile letter={letter}/> : <div className='slot'/>
};

export default TileSlot;