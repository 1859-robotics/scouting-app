export const ADD_TEAM = "ADD_TEAM"
export const addTeam = (number) => {
  return { type: ADD_TEAM, number }
}

export const SET_TEAM_NOTE = "SET_TEAM_NOTE"
export const setTeamNote = (number, data) => {
  return { type: SET_TEAM_NOTE,
           payload: {
           number,
           ...data
         }
  }
}

export const ADD_TEAMS = "ADD_TEAMS"
export const addTeams = (teams) => {
  return { type: ADD_TEAMS, payload: { teams } }
}

export const SET_TEAM = "SET_TEAM"
export const setTeam = (team) => {
  return { type: SET_TEAM, payload: { team } }
}
