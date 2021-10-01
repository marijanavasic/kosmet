let jwt = require('jsonwebtoken');
let secretKey = 'qewr345trfede'
//f-ja za generisanje tokena
function generateToken(korisnik) {
    let payload = {
        email: korisnik.email,
        sifra: korisnik.sifra
    }
    return jwt.sign(payload, secretKey);
}

//f-ja koja proverava da li je token korisnik pravi ili ne
function checkToken(token) {
    return jwt.verify(token, secretKey);
}

//da bi ove dve f-je mogle da se koriste i u drugim fajlovima moramo da ih eksportujemo
module.exports = { generateToken, checkToken };