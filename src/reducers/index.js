import { combineReducers } from 'redux'
import teams from "./teams.js"
import matches from "./matches.js"
import settings from "./settings.js"


const scoutingApp = combineReducers({teams, matches, settings})
export default scoutingApp
