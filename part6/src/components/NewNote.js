import React from 'react'
import { useDispatch } from "react-redux";
import { createNote } from "../reducers/noteReducer";

const NewNote = (props) => {
  const dispatch = useDispatch()

  const addNote = (e) => {
    e.preventDefault()
    const { note: { value: content } } = e.target
    e.target.note.value = ''
    dispatch(createNote(content))
  }
  
  return (
    <form onSubmit={addNote}>
      <input name='note' />
      <button type='submit'>Add</button>
    </form>    
  )
}

export default NewNote
