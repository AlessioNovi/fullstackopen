/* eslint-disable react/prop-types */
import Course from './Course'

const CoursesList = ({ courses }) => {
  return (
    <>
      {courses.map(course => <Course key={course.id} course={course} />)}
    </>
  )
}

export default CoursesList