import React from "react";

const Modal = ({ setShowModal, action, text }) => {
  return (
    <div className="modal-wrapper ">
      <div className="modal-container">
        <h1 className="text-lg font-semibold">
          Are you sure you want to Delete your {text}?
        </h1>

        <div className="flex gap-12 justify-center py-6">
          <button
            onClick={action}
            className="bg-red-800 text-white text-md font-medium p-3  rounded-sm"
          >
            Yes, Delete
          </button>
          <button
            onClick={() => setShowModal(false)}
            className="bg-slate-800 text-white text-md font-medium p-3  rounded-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
