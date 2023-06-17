let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let MatiereSchema = Schema({
    id: Number,
    nom: String,
    photo: String,
    idProf: mongoose.Schema.Types.ObjectId
});

mongoose.model('Subject', SubjectSchema);

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('subject', SubjectSchema);