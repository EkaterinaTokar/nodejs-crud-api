import { readFile, writeFile } from "node:fs/promises";
import * as url from "node:url";
import { User } from "./interface";
import { users } from "./server.js";
import { v4 as uuidv4 } from "uuid";

export const getUsers = async (response: any, users: User[]): Promise<void>=> {
  try {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(users));
  } catch (error) {
    console.error("Server Error:", error);
    response.writeHead(500, { "Content-Type": "text/plain" });
    response.end("500 Internal Server Error");
  }
};

export const getUserById = async (request: any, response: any, userId: any, users: User[]): Promise<void> => {
  try {
    const user = users.find((u) => u.id === userId);
    if (!user) {
      response.writeHead(404, { "Content-Type": "text/plain" });
      response.end("User not found");
      return;
    }
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(user));
  } catch (error) {
    console.error("Error getting user by id:", error);
    response.writeHead(500, { "Content-Type": "text/plain" });
    response.end("Server Error");
  }
};
