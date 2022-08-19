const request = require('supertest');
const app = require('../app');

describe('test the /pulls/:user/:reponame endpoint', () => {
  test("it should respond with correct status", async () => {
    const response = await request(app).get("/github_api");
    expect(response.statusCode).toBe(200);
  });

  test("it should call the fetchPulls controller action", async () => {
    const response = await request(app).get("/github_api");
    expect(response.text).toEqual("GitHub API");
  });
});