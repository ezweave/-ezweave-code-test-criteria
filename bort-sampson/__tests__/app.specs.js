const request = require('supertest');
const app = require('../app');

describe('test the /github_api endpoint', () => {
  test("it should respond with correct status", async () => {
    const response = await request(app).get("/github_api");
    expect(response.statusCode).toBe(200);
  });
  test("it should display the right message at that endpoint", async () => {
    const response = await request(app).get("/github_api");
    expect(response.text).toEqual("GitHub API");
  });
});

describe('test an incorrect route', () => {
  test("it should respond with a status code of 404", async () => {
    const response = await request(app).get("/api");
    expect(response.statusCode).toBe(404);
  });
});