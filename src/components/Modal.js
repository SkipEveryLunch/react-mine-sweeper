import React from 'react';
const Modal = ({ message }) => {
  return (
    <div className="fixed z-1 grid place-items-center w-full h-full transition-opacity bg-gray-900 bg-opacity-40">
      <div className="bg-white w-full h-1/5 grid place-items-center">
        <div className="text-6xl">{message}</div>
      </div>
    </div>
  );
};
export default Modal;
