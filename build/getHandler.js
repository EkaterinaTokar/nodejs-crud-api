var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const getUsers = (response, users) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify(users));
    }
    catch (error) {
        console.error("Server Error:", error);
        response.writeHead(500, { "Content-Type": "text/plain" });
        response.end("500 Internal Server Error");
    }
});
const isValidUUID = (uuid) => {
    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return uuidRegex.test(uuid);
};
export const getUserById = (request, response, userId, users) => __awaiter(void 0, void 0, void 0, function* () {
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
    }
    catch (error) {
        console.error("Error getting user by id:", error);
        response.writeHead(500, { "Content-Type": "text/plain" });
        response.end("Server Error");
    }
});
