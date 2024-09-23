function NextButton({ dispatch, answer, totalQuestions, index }) {
  if (answer === null) return;

  if (index < totalQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "NextClick" })}
      >
        Next
      </button>
    );

  if (index === totalQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );
}

export default NextButton;
