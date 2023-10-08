"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knexfile_1 = __importDefault(require("../../database/knexfile"));
const knex_1 = __importDefault(require("knex"));
const knex_paginate_1 = require("knex-paginate");
(0, knex_paginate_1.attachPaginate)();
exports.default = (0, knex_1.default)(knexfile_1.default["development"]);
