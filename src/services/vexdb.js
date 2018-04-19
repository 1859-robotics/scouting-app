import vexdb from "vexdb"

window.bdxev = require("vexdb");

const settings = {
  sku: "RE-VRC-17-3805", // TODO: make this user controllable
  season: "In The Zone",
  program: "VRC",
}

const api = {
  getMatches: (team) => {
    return vexdb.get("matches", { ...settings, team })
  },
  getMatch: (data) => {
    return vexdb.get("matches", { ...settings, ...data })
  },
  getStats: (team) => {
    return vexdb.get("rankings", { ...settings, team })
  },
  getTeam: (team) => {
    return vexdb.get("teams", { team })
  },
  getTeams: () => {
    return vexdb.get("teams", { ...settings })
  }
}

window.ipa = api

export default api
