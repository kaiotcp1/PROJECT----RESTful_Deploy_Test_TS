"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbPassword = process.env.DB_PASS;
const dbUser = process.env.DB_USER;
exports.default = {
    port: 3000,
    dbUrl: `mongodb+srv://${dbUser}:${dbPassword}@restfulapi.0kzidwr.mongodb.net/?retryWrites=true&w=majority`,
    env: 'development'
};
