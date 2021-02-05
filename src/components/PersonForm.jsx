import React from 'react'

const PersonForm = ({ addPerson, newNameInput, handleNameInputChange, newNbInput, handleNbInputChange }) => {

  return (
    <div>
      <form onSubmit={addPerson}>
        <div>name: <input value={newNameInput} onChange={handleNameInputChange} /></div>
        <div>number: <input value={newNbInput} onChange={handleNbInputChange} /></div>
        <div><button type='submit'>add</button></div>
      </form>
    </div>
  )
}

export default PersonForm
