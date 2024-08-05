import React, { useState } from "react";
import PlayBoard from "./PlayBoard";

const WelcomePage = () => {
  const [name, setName] = useState("");
  const [openBoard, setOpenBoard] = useState(false);

  return openBoard ? (
    <PlayBoard name={name} setName={setName} />
  ) : (
    <div className="flex flex-col justify-center items-center bg-gradient-to-br from-green-950 to-green-800 min-h-screen">
      <div className="mb-5">
        <div className="rounded-lg bg-red-700 px-3 py-1">
          <h1 className="font-sans font-bold tracking-wide text-6xl">
            SCRABBLE
          </h1>
        </div>
        <div className="text-right">
          <h1 className="font-sans font-bold tracking-wide text-2xl">
            Calculator
          </h1>
        </div>
      </div>
      <div>
        <label htmlFor="name" className="text-left mb-2">
          Please enter your name
        </label>
        <input
          name="name"
          className="w-full"
          onChange={(event) => setName(event.target.value)}
          onKeyDown={(event) => {
            if (name && event.key === "Enter") {
              setOpenBoard(true);
            }
          }}
        />
      </div>
      <button
        className="self-center mt-5"
        onClick={() => setOpenBoard(true)}
        disabled={!name}
      >
        Play
      </button>
    </div>
  );
};

export default WelcomePage;
