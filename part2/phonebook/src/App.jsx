import { useState, useEffect } from 'react'
import phoneBookService from './services/phonebook'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PhoneBookList from './components/PhoneBookList'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterCriteria, setFilterCriteria] = useState('')
  const [message, setMessage] = useState({ text: '', isError: false})

  const handleNameInputChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberInputChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterInputChange = (event) => {
    setFilterCriteria(event.target.value)
  }

  const handleDelete = event => {
    if (window.confirm(`Do you want to delete ${event.target.name}???`)) {
      phoneBookService.deletePhoneDetails(event.target.id)
      .then(response => {
        const revisedPersons = persons.filter(person => person.id !== event.target.id)
        setPersons(revisedPersons)
        console.log(`Contact Deleted with response status ${response.statusText}`)
      })
      .catch(error => displayMessage({ text: error.response.data.message, isError: true }))
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nameAlreadyExists = persons.find(persons => persons.name === newName)
    if (nameAlreadyExists) {
      if (window.confirm(`${newName} Already exists in the phonebook do you want to replace the old number with a new one?`)) {
        const copy = {...nameAlreadyExists, number: newNumber}
        phoneBookService.updatePhoneDetails(copy.id, copy)
          .then(responseData => {
            const newPersons = persons.filter(person => person.id !== responseData.id).concat(responseData)
            setPersons(newPersons)
            setNewName('')
            setNewNumber('')
          })
          .catch((error) => displayMessage({ text: error.response.data.message, isError: true }))
      }
    } else {
      const newPhoneDetails = { name: newName, number: newNumber }
      phoneBookService.createPhoneDetails(newPhoneDetails)
        .then(responseData => {
          setPersons(persons.concat(responseData))
          displayMessage({ text: `${responseData.name} was Added To the list`, isError: false })
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          displayMessage({ text: error.response.data.message, isError: true })
        })
    }
  }
  
  const displayMessage = (message) => {
    setMessage(message)
    setTimeout(() => setMessage({ text: '', isError: false}), 2500)
  }

  useEffect(() => {
    (async () => {
      try {
        const data = await phoneBookService.getAll()
        setPersons(data)
      } catch (error) {
        alert(error)
      }
    })()
  }, [])

  const filteredPersons = !filterCriteria ? persons : persons.filter(person => person.name.toUpperCase().startsWith(filterCriteria.toUpperCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      {message.text && <Notification message={message} />}
      <Filter text="Filter shown with" value={filterCriteria} onChange={handleFilterInputChange} />
      <h3>Add a new Contact</h3>
      <PersonForm 
        onSubmit={handleSubmit} 
        nameValue={newName} 
        numberValue={newNumber} 
        onChangeName={handleNameInputChange} 
        onChangeNumber={handleNumberInputChange} 
      />
      <h3>Numbers</h3>
      <PhoneBookList persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  )
}

export default App