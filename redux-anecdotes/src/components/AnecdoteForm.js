import React from 'react'
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification, clearNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = e => {
    e.preventDefault()
    const { anecdote: { value: content } } = e.target
    e.target.anecdote.value = ''
    dispatch(setNotification(`new anecdote '${content}'`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000);
    dispatch(createAnecdote(content))
  }
  
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
