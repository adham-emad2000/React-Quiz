function Options({ questions, dispatch, answer }) {
  const hadAnswered = answer !== null;
  return (
    <div className="options">
      {questions.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hadAnswered
              ? index === questions.correctOption
                ? "correct"
                : "wrong"
              : ""
          } `}
          key={option}
          onClick={() => dispatch({ type: "answerIndex", payload: index })}
          disabled={hadAnswered}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
