
function HighScoreResult({ wpm, accuracy, personalBest, onRestart, correct, incorrect }) {
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
      <div className="Result">
        <img src="public/assets/images/icon-new-pb.svg" alt="Normal Result Illustration" />
        <h1>High Score Smashed!</h1>
        <p>You're getting faster. That was incredible typing.</p>
        <div className="Results">
          <div className="ResultItem">
            <div className="Label">WPM:</div>
            <div className="wpmvalue">{wpm}</div>
          </div>
          <div className="ResultItem">
            <div className="Label">Accuracy:</div>
            <div className="accvalue">{accuracy}%</div>
          </div>
          <div className="ResultItem">
            <div className="Label">Characters</div>
            <div className="charvalue"><span className="correct">{correct}</span>/<span className="incorrect">{incorrect}</span></div>
          </div>
        </div>
        <button onClick={onRestart}>Go Again</button>
      </div>
      <img src="public/assets/images/pattern-confetti.svg" alt="Confetti Illustration" className="Confetti" />
    </div>
  );
}

export default HighScoreResult;
