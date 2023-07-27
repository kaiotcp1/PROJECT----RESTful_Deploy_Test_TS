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
exports.updateMovie = exports.removeMovie = exports.getAllMovies = exports.findMovieById = exports.createMovie = void 0;
const Movie_1 = require("../models/Movie");
const logger_1 = __importDefault(require("../../config/logger"));
function createMovie(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { title, rating, description, director, stars, poster } = req.body;
            const movieData = { title, rating, description, director, stars, poster };
            const movie = yield Movie_1.MovieModel.findOne({ title: movieData.title });
            if (movie)
                return res.status(409).json({ status: 'fail', message: 'Este filme já existe !' });
            yield Movie_1.MovieModel.create(movieData);
            return res.status(201).json({
                status: 'success',
                movie: movieData
            });
        }
        catch (error) {
            logger_1.default.error(`Erro no sistema: ${error}`);
            return res.status(500).json({
                status: 'fail',
                message: error.message
            });
        }
        ;
    });
}
exports.createMovie = createMovie;
;
function findMovieById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const movieData = yield Movie_1.MovieModel.findById(id);
            if (!movieData)
                return res.status(404).json({ status: 'fail', message: 'Filme não encontrado' });
            return res.status(200).json({
                status: 'success',
                movie: movieData
            });
        }
        catch (error) {
            logger_1.default.error(`Erro no sistema: ${error}`);
            return res.status(400).json({
                status: 'fail',
                message: error.message
            });
        }
    });
}
exports.findMovieById = findMovieById;
;
function getAllMovies(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const moviesData = yield Movie_1.MovieModel.find();
            return res.status(200).json({
                results: moviesData.length,
                status: 'success',
                movie: moviesData,
            });
        }
        catch (error) {
            logger_1.default.error(`Erro no sistema: ${error}`);
            return res.status(400).json({
                status: 'fail',
                message: error.message
            });
        }
        ;
    });
}
exports.getAllMovies = getAllMovies;
;
function removeMovie(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const movieData = yield Movie_1.MovieModel.findById(id);
            if (!movieData)
                return res.status(404).json({ status: 'fail', message: 'O filme não existe !' });
            yield Movie_1.MovieModel.findByIdAndDelete(id);
            return res.status(204).json({
                status: 'success',
                message: 'Filme removido com sucesso',
                movie: null,
            });
        }
        catch (error) {
            logger_1.default.error(`Erro no sistema: ${error}`);
            return res.status(500).json({
                status: 'fail',
                message: error.message
            });
        }
        ;
    });
}
exports.removeMovie = removeMovie;
;
function updateMovie(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const data = req.body;
            const movieData = yield Movie_1.MovieModel.findById(id);
            if (!movieData)
                return res.status(404).json({ status: 'fail', message: 'O filme não existe !' });
            yield Movie_1.MovieModel.findByIdAndUpdate(id, data, {
                new: true,
                runValidators: true, // Run DB model Validators again
            });
            return res.status(200).json({
                status: 'success',
                movie: data,
            });
        }
        catch (error) {
            logger_1.default.error(`Erro no sistema: ${error}`);
            return res.status(500).json({
                status: 'fail',
                message: error.message
            });
        }
    });
}
exports.updateMovie = updateMovie;
;
