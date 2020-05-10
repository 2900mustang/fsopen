import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'VOTE_UP':
      const { id, updatedAnecdote } = action.data
      return state.map(a => a.id !== id ? a : updatedAnecdote)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const voteUp = (id, newObj) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update(id, newObj)
    dispatch({
      type: 'VOTE_UP',
      data: {
        id,
        updatedAnecdote
      }
    })
  }
}

export default reducer