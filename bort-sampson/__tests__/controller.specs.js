const controller = require("../controller");
const { GithubActions } = require("../github.actions");

const req = {
  params: {
    user: "a-user-name",
    reponame: "test-repo"
  }
};

const mockOutput = [
  {
    id: 972414895,
    number: 1,
    title: "add cors policy headers",
    author: "a-user-name",
    commit_count: 2
  },
  {
    id: 972647049,
    number: 2,
    title: "Update README.md",
    author: "a-user-name",
    commit_count: 1
  }
]

const res = {
  json: jest.fn()
};

describe("test the fetchPulls action ", () => {
  beforeEach(() => {
    jest.mock("../github.actions");
    jest.spyOn(GithubActions.prototype, "pullData").mockReturnValue({
      user: req.params.user,
      repo: req.params.reponame,
      output: mockOutput
    });
  });

  afterEach(jest.clearAllMocks);

  test("it should take user and reponame as input parameters from the request", async () => {
    const response = await controller.fetchPulls(req, res);
    expect(response.user).toEqual(req.params.user);
    expect(response.repo).toEqual(req.params.reponame);
  });

  test("it should return data coming from the github action function", async () => {
    const response = await controller.fetchPulls(req, res);
    expect(response.output).toEqual(mockOutput);
  });
});
