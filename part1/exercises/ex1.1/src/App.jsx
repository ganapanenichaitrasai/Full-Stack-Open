const Header = (props) => {
  return(
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  return(
    <div>
      <p>{props.part} {props.excercise}</p>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.exercises[0] + props.exercises[1] + props.exercises[2]}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  
  const exercises = [exercises1,exercises2,exercises3]

  return (
    <div>
      <Header course = {course} />
      <Content part = {part1} excercise = {exercises[0]} />
      <Content part = {part2} excercise = {exercises[1]} />
      <Content part = {part3} excercise = {exercises[2]} />
     
      <Total exercises = {exercises} />
    </div>
  )
}

export default App