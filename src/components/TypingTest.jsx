import React, {useState, useEffect, useRef} from "react";
import passages from "./data.json";


function TypingTest({ onFinish, personalBest, setPersonalBest, hasTakenTestBefore, setHasTakenTestBefore }) {
  const [wpm, setWpm] = useState(0);
  const [difficulty, setDifficulty] = useState("easy");
  const [passage, setPassage] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [accuracy, setAccuracy] = useState(100);
  
  const inputRef = useRef(null);

  const finishTest = () => {
    const { correct, incorrect } = getCharacterStats();

    const newPersonalBest =
      wpm > personalBest ? wpm : personalBest;

    const isFirstTime = !hasTakenTestBefore;
    const isHighScore = hasTakenTestBefore && wpm > personalBest;

    setPersonalBest(newPersonalBest);
    setHasTakenTestBefore(true);

    onFinish({
      wpm,
      accuracy,
      personalBest: newPersonalBest,
      correct,
      incorrect,
      isFirstTime,
      isHighScore
    });
  };

  const startTest = () => {
    setHasStarted(true);
    setTimeLeft(isTimerActive ? 60 : Infinity);
    setWpm(0);
    setTypedText("");

    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const getCharacterStats = () => {
    let correct = 0;
    let incorrect = 0;

    for (let i = 0; i < typedText.length; i++) {
      if (typedText[i] === passage[i]) {
        correct++;
      } else {
        incorrect++;
      }
    }

    return { correct, incorrect };
  };

  //render text correct/incorrect
  const renderText = () => {
    if (!passage) return null;

    return passage.split("").map((char, index) => {
      let className = "";

      if (index < typedText.length) {
        className =
          typedText[index] === char ? "correct" : "incorrect";
      } else if (
        index === typedText.length &&
        hasStarted &&
        typedText.length < passage.length
      ) {
        className = "current";
      }

      return (
        <span key={index} className={className}>
          {char === " " ? "\u00A0" : char}
        </span>
      );
    });
  };

  // WPM calculation
  const calculateWPM = () => {
    const minutes = (60 - timeLeft) / 60;
    if (minutes <= 0) return 0;

    let correctChars = 0;
    for (let i = 0; i < typedText.length; i++) {
      if (typedText[i] === passage[i]) {
        correctChars++;
      }
    }

    return Math.round((correctChars / 5) / minutes);
  };

  // calculate accuracy
  const calculateAccuracy = () => {
    if (typedText.length === 0) return 100;

    let correct = 0;
    for (let i = 0; i < typedText.length; i++) {
      if (typedText[i] === passage[i]) {
        correct++;
      }
    }

    return Math.round((correct / typedText.length) * 100);
  };


  // Update WPM and accuracy on typedText change
  useEffect(() => {
    if (!hasStarted) return;

    const newWpm = calculateWPM();
    setWpm(newWpm);

    const newAccuracy = calculateAccuracy();
    setAccuracy(newAccuracy);
    
    if (typedText.length === passage.length) {
      finishTest();
    }
  }, [typedText, timeLeft, passage, hasStarted]);
  
  // Reset test when difficulty or mode changes
  useEffect(() => {
    setHasStarted(false);
    setTimeLeft(isTimerActive ? 60 : Infinity);
    setWpm(0);
  }, [difficulty, isTimerActive]);
  
  // Load passage based on difficulty
  useEffect(() => {
    const list = passages[difficulty];
    const randomIndex = Math.floor(Math.random() * list.length);
    setPassage(list[randomIndex].text);
  }, [difficulty]);

  // Timer logic
  useEffect(() => {
    if (!isTimerActive || !hasStarted) return;
    
    if (timeLeft <= 0) {
      finishTest();  
      return;
    }
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerActive,hasStarted, timeLeft]);

  return (
    <div>
      <header>
        <img
          src="/assets/images/logo-large.svg"
          alt="Typing Speed Test logo"
        />
        <div className="ScoreBoard">
          <img
            src="/assets/images/icon-personal-best.svg"
            alt="personal best"
          />
          <div>Personal Best: {personalBest} WPM</div>
        </div>
      </header>

      <div className="ToolBar">
        <div className="info">
          <div>WPM: {wpm}</div>
          <div className="Divider"></div>
          <div>Accuracy: {accuracy}</div>
          <div className="Divider"></div>
          <div>Time Left: {timeLeft}</div>
        </div>

        <div className="level">
          <div>
            Difficulty:
            <button
              className={difficulty === "easy" ? "selected" : ""}
              onClick={() => setDifficulty("easy")}
            >
              Easy
            </button>
            <button
              className={difficulty === "medium" ? "selected" : ""}
              onClick={() => setDifficulty("medium")}
            >
              Medium
            </button>
            <button
              className={difficulty === "hard" ? "selected" : ""}
              onClick={() => setDifficulty("hard")}
            >
              Hard
            </button>
          </div>

          <div className="Divider"></div>

          <div>
            Mode:
            <button
              className={isTimerActive ? "selected" : ""}
              onClick={() => {
                setIsTimerActive(true);
                setTimeLeft(60);
              }}
            >
              Timed (60s)
            </button>
            <button
              className={!isTimerActive ? "selected" : ""}
              onClick={() => {setIsTimerActive(false); setTimeLeft(Infinity);}}
            >
              Passage
            </button>
          </div>
        </div>
      </div>

      <hr />

      <div className="TextDisplay">
        <div className={hasStarted ? "text" : "text blurred"}>
          {renderText()}
        </div>

        {!hasStarted && (
          <div className="overlay">
            <button className="start-btn" onClick={startTest}>
              Start Typing Test
            </button>
            <p className="hint">
              Or click the text and start typing
            </p>
          </div>
        )}

        {/* Hidden input to capture typing */}
        <input
          ref={inputRef}
          className="hidden-input"
          value={typedText}
          onChange={(e) => {
            if (!hasStarted) return;
            setTypedText(e.target.value);
          }}
        />

      </div>
    </div>
  );
}

export default TypingTest;
