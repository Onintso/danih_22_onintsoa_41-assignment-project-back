let mongoose = require('mongoose');
let Schema = mongoose.Schema;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let SubjectSchema = Schema({
    id: Number,
    nom: String,
    photo: String,
    idProf: mongoose.Schema.Types.ObjectId
});

// Pour ajouter la pagination
SubjectSchema.plugin(aggregatePaginate);

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Subject', SubjectSchema);