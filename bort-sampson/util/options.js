const parameters = require("./parameters");

function setOptions(_path) {
  return (options = {
    baseUrl: parameters.baseUrl,
    hostName: parameters.hostname,
    path: _path,
    headers: {
      "User-Agent": parameters.user_agent
    },
    OAuth: process.env.GITHUB_ACCESS_TOKEN
  });
}

module.exports = setOptions;
