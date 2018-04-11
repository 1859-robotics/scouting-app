import { ADD_TEAM, SET_TEAM_NOTE } from "../actions/teams.js"

export default function teams(state = [], action) {
  if(action.type === ADD_TEAM) {
    return [
      ...state,
      ...action.payload.team
    ]
  } else if(action.type === SET_TEAM_NOTE) {
    if(state.find(team => team.number === action.number)) {
      console.log("true")
      return [
        ...state,
        {
          ...state[action.payload.number],
          [action.payload.key]: action.payload.value
        }
      ]
    } else {
      console.log("false")
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
