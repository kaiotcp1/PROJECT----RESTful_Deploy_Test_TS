"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movieController_1 = require("../controllers/movieController");
const router = express_1.default.Router();
router.route('/')
    .post(movieController_1.createMovie)
    .get(movieController_1.getAllMovies);
router.route('/:id')
    .get(movieController_1.findMovieById)
    .delete(movieController_1.removeMovie)
    .patch(movieController_1.updateMovie);
module.exports = router;
