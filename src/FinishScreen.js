function FinishScreen({ points, maxPoints, highscore, dispatch }) {
  const precentage = (points / maxPoints) * 100;
  return (
    <div>
      <p className="result">
        you scored <strong>{points}</strong> out of {maxPoints}(
        {Math.ceil(precentage)}%)
      </p>

      <p className="highscore">(HighScore:{highscore} points)</p>

      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "Restart" })}
      >
        Restart
      </button>
    </div>
  );
}

export default FinishScreen;
