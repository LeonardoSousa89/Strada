"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.knexPaginate = void 0;
const knex_paginate_1 = require("knex-paginate");
function knexPaginate() {
    const knex = (0, knex_paginate_1.attachPaginate)();
}
exports.knexPaginate = knexPaginate;
