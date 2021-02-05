import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'



const App = function () {

  // hooks
  const [persons, setPersons] = useState([])
  const [newNameInput, setNewNameInput] = useState('')
  const [newNbInput, setNewNbInput] = useState('')
  const [filterInput, setFilterInput] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      console.log(initialPersons)
      setPersons(initialPersons)
    })
  }, [])





  // Input Handlers of controlled components
  const handleNameInputChange = event => setNewNameInput(event.target.value)
  const handleFilter = event => setFilterInput(event.target.value.toLowerCase())
  const handleNbInputChange = event => setNewNbInput(event.target.value)
  // vs inside: <div>number: <input value={newNbInput} onChange={event => setNewNbInput(event.target.value)} /></div>

  //Event Listners
  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newNameInput,
      number: newNbInput,
    }
    const personToUpdate = persons.find(person =>  person.name.toLowerCase() === newNameInput.toLowerCase())
    if (personToUpdate) {
      const isAnUpdate = window.confirm(`"${personToUpdate.name}" is already added to the phonebook, replace the old number with a new one?`)
      if (isAnUpdate) {
        personService.update(personToUpdate.id, newPerson).then(personUpdated => {
          setPersons(persons.map(person => person.id === personToUpdate.id ? personUpdated : person))
        }).catch((e)=> {
          setNotification({
            message: "information of "+personToUpdate.name+" has already been removed from server",
            type: "notification error"
          })
          setTimeout(()=>setNotification(null) , 3000)
          setPersons(persons.filter(person => person.id !== personToUpdate.id))
        })
      }
    }
    else {
      personService
        .create(newPerson)
        .then(returnedPerson => {
          // functional form of setState
          setPersons(prev => [...prev, returnedPerson])
          
          setNotification({
            message: "Added "+returnedPerson.name,
            type: "notification confirmation"
          })
          setTimeout(()=>setNotification(null) , 3000)
        })
        .catch(error => {
          console.log(error.response.data.error)
          setNotification({
            message: error.response.data.error,
            type: "notification error"
          })
          setTimeout(()=>setNotification(null) , 3000)
        })
    }
    setNewNameInput('')
    setNewNbInput('')
  }

  const deletePerson = (name) => {
    const personToDelete = persons.find(person => person.name === name)
    const isSure = window.confirm(`Do you really want to delete ${personToDelete.name}`)
    if (isSure) {
      personService.delete(personToDelete.id).then(() => {
        setNotification({
          message: personToDelete.name+" has been deleted" ,
          type: "notification confirmation"
        })
        setTimeout(()=>setNotification(null) , 3000)
      })
      setPersons(persons.filter(person => personToDelete.name !== person.name))
    }
  }

  //  Filters
  const personsToDisplay = persons.filter(person => person.name.toLowerCase().includes(filterInput))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification}/>
      <Filter filterInput={filterInput} handleFilter={handleFilter} />
      <h2>Add a new contact</h2>
      <PersonForm addPerson={addPerson} newNameInput={newNameInput} handleNameInputChange={handleNameInputChange}
        newNbInput={newNbInput} handleNbInputChange={handleNbInputChange} />
      <h2>Numbers</h2>
      <Persons persons={personsToDisplay} deletePerson={deletePerson} />
    </div>
  )
}

export default App


