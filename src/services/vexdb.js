import vexdb from "vexdb"

import { setTeamNote } from "../actions/teams.js"

import * as store from "../index.js" // TODO: make this not shit and learn more about imports and exports in js because you are bad

window.bdxev = require("vexdb");


const settings = {
  sku: "RE-VRC-17-3805", // TODO: make this user controllable
  season: "In The Zone",
  program: "VRC",
}

const api = {
  getMatches: (options) => {
    return vexdb.get("matches", { ...store.store.getState().settings, ...options })
  },
  getStats: (team) => {
    return vexdb.get("rankings", { ...store.store.getState().settings, team })
  },
  getTeam: (team) => {
    return vexdb.get("teams", { team })
  },
  getTeams: () => {
    return vexdb.get("teams", { ...store.store.getState().settings })
  },
  getTeamDivisions: (team, options = {}) => {
    return new Promise((resolve, reject) => {
      api.getMatches({ team, ...options }).then((matches) => {
        store.store.dispatch(setTeamNote(team, { key: "matches", value: matches }))
        let divisions = matches.reduce((acc, cur, i) => (
          acc.indexOf(cur.division) === -1 ? [...acc, cur.division] : acc
        ), [])
        resolve(divisions)
      })
    });
  }
}

export default api

window.ipa = api
