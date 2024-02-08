import { readFile, writeFile } from "node:fs/promises";
import { User } from "./interface";
import { v4 as uuidv4 } from "uuid";

export const getUsers = async (response: any): Promise<void> => {
  try {
    const usersJson = await readFile("src/users.json", "utf-8");
    const users: User[] = JSON.parse(usersJson);
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(users));
  } catch (error) {
    console.error("Server Error:", error);
    response.writeHead(500, { "Content-Type": "text/plain" });
    response.end("500 Internal Server Error");
  }
};
