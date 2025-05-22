import { useState } from 'react'

const Button = (props) => {
  return (
      <button onClick = {props.onClick}>{props.text}</button>
  )
}

const Statistics = (props) => {
  return <p>{props.text} {props.value}</p>
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
    return ((good)/(good + neutral + bad))*(100) + " %"
  }
  

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick = {selectedGood} text="good" />
      <Button onClick = {selectedneutral} text="neutral" />
      <Button onClick = {selectedbad} text="bad" />
      <h1>statistics</h1>
      <Statistics text = "good" value = {good} />
      <Statistics text = "neutral" value = {neutral} />
      <Statistics text = "bad" value = {bad} />
      <Statistics text = "all" value = {good+neutral+bad} />
      <Statistics text = "average" value = {calculateAvg()} />
      <Statistics text = "positive" value = {calculatePositive()} />
    </div>
  )
}

export default App