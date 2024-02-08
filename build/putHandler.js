var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const isValidUUID = (uuid) => {
    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return uuidRegex.test(uuid);
};
export const updateUser = (request, response, userId, users) => __awaiter(void 0, void 0, void 0, function* () {
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
        request.on("data", (chunk) => {
            body += chunk.toString();
        });
        request.on("end", () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const newData = JSON.parse(body);
                users[userToUpdateIndex] = Object.assign(Object.assign({}, users[userToUpdateIndex]), newData);
                response.writeHead(200, { "Content-Type": "application/json" });
                response.end(JSON.stringify(users[userToUpdateIndex]));
            }
            catch (error) {
                response.writeHead(400, { "Content-Type": "text/plain" });
                response.end("Invalid data");
            }
        }));
    }
    catch (error) {
        console.error("Server Error:", error);
        response.writeHead(500, { "Content-Type": "text/plain" });
        response.end("Server Error");
    }
});
