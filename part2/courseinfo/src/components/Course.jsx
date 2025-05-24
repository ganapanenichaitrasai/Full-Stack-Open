const Header = ({title}) => {
  return <h2>{title}</h2>
}

const Part = ({title,exercise}) => {
  return <p>{title} {exercise}</p>
}

const Content = ({parts}) => {
  return(
    <div>
      {parts.map((part,i) => 
        <Part key = {i} title = {part.name} exercise = {part.exercises} />
      )}
    </div>
  )
}

const Total = ({ parts }) => {
  let total = 0;
  parts.forEach((part) => {
    total += part.exercises;
  });
  return <p>Number of exercises {total}</p>;
};

const Course = ({courses}) => {
  return(
    <div>
      {courses.map((course,i) =>
        <div key = {i}>
        <Header title = {course.name} />
        <Content parts = {course.parts} />
        <Total parts={course.parts} />
        </div>
      )}
      
    </div>
  )

}

export default Course;