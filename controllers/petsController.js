const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const {Pet} = require('../models/pets');

// This is the index page.

function index(req, res) {
    Pet.find().then(function(pets) {
        res.render('pets/index', {pets: pets});
    });
}

// This is the create page.

function create(req, res) {
    res.render('pets/create');
}

// This is the add action.

function add(req, res) {
    Pet.save(req.body).then(function(pet) {
        console.log(pet);
        res.redirect(`/pets/read/${pet._id}`)
    });
}

// This is the read page.

function read(req, res) {
    Pet.findById(req.params.id).then(function(pet) {
        res.render('pets/read', {pet: pet});
    });
}

// This is the update page. 

function update(req, res) {
    res.render('pets/update');
}

// This is the save action.

function save(req, res) {
    Pet.findByIdAndUpdate(req.params.id, req.body).then(function(pet) {
        console.log(pet);
        res.redirect(`/pets/read/${pet._id}`)
    });
}

// This is the delete page. 

function destroy(req, res) {
    Pet.findByIdAndRemove(req.params.id).then(function(pet) {
        res.redirect('/pets');
    })
}

const PetsController = {
    index: index, 
    create: create,
    read: read,
    update: update,
    destroy: destroy,
    save: save,
    add: add
};

module.export = PetsController;