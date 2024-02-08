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

const isValidUUID = (uuid: string): boolean => {
  const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  return uuidRegex.test(uuid);
};

export const getUserById = async (request: any, response: any, userId: any, users: User[]): Promise<void> => {
  try {
     if (!isValidUUID(userId)) {
      response.writeHead(400, { "Content-Type": "text/plain" });
      response.end("Invalid userId");
      return;
    }
    const user = users.find((u) => u.id === userId);
    if (!user) {
      response.writeHead(404, { "Content-Type": "text/plain" });
      response.end("User doesn't exist");
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
