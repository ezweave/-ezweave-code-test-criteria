const { GithubActions } = require('./github.actions');

function basicPage(req, res) {
  res.send('GitHub API');
}

async function fetchPulls(req,res) {
  const user = req.params.user;
  const reponame = req.params.reponame;
  const githubService = new GithubActions({user: user, repo: reponame});
  const githubOutputData = await githubService.pullData();
  res.json(githubOutputData.output);
  return githubOutputData;
}

module.exports = {
  basicPage: basicPage,
  fetchPulls: fetchPulls
}