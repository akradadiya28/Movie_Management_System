const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    path: String,
    moviename: String,
    description: String,
    languages: String,
    rating: Number,
    quality: String,
    poster: String
})

module.exports = mongoose.model('Movies', movieSchema);