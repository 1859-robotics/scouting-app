import { ADD_TEAM, SET_TEAM_NOTE, ADD_TEAMS } from "../actions/teams.js"

export default function teams(state = [], action) {
  if(action.type === ADD_TEAM) {
    return [
      ...state,
      ...action.payload.team
    ]
  } else if(action.type === SET_TEAM_NOTE) {
    if(state.find(team => team.number === action.payload.number)) {
      const newState = Array.from(state)
      const i = newState.findIndex((team) => team.number === action.payload.number)
      newState[i] = {
        ...newState[i],
        [action.payload.key]: action.payload.value
      }
      return newState
    } else {
      return [
        ...state,
        {
          number: action.payload.number,
          [action.payload.key]: action.payload.value
        }
      ]
    }

  } else if(action.type === ADD_TEAMS) {
    if(state.length !== 0) {
      return [
        ...state,
        ...action.payload.teams.filter(team => state.find(ateam => team.number !== ateam.number))
      ]
    } else return [ ...action.payload.teams ]

  } else return state
}
