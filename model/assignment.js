let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let AssignmentSchema = Schema({
    id: Number,
    dateDeRendu: Date,
    nom: String,
    rendu: Boolean,
    note: Number,
    remarque: String,
    idMatiere: Number,
    idEleve: Number
});


module.exports = mongoose.model('subject', SubjectSchema);
