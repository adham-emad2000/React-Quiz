function StartScreen({ NumofQuestions, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome To The React Quiz!</h2>
      <h3>{NumofQuestions} questions to test the react exam</h3>
      <button
        className="btn"
        onClick={() => dispatch({ type: "showQuestions" })}
      >
        Let's Start
      </button>
    </div>
  );
}

export default StartScreen;
