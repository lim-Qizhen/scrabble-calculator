import React, { useState } from "react";
import { GrEdit } from "react-icons/gr";
import NameModal from "./NameModal";

const PlayBoardHeader = ({ name, setName }) => {
  const [nameModalOpen, setNameModalOpen] = useState(false);
  return (
    <>
      <header className="fixed top-0 left-0 bg-black w-full h-24 flex px-4 justify-between items-center">
        <div className="w-fit">
          <div className="rounded-lg bg-red-700 px-3 py-1 w-fit">
            <h1 className="font-sans font-bold tracking-wide text-4xl">
              SCRABBLE
            </h1>
          </div>
          <div className="text-left">
            <h1 className="font-sans font-bold tracking-wide text-2xl">
              Calculator
            </h1>
          </div>
        </div>
        <div className="flex items-center">
          <span className="mr-auto">Name: {name}</span>
          <GrEdit
            onClick={() => setNameModalOpen(true)}
            className="ml-2 cursor-pointer flex-shrink-0"
          />
        </div>
      </header>
      <NameModal
        nameModalOpen={nameModalOpen}
        setNameModalOpen={setNameModalOpen}
        userName={name}
        setUserName={setName}
      />
    </>
  );
};

export default PlayBoardHeader;
