'use strict';
const fs = require('fs');
var git = require('git-rev-sync');
const packagejson = require('./package.json')
const chalk = {
    green: (str) => str,
     blackBright: (str) => str
}
let compile = function () {
    let res = ""
    let prod = process.env.NODE_ENV !== 'production' || window.location.hostname !== 'localhost'
    let branch = git.branch();
    let version  = packagejson.version
    let git_hash  = git.long();
    let commits = git.count()
    let date  = git.date()
    let nversion = process.version;
    res += chalk.blackBright("Github - " + branch) + "\n"
    res += "\t hash: " + git_hash
    res += "\n\t commits: " + commits
    res += "\n\t last_updated: " + date.toString()
    res += "\n\n " + chalk.green("Nodejs:\n")
    res += "\t node version: " + nversion
    res += "\n\t version: " + version
    res += "\n\t "+ (prod ? "Development" :  "Production").toString() 
    res += "\n"
    return res;
    }
fs.writeFileSync('src/git_str.ts', `
export default \`${compile()}\`
`, (err,stdout) => {
    console.log("Done writing `git_str.ts`")
})
// if (otherDir) {
//   console.log('git.short(' + otherDir + ') => ' + git.short(otherDir));
//   console.log('git.long(' + otherDir + ') => ' + git.long(otherDir));
//   console.log('git.branch(' + otherDir + ') => ' + git.branch(otherDir));
// }