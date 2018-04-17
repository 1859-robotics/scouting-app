export const ADD_MATCH = "ADD_MATCH"
export const addMatch = (data) => {
  return { type: ADD_MATCH, payload: { ...data } }
}

export const SET_MATCH_NOTE = "SET_MATCH_NOTE"
export const setMatchNote = (number, data) => {
  return { type: SET_MATCH_NOTE, payload: { matchnum: number, ...data } }
}

export const ADD_MATCHES = "ADD_MATCHES"
export const addMatches = (matches) => {
  return { type: ADD_MATCHES, payload: { matches } }
}

export const SET_MATCH = "SET_MATCH"
export const setMatch = (match) => {
  return { type: SET_MATCH, payload: { match } }
}
