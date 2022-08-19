const { GithubActions } = require("../github.actions");

const user = "bort";
const reponame = "test-repo";

jest.mock("../github.actions", () => ({
  ...jest.requireActual("../github.actions"),
  getCommitCount: jest.fn().mockReturnValue(2),
  outputApiData: jest.fn((a, b) => {
    return [
      { output: "1 mock api results!" },
      { output: "2 mock api results!" }
    ];
  })
}));

describe("test github pull data action", () => {
  let service = new GithubActions({});

  beforeEach(() => {
    service = new GithubActions({ user: "bort", repo: "test-repo" });
    jest.spyOn(service, "fetch").mockImplementation(async () => {
      return {
        json() {
          return [
            {
              id: 2,
              name: "Pull Request 2",
              title: "Title 2",
              user: { login: "User 2" }
            },
            {
              id: 1,
              name: "Pull Request 1",
              title: "Title 1",
              user: { login: "User 1" }

            }
          ];
        }
      };
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("#pullData", () => {
    it("fetches pull data from specified github user and repo", async () => {
      const { url, options, data } = await service.pullData(user, reponame);

      expect(url).toEqual("https://api.github.com/repos/bort/test-repo/pulls");
      expect(options).toEqual({
        method: "GET",
        headers: { "User-Agent": "a-user-name" }
      });
      expect(data).toEqual([
        {
          id: 1,
          name: "Pull Request 1",
          title: "Title 1",
          user: { login: "User 1" }
        },
        {
          id: 2,
          name: "Pull Request 2",
          title: "Title 2",
              user: { login: "User 2" }
        }
      ]);
    });
  });
});

