import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from "react";
import { createPortal } from "react-dom";

import "./modal.sass";

const modalElement = document.getElementById("modal-root");

const Modal = ({ children }, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => setIsOpen(false), []);

  const handleEscape = useCallback((e) => {
    if (e.keyCode === 27) {
      close();
    }
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      open: () => setIsOpen(true),
      close,
    }),
    [close]
  );

  useEffect(() => {
    if (isOpen) document.addEventListener("keydown", handleEscape, false);
    return () => {
      document.removeEventListener("keydown", handleEscape, false);
    };
  }, [handleEscape, isOpen]);

  return createPortal(
    isOpen ? (
      <div className="modal">
        <div className="modal-overlay" onClick={close} />
        <span role="button" className="modal-close" aria-label="close" onClick={close}>
          x
        </span>
        <div className="modal-body">{children}</div>
      </div>
    ) : null,
    modalElement
  );
};

export default forwardRef(Modal);
