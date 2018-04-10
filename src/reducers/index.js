import { combineReducers } from 'redux'
import teams from "./teams.js"

// console.log(reducers)

const scoutingApp = combineReducers({teams})
export default scoutingApp
