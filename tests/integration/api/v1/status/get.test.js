test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const respondBody = await response.json();
  const parsedUpdatedAt = new Date(respondBody.updated_at);
  expect(respondBody.updated_at).toEqual(parsedUpdatedAt.toISOString());

  expect(respondBody.dependecies.database.version).toEqual('16.0');
  expect(respondBody.dependecies.database.max_connections).toEqual(100);
  expect(respondBody.dependecies.database.opened_connections).toEqual(1);
});
