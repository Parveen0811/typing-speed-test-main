import { useState } from "react";
import TypingTest from "./components/TypingTest";
import FirstResult from "./components/FirstResult";
import NormalResult from "./components/NormalResult";
import HighScoreResult from "./components/HighScoreResult";

function App() {
  const [page, setPage] = useState("test");
  const [result, setResult] = useState(null);
  const [personalBest, setPersonalBest] = useState(0);
  const [hasTakenTestBefore, setHasTakenTestBefore] = useState(false);

  const handleFinish = (data) => {
    setResult(data);

    if (data.isHighScore) {
      setPage("highscore");
    } else if (data.isFirstTime) {
      setPage("first");
    } else {
      setPage("normal");
    }
  };

  const restart = () => {
    setPage("test");
    setResult(null);
  };

  return (
    <>
      {page === "test" && <TypingTest 
          personalBest={personalBest}
          setPersonalBest={setPersonalBest}
          hasTakenTestBefore={hasTakenTestBefore}
          setHasTakenTestBefore={setHasTakenTestBefore}
          onFinish={handleFinish} />}

      {page === "first" && (
        <FirstResult
          wpm={result.wpm}
          accuracy={result.accuracy}
          personalBest={result.personalBest}
          correct={result.correct}
          incorrect={result.incorrect}
          onRestart={restart}
        />
      )}

      {page === "normal" && (
        <NormalResult
          wpm={result.wpm}
          accuracy={result.accuracy}
          personalBest={result.personalBest}
          correct={result.correct}
          incorrect={result.incorrect}
          onRestart={restart}
        />
      )}

      {page === "highscore" && (
        <HighScoreResult
          wpm={result.wpm}
          accuracy={result.accuracy}
          personalBest={result.personalBest}
          correct={result.correct}
          incorrect={result.incorrect}
          onRestart={restart}
        />
      )}
    </>
  );
}

export default App;
