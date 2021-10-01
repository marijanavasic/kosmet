let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let emailsSchema = new Schema({
    id: String,
    ime: String,
    email: String,
    poruka: String,
    datum: Date
});

let Email = mongoose.model('Email', emailsSchema, 'emails');

module.exports = { Email };