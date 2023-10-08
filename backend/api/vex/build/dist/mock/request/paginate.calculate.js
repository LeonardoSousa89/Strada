"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function calculatePage(page, size) {
    page = Number(page);
    if (page < 0)
        return page = 0;
    if (page === 1)
        return page = 0;
    if (page > 1)
        return page = (page * size) - size;
}
exports.default = calculatePage;
