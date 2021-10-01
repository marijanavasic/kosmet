let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let poziviSchema = new Schema({
    id: String,
    brTelefona: String,
    datum: Date
});

let Poziv = mongoose.model('Poziv', poziviSchema, 'pozivi');

module.exports = { Poziv };