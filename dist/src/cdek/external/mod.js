"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthError = exports.HttpError = exports.ApiError = exports.Cdek = void 0;
var cdek_1 = require("./cdek");
Object.defineProperty(exports, "Cdek", { enumerable: true, get: function () { return cdek_1.Cdek; } });
var api_1 = require("./errors/api");
Object.defineProperty(exports, "ApiError", { enumerable: true, get: function () { return api_1.ApiError; } });
var http_1 = require("./errors/http");
Object.defineProperty(exports, "HttpError", { enumerable: true, get: function () { return http_1.HttpError; } });
var auth_1 = require("./errors/auth");
Object.defineProperty(exports, "AuthError", { enumerable: true, get: function () { return auth_1.AuthError; } });
__exportStar(require("./types/api"), exports);
//# sourceMappingURL=mod.js.map