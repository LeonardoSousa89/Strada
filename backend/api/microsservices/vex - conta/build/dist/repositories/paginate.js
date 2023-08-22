"use strict";
/**
 *  referência:
 *  https://www.youtube.com/watch?v=avUCPbWppgQ
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
  expressão matemática para cálculo da paginação
  
  x = page
  y = size
  
  x > 1 | x = (x * y) - y
**/
function calculatePage(page, size) {
    page = Number(page);
    if (page < 0)
        return (page = 0);
    if (page === 1)
        return (page = 0);
    if (page > 1)
        return (page = page * size - size);
}
exports.default = calculatePage;
