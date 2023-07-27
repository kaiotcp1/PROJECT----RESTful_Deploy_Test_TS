import { model, Schema } from "mongoose";

const movieSchema = new Schema({
    title: {
        type: String,
        required: [true, 'O Filme deve ter título'],
        unique: true
    },
    rating: {
        type: Number,
        required: [true, 'O Filme deve ter uma avaliação '],
        min: [1, 'Avaliação deve ser superior a 1.0 '],
        max: [5, 'Avaliação deve ser inferior a 5.0 '],
        set: (val: number) => Math.round(val * 10) / 10

    },
    description: {
        type: String,
        required: [true, 'O Filme deve ter uma descrição']
    },
    director: {
        type: String,
        required: [true, 'O Filme deve ter um diretor']

    },
    stars: {
        type: Array,
        required: [true, 'O Filme deve ter estrelas'],
        min: [1, 'Estrelas deve ser superior a 1.0'],
        max: [5, 'Estrelas deve ser inferior a 5.0'],

    },
    poster: {
        type: String,
        required: [true, 'O Filme deve ter um poster']

    },
}, {
    timestamps: true
});

export const MovieModel = model('Movie', movieSchema);