import vexdb from "vexdb"

window.bdxev = require("vexdb");

const settings = {
  sku: "RE-VRC-17-3805", // TODO: make this user controllable
  season: "In The Zone",
  program: "VRC",
  division: "Technology",
}

const api = {
  getMatches: (api) => {
    return vexdb.get("matches", { ...settings, ...api })
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
  getDivisionTeams: (team) => {
    return new Promise((resolve, reject) => {
      vexdb.get("teams", { team }).then((result) => {
        api.getMatch({ team: result.number })
      })
    });
  }
}

window.ipa = api

export default api
