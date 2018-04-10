import { ADD_TEAM, SET_TEAM_NOTE } from "../actions/teams.js"

export default function teams(state = [], action) {
  if(action.type === ADD_TEAM) {
    return [
      ...state,
      ...action.payload.team
    ]
  } else if(action.type === SET_TEAM_NOTE) {
    if(state.find(team => team.number === action.number)) {
      return [
        ...state,
        {
          ...state[action.payload.number],
          [action.payload.key]: action.payload.value
        }
      ]
    } else {
      return [
        ...state,
        {
          number: action.payload.number,
          [action.payload.key]: action.payload.value
        }
      ]
    }

  } else return state
}
