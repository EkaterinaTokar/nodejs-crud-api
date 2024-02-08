var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { v4 as uuidv4 } from "uuid";
export const addUser = (request, response, users) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let body = "";
        request.on("data", (chunk) => {
            body += chunk.toString();
        });
        request.on("end", () => __awaiter(void 0, void 0, void 0, function* () {
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
                }
                else {
                    response.writeHead(400, { "Content-Type": "text/plain" });
                    response.end('Sorry, this username is already in use.');
                }
                response.writeHead(201, { "Content-Type": "application/json" });
                response.end(JSON.stringify(newUser));
            }
            catch (error) {
                console.error("Invalid data:", error);
                response.writeHead(400, { "Content-Type": "application/json" });
                response.end("Invalid data");
            }
        }));
    }
    catch (error) {
        console.error("Server Error:", error);
        response.writeHead(500, { "Content-Type": "text/plain" });
        response.end("500 Internal Server Error");
    }
});
