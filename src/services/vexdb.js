import vexdb from "vexdb"

window.bdxev = require("vexdb");

const settings = {
  sku: "RE-VRC-17-3805", // TODO: make this user controllable
  season: "In The Zone",
  program: "VRC",
  division: "Technology",
}

const api = {
  getMatches: (options) => {
    return vexdb.get("matches", { ...settings, ...options })
  },
  getStats: (team) => {
    return vexdb.get("rankings", { ...settings, team })
  },
  getTeam: (team) => {
    return vexdb.get("teams", { team })
  },
  getTeams: () => {
    return vexdb.get("teams", { ...settings })
  },
  getTeamDivisions: (team, options = {}) => {
    return new Promise((resolve, reject) => {
      api.getMatches({ team, ...options }).then((matches) => {
        let divisions = matches.reduce((acc, cur, i) => (
          acc.indexOf(cur.division) === -1 ? [...acc, cur.division] : acc
        ), [])
        resolve(divisions.length === 1 ? divisions[0] : divisions)
      })
    });
  }
}

window.ipa = api

export default api
