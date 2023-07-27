"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const db_1 = __importDefault(require("./../config/db"));
const app = (0, express_1.default)();
// JSON middleware
app.use(express_1.default.json());
//Middlewares
const morganMiddleware_1 = __importDefault(require("./middleware/morganMiddleware"));
app.use(morganMiddleware_1.default);
//Router
const movieRouter = require('./routes/movieRouter');
// Routes
app.use('/api/v1/movie', movieRouter);
//Logger
const logger_1 = __importDefault(require("../config/logger"));
// App port
const port = config_1.default.get('port') || 8080;
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.default)();
    logger_1.default.info(`Server online na porta: ${port}`);
}));
