"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = void 0;
var Status;
(function (Status) {
    Status[Status["OK"] = 200] = "OK";
    Status[Status["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    Status[Status["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    Status[Status["FORBIDDEN"] = 403] = "FORBIDDEN";
    Status[Status["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(Status || (exports.Status = Status = {}));
//# sourceMappingURL=model.js.map