import React, { useState } from 'react';

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // calculate the total number of collected feedback
  const total = good + neutral + bad;

  // calculate the average score
  const average = (good - bad) / total || 0;

  // calculate the percentage of positive feedback
  const positivePercentage = (good / total) * 100 || 0;

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={() => setGood(good + 1)}>Good</button>
      <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
      <button onClick={() => setBad(bad + 1)}>Bad</button>

      <h2>Statistics</h2>
      {total > 0 ? (
        <div>
          <p>Good: {good}</p>
          <p>Neutral: {neutral}</p>
          <p>Bad: {bad}</p>
          <p>Total: {total}</p>
          <p>Average: {average}</p>
          <p>Positive Feedback: {positivePercentage}%</p>
        </div>
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

export default App;
