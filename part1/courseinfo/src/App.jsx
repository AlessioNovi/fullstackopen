/* eslint-disable react/prop-types */
const Header = (props) => {
  return (
    <h1>{props.name}</h1>
  );
}

const Part = (props) => {
  return (
    <p>{props.name} {props.exercises}</p>
  );
}

const Component = (props) => {
  return (
    <div>
      {props.parts.map((obj) => <Part key={obj} name={obj.name} exercises={obj.exercises} />)}
    </div>
  );
}

const Total = (props) => {
  console.log(props)
  const total = props.parts.map((obj) => obj.exercises).reduce((acc, val) => acc + val, 0);
  return (
    <p>Number of exercises {total}</p>
  );
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
      <Header name={course.name} />
      <Component parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App