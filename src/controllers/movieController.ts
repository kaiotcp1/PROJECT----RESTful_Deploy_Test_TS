import { Request, Response } from "express";
import { MovieModel } from "../models/Movie";
import Logger from "../../config/logger";

//Interface
import { Movie } from '../interfaces/movie';

export async function createMovie(req: Request, res: Response) {
    try {
        const { title, rating, description, director, stars, poster } = req.body;

        const movieData: Movie = { title, rating, description, director, stars, poster };

        const movie = await MovieModel.findOne({ title: movieData.title });

        if (movie) return res.status(409).json({ status: 'fail', message: 'Este filme já existe !' });

        await MovieModel.create(movieData);
        return res.status(201).json({
            status: 'success',
            movie: movieData
        });

    } catch (error: any) {
        Logger.error(`Erro no sistema: ${error}`);
        return res.status(500).json({
            status: 'fail',
            message: error.message
        });
    };
};

export async function findMovieById(req: Request, res: Response) {
    try {
        const id = req.params.id;

        const movieData = await MovieModel.findById(id);

        if (!movieData) return res.status(404).json({ status: 'fail', message: 'Filme não encontrado' });

        return res.status(200).json({
            status: 'success',
            movie: movieData
        });

    } catch (error: any) {
        Logger.error(`Erro no sistema: ${error}`);
        return res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

export async function getAllMovies(req: Request, res: Response) {
    try {
        const moviesData = await MovieModel.find();

        return res.status(200).json({
            results: moviesData.length,
            status: 'success',
            movie: moviesData,
        });

    } catch (error: any) {
        Logger.error(`Erro no sistema: ${error}`);
        return res.status(400).json({
            status: 'fail',
            message: error.message
        });
    };
};

export async function removeMovie(req: Request, res: Response) {
    try {
        const id = req.params.id;

        const movieData = await MovieModel.findById(id);

        if (!movieData) return res.status(404).json({ status: 'fail', message: 'O filme não existe !' });

        await MovieModel.findByIdAndDelete(id);

        return res.status(204).json({
            status: 'success',
            message: 'Filme removido com sucesso',
            movie: null,
        });

    } catch (error: any) {
        Logger.error(`Erro no sistema: ${error}`);
        return res.status(500).json({
            status: 'fail',
            message: error.message
        });
    };
};

export async function updateMovie(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const data = req.body;

        const movieData = await MovieModel.findById(id);

        if (!movieData) return res.status(404).json({ status: 'fail', message: 'O filme não existe !' });

        await MovieModel.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true, // Run DB model Validators again
        });

        return res.status(200).json({
            status: 'success',
            movie: data,
        });

    } catch (error: any) {
        Logger.error(`Erro no sistema: ${error}`);
        return res.status(500).json({
            status: 'fail',
            message: error.message
        });
    }
};