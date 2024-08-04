import React from "react";
import Modal from "react-modal";

const CustomModal = ({ isOpen, onHide, onSave, disableOnSave, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onHide={onHide}
      className="fixed inset-0 self-center justify-self-center bg-green-950 rounded-lg p-8 max-w-md w-full mx-4 shadow-xl"
    >
      <div>{children}</div>
      <div className="flex justify-center align-middle mt-7 gap-2">
        <button onClick={onHide}>Close</button>
        {onSave && (
          <button onClick={onSave} disabled={disableOnSave}>
            Save
          </button>
        )}
      </div>
    </Modal>
  );
};

export default CustomModal;
