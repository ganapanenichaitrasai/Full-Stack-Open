import { useState } from 'react'

const Button = (props) => {
  return (
      <button onClick = {props.onClick}>{props.text}</button>
  )
}

const StatisticLine = ({text,value}) => {
  return <p>{text} {value}</p>
}

const Statistics = ({good,neutral,bad,average,positive}) => {
  if ((good+neutral+bad) === 0) {
    return <p>No feedback given</p>
  }
  else {
    return(
      <div>
            <StatisticLine text = "good" value = {good} />
            <StatisticLine text = "neutral" value = {neutral} />
            <StatisticLine text = "bad" value = {bad} />
            <StatisticLine text = "all" value = {good+neutral+bad} />
            <StatisticLine text = "average" value = {average} />
            <StatisticLine text = "positive" value = {positive} />
      </div>
    )
  }
  
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
      <Statistics good = {good} neutral={neutral} bad={bad} average = {calculateAvg()} positive = {calculatePositive()}  />
    </div>
  )
}

export default App