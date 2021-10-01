let Post = require('../models/posts').Post;
let uniqid = require('uniqid');
let express = require('express');
let router = express.Router();
let authMiddleware = require('../middleware/auth');

router.get('/', async (req, res) => {
    let posts = await Post.find();
    res.send(posts);
});
router.get('/:id', async (req, res) => {
    let id = req.params.id;
    let post = await Post.findOne({ id: id });
    res.send(post);
});
//kada se napravi zahtev na /posts server mora da preuzme sve podatke i posalje ih bazi
router.post('/', authMiddleware, async (req, res) => {
    let reqBody = req.body;
    let slikaPutanja;
    if (reqBody.slikaURL) {
        slikaPutanja = reqBody.slikaURL;
    } else {
        slikaPutanja = req.file.path.substring(req.file.path.indexOf('\\'), req.file.path.length);
    }
    let noviPost = new Post({
        id: uniqid(),
        naslov: reqBody.naslov,
        datum: new Date(),
        opis: reqBody.opis,
        tekst: reqBody.tekst,
        grad: reqBody.grad,
        slikaURL: slikaPutanja
    });
    await noviPost.save();
    res.send('Kreiran post!');
})

router.delete('/:id', authMiddleware, async (req, res) => {
    let id = req.params.id;
    await Post.deleteOne({ id: id });
    res.send('Obrisan post!');
})
router.put('/:id', authMiddleware, async (req, res) => {
    let id = req.params.id;
    await Post.updateOne({ id: id }, req.body);
    res.send('Izmenjen post!');
})

module.exports = router;