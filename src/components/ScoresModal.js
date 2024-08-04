import React from "react";
import CustomModal from "./CustomModal";
import ScoresTable from "./ScoresTable";

const ScoresModal = ({ isOpen, onHide, scores }) => {
  return (
    <CustomModal isOpen={isOpen} onHide={onHide}>
      <ScoresTable rows={scores} />
    </CustomModal>
  );
};

export default ScoresModal;
