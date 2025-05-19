const Header = (props) => {
  return(
    <div>
      <h1>{props.course.name}</h1>
    </div>
  )
}

const Part = (props) => {
  return(
    <div>
      <p>{props.part.name} {props.part.exercises}</p>
    </div>
  )
}

const Content = (props) => {
  return(
    <div>
      <Part part = {props.part[0]}  />
      <Part part = {props.part[1]} />
      <Part part = {props.part[2]} />
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.exercises[0].exercises + props.exercises[1].exercises + props.exercises[2].exercises}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course = {course} />
      <Content part = {course.parts} />
      <Total exercises = {course.parts} />
    </div>
  )
}

export default App;