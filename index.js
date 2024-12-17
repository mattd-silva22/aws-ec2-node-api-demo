import { createServer } from "node:http";

const server = createServer((req, res) => {
  const { method, url } = req;

  console.log(`Request received: ${method} ${url}`);

  // Endpoint GET "/"
  if (method === "GET" && url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello World!\n");
  }

  // Endpoint GET "/health"
  else if (method === "GET" && url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({ status: "OK", message: "Server is up and running!" })
    );
  }

  // Endpoint POST "/webhook"
  else if (method === "POST" && url === "/webhook") {
    let body = "";

    // Recebe os dados do POST
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      console.log("Received Webhook Data:", body);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ message: "Webhook received", data: JSON.parse(body) })
      );
    });
  }

  // Responde com 404 para rotas desconhecidas
  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found\n");
  }
});

// Inicia o servidor na porta 3000
server.listen(3000, "127.0.0.1", () => {
  console.log("Listening on 127.0.0.1:3000");
});
