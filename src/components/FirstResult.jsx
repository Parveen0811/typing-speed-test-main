
function FirstResult({ wpm, accuracy, personalBest, onRestart, correct, incorrect }) {
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
        <img src="/assets/images/icon-completed.svg" alt="Normal Result Illustration" />
        <h1>Baseline Established!</h1>
        <p>You've set the bar. Now the real challenge begins-time to beat it.</p>
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
    </div>
  );
}

export default FirstResult;
