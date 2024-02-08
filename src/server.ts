import http from "node:http";
import { getUsers} from "./getHandler.js";
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 8080;
console.log(port)

const server = http.createServer((request, response) => {
  try {
    if (request.method === "GET" && request.url === "/api/users") {
      getUsers(response);
    } else {
      console.error("404");
      response.writeHead(404, { "Content-Type": "text/plain" });
      response.end("404 Not Found");
    }
  } catch (error) {
    console.error("Server Error:", error);
    response.writeHead(500, { "Content-Type": "text/plain" });
    response.end("500 Internal Server Error");
  }
});
server.listen(port , () => {
  console.log(`Server is running on port ${port}`);
});
