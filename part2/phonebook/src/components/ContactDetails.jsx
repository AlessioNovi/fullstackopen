/* eslint-disable react/prop-types */
const ConcactDetails = ({ name, number, id, onClickDelete }) => {
  return (
    <>
      <p>{name} - {number} / <button id={id} name={name} onClick={onClickDelete}>Delete</button></p>
    </>
  )
}

export default ConcactDetails