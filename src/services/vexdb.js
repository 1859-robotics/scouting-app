import vexdb from "vexdb"

const settings = {
  event: "RE-VRC-17-2559", // TODO: make this user controllable
}

const api = {
  getMatches: (team) => {
    return vexdb.getAll("matches", {program: "VRC", season: "In The Zone", sku: settings.event, team})
  },
  getStats: (team) => {
    return vexdb.getAll("rankings", {program: "VRC", season: "In The Zone", sku: settings.event, team})
  },
}

window.ipa = api

export default api
