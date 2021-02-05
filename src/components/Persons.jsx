import React from 'react'

const Person = ({ name, number, deletePerson }) => {
  return (
    <div>{name} {number} <button onClick={deletePerson}>delete</button></div>
  )
}


const Persons = ({ persons, deletePerson }) => {

  return (
    <div>
      <div>
        {persons.map(person => <Person name={person.name} number={person.number} key={person.name} deletePerson={() => deletePerson(person.name)} />)}
      </div>
    </div>
  )
}

export default Persons
