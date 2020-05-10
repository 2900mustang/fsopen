import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteUp } from "../reducers/anecdoteReducer";
import { setNotification, clearNotification } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, handleClick }) => (
  <li>
    <div>{anecdote.content}</div>
    <div>
      has {anecdote.votes}
      <button onClick={handleClick}>votes</button>
    </div>
  </li>
)

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter) {
      return anecdotes.filter(a => a.content.includes(filter))
    }
    return anecdotes
  })
  anecdotes.sort((a, b) => a.votes - b.votes)
  const dispatch = useDispatch()

  const handleVote = (anecdote) => {
    const newAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    dispatch(voteUp(anecdote.id, newAnecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 2000);
  }

  const displayAnecdotes = () => (
    <>
      {anecdotes.map(anecdote => 
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          // handleClick={() => dispatch(voteUp(anecdote.id))}
          handleClick={() => handleVote(anecdote)}
        />
      )}
    </>
  )

  return (
    <ul>
      {displayAnecdotes()}
    </ul>
  )
}

export default AnecdoteList
