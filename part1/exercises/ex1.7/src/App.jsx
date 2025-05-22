import { useState } from 'react'

const Button = (props) => {
  return (
      <button onClick = {props.onClick}>{props.text}</button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const selectedGood = () => setGood(good+1)
  const selectedneutral = () => setNeutral(neutral+1)
  const selectedbad = () => setBad(bad+1)

  const calculateAvg = () => {
    return ((good - bad)/(good + neutral + bad))
  }

  const calculatePositive = () => {
    return ((good)/(good + neutral + bad))
  }
  

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick = {selectedGood} text="good" />
      <Button onClick = {selectedneutral} text="neutral" />
      <Button onClick = {selectedbad} text="bad" />
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good + neutral + bad}</p>
      <p>average {calculateAvg()}</p>
      <p>positive {calculatePositive()} %</p>
    </div>
  )
}

export default App