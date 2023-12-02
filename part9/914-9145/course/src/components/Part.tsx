import { CoursePart } from "../App"

interface PartProps {
  part: CoursePart
}

const Part = ({part}: PartProps) => {
  const renderPart = () => {
    switch (part.kind) {
      case 'basic': {
        return (
          <>
            <p style={{fontWeight: 'bold'}}>{part.name} {part.exerciseCount}</p>
            <p>{part.description}</p>
            <br></br>

          </>
        )
      }
      case 'background': {
        return (
          <>
            <p style={{fontWeight: 'bold'}}>{part.name} {part.exerciseCount}</p>
            <p>{part.description}</p>
            <p>Submit to {part.backgroundMaterial}</p>
            <br></br>
          </>
        )
      }
      case 'group': {
        return (
          <>
            <p style={{fontWeight: 'bold'}}>{part.name} {part.exerciseCount}</p>
            <p>Project exercises {part.groupProjectCount}</p>
            <br></br>
          </>
        )
      }
      case 'special': {
        return (
          <>
            <p style={{fontWeight: 'bold'}}>{part.name} {part.exerciseCount}</p>
            <p>Project exercises {part.requirements.join(', ')}</p>
            <br></br>
          </>
        )
      }
      default: {
        const exhaustiveCheck: never = part;
        throw Error(`Unhandled Part object passed ${JSON.stringify(exhaustiveCheck)}`)
      }
    }
  }

  return (
    <div>
      {renderPart()}
    </div>
  )
} 

export default Part