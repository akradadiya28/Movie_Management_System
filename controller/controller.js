const movieModal = require('../models/movieModel');
const fs = require('fs');

const defaultCon = (req, res) => {
    res.render('index');
}

const addMovie = (req, res) => {
    res.render('add');
}

const addData = async (req, res) => {

    let movieData = new movieModal({
        path: req.file.path,
        moviename: req.body.moviename,
        description: req.body.description,
        languages: req.body.languages,
        rating: req.body.rating,
        quality: req.body.quality,
    })
    await movieData.save();

    res.redirect('/view');
}

const viewMovie = async (req, res) => {

    var data = await movieModal.find();
    console.log(data);

    res.render('view', { data: data });
}

const editMovie = async (req, res) => {

    const { id } = req.params;

    let movie = await movieModal.findOne({ _id: id });

    console.log("movie", movie);

    await res.render('edit', { movie });
}

const updateMovie = async (req, res) => {

    const { id } = req.params;
    const updateData = await movieModal.findById(id);
    console.log("updateData", updateData);

    if (req.path) {
        fs.unlink(updateData.path, (err) => {
            console.log(err);
        })
        console.log("Delete previous file");

    }
    updateData.moviename = req.body.moviename;
    updateData.description = req.body.description;
    updateData.languages = req.body.languages;
    updateData.rating = req.body.rating;
    updateData.quality = req.body.quality;

    if (req.file) {
        updateData.path = req.file.path;
    }

    const updateMovie = await movieModal.findByIdAndUpdate({ _id: id }, updateData, { new: true });
    console.log("updateMovie", updateMovie);

    res.redirect('/view');
}

const deleteMovie = async (req, res) => {

    const { id } = req.params;

    const deleteMovie = await movieModal.findByIdAndDelete({ _id: id });
    console.log("deleteMovie", deleteMovie);

    res.redirect('/view');
}

module.exports = { defaultCon, addMovie, addData, viewMovie, editMovie, updateMovie, deleteMovie };