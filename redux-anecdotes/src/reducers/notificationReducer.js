const notificationReducer = (state = '', action) => {
  const { content } = action
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return `${content}`
    case 'CLEAR_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export const setNotification = content => {
  return {
    type: 'SET_NOTIFICATION',
    content
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

export default notificationReducer