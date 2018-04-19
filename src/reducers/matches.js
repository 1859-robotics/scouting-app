import { ADD_MATCH, SET_MATCH_NOTE, ADD_MATCHES, SET_MATCH } from "../actions/matches.js"

export default function matches(state = [], action) {
  if(action.type === ADD_MATCH) {
    return [
      ...state,
      ...action.payload.match
    ]
  } else if(action.type === SET_MATCH_NOTE) {
    if(state.find(match => match.matchnum === action.payload.matchnum)) {
      const newState = Array.from(state)
      const i = newState.findIndex((match) => match.matchnum === action.payload.matchnum)
      newState[i] = {
        ...newState[i],
        [action.payload.key]: action.payload.value
      }
      return newState
    } else {
      return [
        ...state,
        {
          matchnum: action.payload.matchnum,
          [action.payload.key]: action.payload.value
        }
      ]
    }
  } else if(action.type === ADD_MATCHES) {
    if(state.length !== 0) {
      return [
        ...state,
        ...action.payload.matches.filter(match => !state.find(amatch => match.matchnum === amatch.matchnum))
      ]
    } else return [ ...action.payload.matches ]

  } else if(action.type === SET_MATCH) {
    if(state.find(match => action.payload.match.matchnum === match.matchnum)) {
      const newState = Array.from(state)
      const i = newState.findIndex((match) => match.matchnum === action.payload.match.matchnum)
      newState[i] = {
        ...action.payload.match
      }
      return newState
    } else {
      return [
        ...state,
        action.payload.match
      ]
    }
  } else return state
}
