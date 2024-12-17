import test from "node:test";
import assert from "node:assert";
import { server } from "./server.js";
import { request } from "node:http";

const PORT = 3000;

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Test server running on http://127.0.0.1:${PORT}`);
});

// Função auxiliar para fazer requisições HTTP
function makeRequest(options, body = null) {
  return new Promise((resolve, reject) => {
    const req = request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve({ statusCode: res.statusCode, data }));
    });

    req.on("error", reject);

    if (body) req.write(body);
    req.end();
  });
}

// Testes
test("GET / should return Hello World!", async () => {
  const options = {
    hostname: "127.0.0.1",
    port: PORT,
    path: "/",
    method: "GET",
  };

  const res = await makeRequest(options);
  assert.strictEqual(res.statusCode, 200);
  assert.strictEqual(res.data, "Hello World!\n");
});

test("GET /health should return status OK", async () => {
  const options = {
    hostname: "127.0.0.1",
    port: PORT,
    path: "/health",
    method: "GET",
  };

  const res = await makeRequest(options);
  assert.strictEqual(res.statusCode, 200);
  const jsonResponse = JSON.parse(res.data);
  assert.deepStrictEqual(jsonResponse, {
    status: "OK",
    message: "Server is up and running!",
  });
});

test("POST /webhook should return received data", async () => {
  const options = {
    hostname: "127.0.0.1",
    port: PORT,
    path: "/webhook",
    method: "POST",
    headers: { "Content-Type": "application/json" },
  };

  const payload = JSON.stringify({ test: "data" });
  const res = await makeRequest(options, payload);

  assert.strictEqual(res.statusCode, 200);
  const jsonResponse = JSON.parse(res.data);
  assert.deepStrictEqual(jsonResponse, {
    message: "Webhook received",
    data: { test: "data" },
  });
});

test("POST /webhook with invalid JSON should return 400", async () => {
  const options = {
    hostname: "127.0.0.1",
    port: PORT,
    path: "/webhook",
    method: "POST",
    headers: { "Content-Type": "application/json" },
  };

  const invalidPayload = "invalid json";
  const res = await makeRequest(options, invalidPayload);

  assert.strictEqual(res.statusCode, 400);
  const jsonResponse = JSON.parse(res.data);
  assert.deepStrictEqual(jsonResponse, {
    message: "Error parsing webhook data",
  });
});

// Fecha o servidor após os testes
test("Cleanup", () => {
  server.close();
});
