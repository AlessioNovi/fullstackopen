/* eslint-disable react/prop-types */
import ConcactDetails from "./ContactDetails"

const PhoneBookList = ({ persons, handleDelete }) => {
  return (
    <div>
      {persons.length === 0 ? <p>No Results found</p> :
      persons.map(person => <ConcactDetails key={person.id} name={person.name} number={person.number} id={person.id} onClickDelete={handleDelete} />)}
    </div>
  )

}

export default PhoneBookList