import { User } from "./interface";

const isValidUUID = (uuid: string): boolean => {
  const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  return uuidRegex.test(uuid);
};

export const deleteUser = async (request: any, response: any, userId: any, users: User[]): Promise<void> => {
  try {
      if (!isValidUUID(userId)) {
      response.writeHead(400, { "Content-Type": "text/plain" });
      response.end("Invalid userId");
      return;
    }

     const userToDeleteIndex = users.findIndex((user) => user.id === userId);
    if (userToDeleteIndex === -1) {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.end("User doesn't exist");
      return;
    }

    users.splice(userToDeleteIndex, 1);
    response.statusCode = 204;
    response.end(JSON.stringify(users));
  } catch (error) {
   console.error("Server Error:", error);
    response.writeHead(500, { "Content-Type": "text/plain" });
    response.end("Server Error");
  }
}