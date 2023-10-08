"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTime = void 0;
function getTime() {
    const southAmericaTimeZone = new Date();
    const date = new Intl.DateTimeFormat("pt-BR", {
        timeZone: "America/Sao_Paulo",
        dateStyle: "long",
    }).format(southAmericaTimeZone);
    const time = new Intl.DateTimeFormat("pt-BR", {
        timeZone: "America/Sao_Paulo",
        timeStyle: "short",
    }).format(southAmericaTimeZone);
    return `${date}, ${time}`;
}
exports.getTime = getTime;
