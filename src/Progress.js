function Progress({ index, totalQuestions, maxPoints, points, answer }) {
  return (
    <div>
      <header className="progress">
        <progress
          max={totalQuestions}
          value={index + Number(answer !== null)}
        ></progress>
        <p>
          Question <strong>{index + 1}</strong> / {totalQuestions}
        </p>

        <p>
          <strong>{points}</strong> / {maxPoints}
        </p>
      </header>
    </div>
  );
}

export default Progress;
