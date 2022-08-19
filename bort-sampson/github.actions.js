const fetch = require("node-fetch");
const options = require("./util/options");


class GithubActions {
  constructor({ user, repo }) {
    Object.assign(this, { user, repo });
    this.fetch = fetch;
  }
    
  async pullData(user, reponame) {
    const setOptions = options("/repos/" + this.user + "/" + this.repo + "/pulls");
    this.url = setOptions.baseUrl + setOptions.hostName + setOptions.path;
    this.options = {
      method: "GET",
      headers: setOptions.headers
    }
    
    const response = await this.fetch(this.url, this.options);
    this.data = await response.json();
    this.output = await outputApiData(this.data, this.user, this.repo);
    return this;
  }
}

async function outputApiData(pulldata, user, reponame) {
  const output = await Promise.all(
    pulldata.reverse().map(async element => {

      const commitCount = await getCommitCount(element, user, reponame);

      return {
        id: element.id,
        number: element.number,
        title: element.title,
        author: element.user.login,
        commit_count: commitCount
      };
    })
  );

  return output;
}

async function getCommitCount(element, user, reponame) {
  let startPage = 1;
  const commitsPerPage = 1;
  let numberOfCommits = 0;
  let commitData = [0];
  while (commitData.length > 0) {
    const commitOptions = options(
      "/repos/" +
      user +
      "/" +
      reponame +
      "/pulls/" +
      element.number +
      "/commits?per_page=" +
      commitsPerPage +
      "&page=" +
      startPage
    );

    const getCommitData = await fetch(
      commitOptions.baseUrl + commitOptions.hostName + commitOptions.path,
      {
        method: "GET",
        headers: commitOptions.headers
      }
    );

    commitData = await getCommitData.json();
    numberOfCommits += commitData.length;
    startPage += 1;
  }
  return numberOfCommits;
}

module.exports = {
  GithubActions, getCommitCount, outputApiData
};
