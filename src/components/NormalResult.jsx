
function NormalResult({
  wpm,
  accuracy,
  personalBest,
  correct,
  incorrect,
  onRestart
}) {
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
        <h1>Test Completed</h1>
        <p>Solid run. Keep pushing to beat your high score.</p>
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

export default NormalResult;
