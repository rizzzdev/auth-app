"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validation = void 0;
const zod_1 = require("zod");
class Validation {
}
exports.Validation = Validation;
Validation.REGISTER = zod_1.z.object({
    username: zod_1.z.string().min(6).max(100),
    password: zod_1.z.string().min(8).max(100),
    firstName: zod_1.z.string().min(1).max(100),
    lastName: zod_1.z.string().min(1).max(100).optional(),
});
Validation.LOGIN = zod_1.z.object({
    username: zod_1.z.string().min(6).max(100),
    password: zod_1.z.string().min(8).max(100),
});
//# sourceMappingURL=validation.js.map