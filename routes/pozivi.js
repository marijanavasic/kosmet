let Poziv = require('../models/pozivi').Poziv;
let uniqid = require('uniqid');
let express = require('express');
let router = express.Router();
let authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, async (req, res) => {
    res.send(await Poziv.find()); //dobavljamo sve pozive iz baze i saljemo ih klijentu kao odgovor
});

router.post('/', async (req, res) => {
    let reqBody = req.body; //citamo podatke koji treba da se posaljuu u bazu
    let noviPoziv = new Poziv({ //dodajemo noviPoziv dokument i taj dokument popunjavamo na osnovu poziviSchema
        id: uniqid(),
        brTelefona: reqBody.brTelefona,
        datum: new Date()
    });
    await noviPoziv.save(); //cuvamo noviPoziv  bazu
    res.send('Prihvacen!');
});

router.delete('/:id', authMiddleware, async (req, res) => {
    await Poziv.deleteOne({ id: req.params.id });
    res.send('Obrisan poziv!');
});

module.exports = router;