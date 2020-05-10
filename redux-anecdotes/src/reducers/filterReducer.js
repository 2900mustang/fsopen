const filterReducer = (state = '', action) => {
  const { filterText } = action
  switch (action.type) {
    case 'SET_FILTER':
      return state.concat(filterText)
    default:
      return state
  }
}

export const filterChange = filterText => {
  return {
    type: 'SET_FILTER',
    filterText,
  }
}

export default filterReducer