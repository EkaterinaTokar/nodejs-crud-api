import { User } from "./interface";
import { users } from "./server.js";

const isValidUUID = (uuid: string): boolean => {
  const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  return uuidRegex.test(uuid);
};

export const updateUser = async (request: any, response: any, userId: any, users: User[]): Promise<void> => {
    try {
      if (!isValidUUID(userId)) {
      response.writeHead(400, { "Content-Type": "text/plain" });
      response.end("Invalid userId");
      return;
    }
 
    const userToUpdateIndex = users.findIndex((u) => u.id === userId);

     if (userToUpdateIndex === -1) {
      response.statusCode = 404;
      response.setHeader("Content-Type", "text/plain");
      response.end("User doesn't exist");
      return;
    } 

    let body = "";
    request.on("data", (chunk:any) => {
      body += chunk.toString();
    });

    request.on("end", async () => {
      try {
      const newData = JSON.parse(body);

      users[userToUpdateIndex] = { ...users[userToUpdateIndex], ...newData };
        
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify(users[userToUpdateIndex]));
      } catch (error) {
        response.writeHead(400,{"Content-Type": "text/plain"});
        response.end("Invalid data");
      }
    });
  } catch(error) {
    console.error("Server Error:", error);
    response.writeHead(500, { "Content-Type": "text/plain" });
    response.end("Server Error");
  }
}