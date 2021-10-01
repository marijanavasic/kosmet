let Email = require('../models/emails').Email;
let uniqid = require('uniqid');
let express = require('express');
let router = express.Router();
let authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, async (req, res) => {
    res.send(await Email.find());
});

router.post('/', async (req, res) => {
    let reqBody = req.body;
    let noviEmail = new Email({
        id: uniqid(),
        ime: reqBody.ime,
        email: reqBody.email,
        poruka: reqBody.poruka,
        datum: new Date()
    });
    await noviEmail.save();
    res.send('Prihvaceno!');
});

router.delete('/:id', authMiddleware, async (req, res) => {
    await Email.deleteOne({ id: req.params.id });
    res.send('Email je obrisan!');
});

module.exports = router;