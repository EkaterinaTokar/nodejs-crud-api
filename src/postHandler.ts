import { User } from "./interface";
import { users } from "./server.js";
import { v4 as uuidv4 } from "uuid";


export const addUser = async (request: any, response: any, users: User[]): Promise<void> => {
  try {
    let body = "";
    request.on("data", (chunk: any) => {
      body += chunk.toString();
    });
    request.on("end", async () => {
      try {
        const newUser = JSON.parse(body);

       const { username, age, hobbies } = newUser;
      if (!username || !age || !hobbies) {
        response.writeHead(400, { "Content-Type": "text/plain" });
        response.end("Oops! It looks like some required fields are missing in your request.");
       }

        const user = users.find((u) => u.username === newUser.username);
        if (!user) {
          newUser.id = uuidv4();
          users.push(newUser);
        } else {
          response.writeHead(400, { "Content-Type": "text/plain" });
          response.end('Sorry, this username is already in use.');
        }

        response.writeHead(201, { "Content-Type": "application/json" });
        response.end(JSON.stringify(newUser));
      } catch (error) {
        console.error("Invalid data:", error);
        response.writeHead(400, { "Content-Type": "text/plain" });
        response.end("Invalid data");
      }
    });
  } catch (error) {
    console.error("Server Error:", error);
    response.writeHead(500, { "Content-Type": "text/plain" });
    response.end("500 Internal Server Error");
  }
};