import React from "react";
import Modal from "react-modal";

const CustomModal = ({ isOpen, onHide, onSave, children }) => {
  return (
    <Modal isOpen={isOpen} onHide={onHide}>
      {children}
      <button onClick={onHide}>Close</button>
      {onSave && <button onClick={onSave}>Save</button>}
    </Modal>
  );
};

export default CustomModal;
