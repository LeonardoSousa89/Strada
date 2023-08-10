"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knexfile_1 = __importDefault(require("../../database/knexfile"));
const knex_1 = __importDefault(require("knex"));
exports.default = (0, knex_1.default)(knexfile_1.default['production']);
