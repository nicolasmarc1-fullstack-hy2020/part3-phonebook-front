import React from 'react'

const Filter = ({ filterInput, handleFilter }) => {

  return (
    <div>
      filter shown with <input type='text' value={filterInput} onChange={handleFilter} />
    </div>
  )
}

export default Filter
