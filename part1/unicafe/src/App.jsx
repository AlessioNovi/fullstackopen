/* eslint-disable react/prop-types */
import { useState } from 'react'

const Header = ({ text }) => {
  return <h2>{text}</h2>
}

const Button = ({handleClick, text}) => {
  return <button onClick={handleClick}>{text}</button>
}

const StatisticLine = ({ text, value, symbol }) => {
  return <td>{text} {value} {symbol}</td>
}

const Statistics = ({good, bad, neutral}) => {
  const total = good + bad + neutral;
  const positivePercentage = (good / total) * 100
  const average = (good - bad) / total

  if (total === 0) {
    return <p>No Feedback Given</p>
  }

  return (
    <div>
      <h3>Statistics</h3>
      <table>
        <tbody>
          <tr>
            <StatisticLine text="good" value={good} />
          </tr>
          <tr>
            <StatisticLine text="neutral" value={neutral} />
          </tr>
          <tr>
            <StatisticLine text="bad" value={bad} />
          </tr>
          <tr>
            <StatisticLine text="total" value={total} />
          </tr>
          <tr>
            <StatisticLine text="average" value={average} />
          </tr>
          <tr>
            <StatisticLine text="positive" value={positivePercentage} symbol="%" />
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1);
  const handleNeutral = () => setNeutral(neutral + 1);
  const handleBad = () => setBad(bad + 1);


  return (
    <div>
      <Header text="Give Feedback" />
      <Button handleClick={handleGood} text="Good"/>
      <Button handleClick={handleNeutral} text="Neutral"/>
      <Button handleClick={handleBad} text="Bad"/>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App