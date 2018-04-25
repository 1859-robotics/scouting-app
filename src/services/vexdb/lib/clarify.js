/**
 * Method to clarify broad requests beyond inital request parameters. 
 * vexdb.clarify only supports endpoints that are directly tied to teams (teams, matches, skills, awards, rankings, and season_rankings)
 * Uses vexdb.clarify(), which provides a function to clarify the requests (for use in the promise chain)
 * 
 * Example Syntax:
 *  vexdb.get(teams, { region: "South Carolina" })
 *      .then(vexdb.clarify([
 *          vexdb.clarify.skills(skills => skills.combined > 90)
 *      ]))
 *      .then(console.log); 
 * 
 * 
 * 
 * 
 */

const { get } = require("./request");

function clarify(clarifications) {
    return async results => {
        let teams = results
            .map(t => t.number || t.team)
            .filter((v, i, a) => a.indexOf(v) === i)
            .filter(async team => {
                // Not using Promise.all so we can eject early, possibly saving requests
                for (let i = 0; i < clarifications.length; i++) {
                    if (!await clarifications[i].go(team)) return false;
                }
                return true;
            });
        return teams;
    }
}


clarify.assume = {
    "season": "current"
}


// Specifiers (further restricts clarifications)
// Each specifer adds a filter which accepts a list of results, and returns a filtered list that the specifier applies to.
// The clarification passes if the team passes the clarification function as well as has at least one result remaining 


function ensureFunction(item) {
    return typeof item != "function" ? a => a === item : item
}

/**
 * Specify: Event SKU
 * @param {String|Function} valid The SKU to test (or, a function that returns a boolean given a SKU)
 */
function at(valid) {
    valid = ensureFunction(valid);
    this.filters.push(list => list.filter(res => valid(res.sku)));
    return this;
}

/**
 * Specify: Rank
 * @param {String|Function} valid The rank to test (or, a function that returns a boolean given a rank)
 */
function rank(valid) {
    valid = ensureFunction(valid);
    this.filters.push(list => list.filter( res => valid(res.rank) ));
}


// Clarifications (restrists results)
/**
 * 
 * @param {Function} [general] ({ robot, driver, programming, list }) => Boolean
 */
clarify.skills = function (general) {
    return {
        filters: [],
        async go(team) {
            let list = await get("skills", { team, ...clarify.assume });

            return general({
                robot: list.filter(s => s.type === 0).sort((a, b) => b.score - a.score)[0],
                programming: list.filter(s => s.type === 1).sort((a, b) => b.score - a.score)[0],
                combined: list.filter(s => s.type === 2).sort((a, b) => b.score - a.score)[0],
                list
            });
        },
        // Valid Specifiers
        at, rank
    }
}



module.exports = clarify;