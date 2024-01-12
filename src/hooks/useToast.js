import React, { useRef, useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { MAX_TOASTS } from "./constants";
import { toastCss, toastIcon } from "../helpers";

const TIMEOUT_DURATION = 6000;

const ToastNotify = ({ message, style, Icon, close }) => {
  let timeoutRef = useRef().current;

  useEffect(() => {
    timeoutRef = setTimeout(() => {
      close();
    }, TIMEOUT_DURATION);

    return () => clearTimeout(timeoutRef);
  }, []);

  return (
    <div className="a-single-toast slide-in" style={style}>
      <div className="inner">
        <Icon className="icon" />
        {message}
      </div>
      <button className="close" onClick={close}>
        X
      </button>

      <div
        style={{ animationDuration: "6000ms", ...toastCss.backgroundColor }}
        role="progressbar"
        className="progress"
      ></div>
    </div>
  );
};

const Memoized = React.memo(ToastNotify);

const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type) => {
    const toastId = new Date().toISOString();

    const newToast = {
      id: toastId,
      type,
      message,
    };

    // TODO: MAX
    setToasts((prev) => [newToast, ...prev]);
  };

  const handleClose = (toastId) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== toastId));
  };

  return {
    toasts,
    showToast,
    handleClose,
  };
};

const Toasts = ({ toasts, handleClose }) => {
  return (
    <div>
      {toasts.map((toast, index) => {
        const { message, type, id } = toast;

        return (
          <Memoized
            key={id}
            message={message}
            style={toastCss(type, index)}
            Icon={toastIcon(type)}
            close={() => handleClose(id)}
          />
        );
      })}
    </div>
  );
};

export { Toasts, useToast };
