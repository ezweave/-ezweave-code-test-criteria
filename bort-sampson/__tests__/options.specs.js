const parameters = require('../util/parameters');
const options = require('../util/options');

const mockPath = "/repos/user/testrepo"

describe("test options utility", () => {
  const result = options(mockPath);
  test("it should return all the values from the parameter utility", () => {
    expect(result.baseUrl).toEqual('https://');
    expect(result.path).toEqual(mockPath);
    expect(Object.keys(result).length).toEqual(5);
  });
});