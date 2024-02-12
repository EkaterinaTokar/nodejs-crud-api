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
export const deleteUser = (request, response, userId, users) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!isValidUUID(userId)) {
            response.writeHead(400, { "Content-Type": "text/plain" });
            response.end("Invalid userId");
            return;
        }
        const userToDeleteIndex = users.findIndex((user) => user.id === userId);
        if (userToDeleteIndex === -1) {
            response.writeHead(404, { "Content-Type": "text/plain" });
            response.end("User doesn't exist");
            return;
        }
        users.splice(userToDeleteIndex, 1);
        response.statusCode = 204;
        response.end(JSON.stringify(users));
    }
    catch (error) {
        console.error("Server Error:", error);
        response.writeHead(500, { "Content-Type": "text/plain" });
        response.end("Server Error");
    }
});
