import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { filterChange } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch()
  const [filterText, setFilterText] = useState('')

  const handleChange = ({ target: { value } }) => {
    setFilterText(value)
    dispatch(filterChange(filterText))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} value={filterText} />
    </div>
  )
}

export default Filter
