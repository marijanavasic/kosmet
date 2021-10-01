let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let korisnikSchema = new Schema({
    email: String,
    sifra: String
});

let Korisnik = mongoose.model('Korisnik', korisnikSchema, 'korisnici');

module.exports = { Korisnik };