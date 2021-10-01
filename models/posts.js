let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let postSchema = new Schema({
    id: String,
    naslov: String,
    datum: Date,
    opis: String,
    tekst: String,
    grad: String,
    slikaURL: String
});

let Post = mongoose.model('Post', postSchema);
module.exports = { Post };