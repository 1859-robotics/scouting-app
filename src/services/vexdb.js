import vexdb from "vexdb"

window.bdxev = require("vexdb");

const settings = {
  event: "RE-VRC-17-2559", // TODO: make this user controllable
}

const api = {
  getMatches: (team) => {
    return vexdb.get("matches", { program: "VRC", season: "In The Zone", sku: settings.event, team })
  },
  getStats: (team) => {
    return vexdb.get("rankings", { program: "VRC", season: "In The Zone", sku: settings.event, team })
  },
  getTeam: (team) => {
    return vexdb.get("teams", { program: "VRC", team })
  },
}

window.ipa = api

export default api
