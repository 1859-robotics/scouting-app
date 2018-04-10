export const ADD_TEAM = "ADD_TEAM"
export const addTeam = (number) => {
  return { type: ADD_TEAM, number }
}

export const SET_TEAM_NOTE = "SET_TEAM_NOTE"
export const setTeamNote = (number, data) => {
  return { type: SET_TEAM_NOTE, number,  ...data}
}
