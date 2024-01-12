import React from "react";
import { Toasts, useToast } from "./hooks/useToast";
import "./styles.css";
import { TOAST_TYPES } from "./hooks/constants";

export default function App() {
  const { showToast, handleClose, toasts } = useToast();
  const [, reset] = React.useState({});

  return (
    <div className="App">
      <h1>Toast Without Queue</h1>
      <button onClick={() => reset({})}>Reset</button>
      <div className="pad-bottom">
        <button
          className="button"
          onClick={() => showToast("Success message!", TOAST_TYPES.SUCCESS)}
        >
          Show success message
        </button>
        <button
          className="button"
          onClick={() => showToast("Info message...", TOAST_TYPES.INFO)}
        >
          Show info message
        </button>
      </div>
      <div>
        <button
          className="button"
          onClick={() => showToast("Warning message..!", TOAST_TYPES.WARNING)}
        >
          Show warning message
        </button>
        <button
          className="button"
          onClick={() => showToast("Error message!!!", TOAST_TYPES.ERROR)}
        >
          Show error message
        </button>
      </div>

      <Toasts toasts={toasts} handleClose={handleClose} />
    </div>
  );
}
