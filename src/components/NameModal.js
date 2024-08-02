import React, { useState } from "react";
import CustomModal from "./CustomModal";

const NameModal = ({
  nameModalOpen,
  setNameModalOpen,
  userName,
  setUserName,
}) => {
  const [name, setName] = useState(userName ?? "");
  return (
    <CustomModal
      isOpen={nameModalOpen}
      onHide={() => setNameModalOpen(false)}
      onSave={() => {
        setUserName(name);
        setNameModalOpen(false);
      }}
    >
      Set your name
      <input
        onChange={(event) => {
          setName(event.target.value);
        }}
        value={name}
      />
    </CustomModal>
  );
};

export default NameModal;
