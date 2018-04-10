import { ADD_TEAM, SET_TEAM_NOTE } from "../actions/teams.js"

export default function teams(state = [], action) {
  if(action === ADD_TEAM) {
    return [
      ...state,
      ...action.payload
    ]
  } else if(action === SET_TEAM_NOTE) {
    return [
      ...state,
      ...({
        ...state[action.number],
        [action.key]: action.value
      })
    ]
  } else return state
}
