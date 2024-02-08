import http from "node:http";
import { User } from "./interface";
import { getUsers, getUserById } from "./getHandler.js";
import { addUser } from "./postHandler.js";
import { updateUser } from "./putHandler.js";
import {deleteUser } from "./deleteHandler.js"
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 8080;

export let users: User[]  = [];

const server = http.createServer((request, response) => {
  try {
    if (request.method === "GET" && request.url === "/api/users") {
      getUsers(response, users);
    } else if (request.method === "GET" && request.url && request.url.startsWith("/api/users/")) {
      const userId = request.url.split("/").pop();
      getUserById(request, response, userId, users);
    }else if (request.method === "POST" && request.url === "/api/users") {
    addUser(request, response, users);
  } else if (request.method === "PUT" && request.url && request.url.startsWith("/api/users/")) {
      const userId = request.url.split("/").pop();
      updateUser(request, response, userId, users);
  }else if (request.method === "DELETE" && request.url && request.url.startsWith("/api/users/")) {
     const userId = request.url.split("/").pop();
    deleteUser(request, response, userId, users);
  }  else {
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
