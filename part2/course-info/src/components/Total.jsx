/* eslint-disable react/prop-types */
const Total = ({ parts }) => {
  const total = parts.reduce((acc, obj) => acc + obj.exercises, 0)
  return <p style={{fontWeight: "bold"}}>total of {total} exercises</p>
}


export default Total