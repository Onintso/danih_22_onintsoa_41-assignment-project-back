const { Int32 } = require('mongodb');
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let AssignmentViewSchema = Schema({
    dateDeRendu: Date,
    nom: String,
    rendu: Boolean,
    note: Number,
    remarque: String,
    subject: {
        nom: String,
        photo: String
    },
    prof: {
        nom: String,
        photo: String
    },
    eleve: {
        nom: String,
        photo: String
    }
});

AssignmentViewSchema.plugin(aggregatePaginate);

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
// le nom de la collection (par défaut assignments) sera au pluriel, 
// soit assignments
// Si on met un nom "proche", Mongoose choisira la collection
// dont le nom est le plus proche
module.exports = mongoose.model('assignmentView', AssignmentViewSchema,'assignmentView');
