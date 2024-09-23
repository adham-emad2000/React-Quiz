import { cleanup } from "@testing-library/react";
import { type } from "@testing-library/user-event/dist/type";
import { useEffect } from "react";

function Timer({ dispatch, secondremaning }) {
  const mins = Math.floor(secondremaning / 60);
  const sec = secondremaning % 60;

  useEffect(
    function () {
      const id = setInterval(() => {
        dispatch({ type: "tick" });
      }, 1000);
      return function () {
        clearInterval(id);
      };
    },
    [dispatch]
  );

  return (
    <div className="timer">
      {mins < 10 && 0}
      {mins}:{sec < 10 && 0}
      {sec}
    </div>
  );
}

export default Timer;
