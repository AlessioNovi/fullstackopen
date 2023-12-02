import { CoursePart } from "../App"
import Part from "./Part"

interface ContentProps {
  contentArr: CoursePart[]
}

const Content = ({contentArr}: ContentProps) => {
  return (
    <div>
      {contentArr.map((contentPart, idx) => <Part key={idx} part={contentPart}/>)}
    </div>
  )
}

export default Content