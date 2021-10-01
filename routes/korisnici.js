let Korisnik = require('../models/korisnici').Korisnik;
let express = require('express');
let router = express.Router();
let bcrypt = require('bcrypt');
let auth = require('../controllers/auth');

//Proveriti da li je korisnik vec u bazi
router.post('/login', async function (req, res) {
    //prvo citamo unete podake
    let email = req.body.email;
    let sifra = req.body.sifra;
    //proveramo podudarnost unetih podataka sa podacima iz baze tj proveravamo prvo samo email
    let korisnik = await Korisnik.find().where({ email: email });
    //proveravamo da li je objekat korisnik prazan ako nije znaci da postoji u bazi
    if (korisnik.length > 0) {
        let rezultatPoredjenja = await bcrypt.compare(sifra, korisnik[0].sifra);
        if (rezultatPoredjenja) {
            //kada je i email adresa i sifra tacna treba generisati token
            let token = auth.generateToken(korisnik[0]);//ovo je korisnik iz baze
            //token se salje klijentu
            res.cookie('auth_token', token);
            res.send({
                redirectURL: '/admin'
            });
        } else {
            res.status(400);
            res.send('Одбијено!');
        }

    } else {
        res.send('Одбијено!');
    }
});

//Dodavanje novog korisnika u bazu
router.post('/register', async function (req, res) {
    //uzima podatke iz text polja
    let email = req.body.email;
    let sifra = req.body.sifra;
    //proverava da li korisnik sa tim mejlom postoji u bazi 
    let korisnik = await Korisnik.find().where({ email: email });
    //ako ne postoji, kreira novog korisnika
    if (korisnik.length === 0) {
        let encryptedPass = await bcrypt.hash(sifra, 12);
        let noviKorisnik = new Korisnik({
            email: email,
            sifra: encryptedPass
        });
        await noviKorisnik.save();
        res.send('Успешна регистрација!');
    } else {
        res.send('Одбијено!');
    }
});

module.exports = router;