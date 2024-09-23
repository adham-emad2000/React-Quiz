import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import { type } from "@testing-library/user-event/dist/type";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";

const SEC_PER_QUESTION = 30;
const intitalState = {
  questions: [],
  status: "Loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondremaning: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return { ...state, questions: action.payload, status: "Ready" };

    case "DataError":
      return { ...state, status: "Failed" };
    case "showQuestions":
      return {
        ...state,
        status: "active",
        secondremaning: state.questions.length * SEC_PER_QUESTION,
      };

    case "finish":
      return {
        ...state,
        status: "finish",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "answerIndex":
      const CurrentAnswer = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === CurrentAnswer.correctOption
            ? state.points + CurrentAnswer.points
            : state.points,
      };
    case "NextClick":
      return { ...state, index: state.index + 1, answer: null };
    case "Restart":
      return { ...intitalState, questions: state.questions, status: "Ready" };
    case "tick":
      return {
        ...state,
        secondremaning: state.secondremaning - 1,
        status: state.secondremaning === 0 ? "finish" : state.status,
      };

    default:
      break;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, intitalState);
  const {
    questions,
    status,
    index,
    answer,
    points,
    highscore,
    secondremaning,
  } = state;

  const totalQuestions = questions.length;
  const maxPoints = questions.reduce((acc, curr) => acc + curr.points, 0);
  useEffect(function () {
    fetch(
      "https://my-json-server.typicode.com/adham-emad2000/React-Quiz/questions/"
    )
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecieved", payload: data }))
      .catch((err) => dispatch({ type: "DataError" }));
    console.log(questions);
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "Loading" && <Loader />}
        {status === "Failed" && <Error />}
        {status === "Ready" && (
          <StartScreen NumofQuestions={questions.length} dispatch={dispatch} />
        )}

        {status === "active" && (
          <>
            <Progress
              index={index}
              totalQuestions={totalQuestions}
              maxPoints={maxPoints}
              points={points}
              answer={answer}
            />
            <Questions
              questions={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Timer dispatch={dispatch} secondremaning={secondremaning} />
            <NextButton
              dispatch={dispatch}
              answer={answer}
              totalQuestions={totalQuestions}
              index={index}
            />
          </>
        )}
        {status == "finish" && (
          <FinishScreen
            points={points}
            maxPoints={maxPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
