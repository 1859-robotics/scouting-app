import { combineReducers } from 'redux'
import teams from "./teams.js"
import matches from "./matches.js"


const scoutingApp = combineReducers({teams, matches})
export default scoutingApp
