let express = require('express');
let app = express();
let mongoose = require('mongoose');
let multer = require('multer');
let cookieParser = require('cookie-parser');
let postsRouter = require('./routes/posts');
let poziviRouter = require('./routes/pozivi');
let emailsRouter = require('./routes/emails');
let korisniciRouter = require('./routes/korisnici');
let Post = require('./models/posts').Post;
let auth = require('./controllers/auth');

app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/blogs', { useNewUrlParser: true });
app.use(express.json()); //podaci se salju u json formatu zato ih i pretveramo ovde u json format

let imageStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public\\images'),
    filename: (req, file, cb) => cb(null, file.originalname)
})

app.use(multer({ storage: imageStorage }).single('slikaFajl'));
app.use(express.static('public'));
app.use(cookieParser()); //za citanje kolacica
app.use('/posts', postsRouter);
app.use('/pozivi', poziviRouter);
app.use('/emails', emailsRouter);
app.use('/korisnici', korisniciRouter);

app.get('/sight', async (req, res) => {
    let id = req.query.id;
    let post = await Post.findOne({ id: id });
    res.render('sight', {
        naslov: post.naslov,
        slikaURL: post.slikaURL,
        datum: post.datum,
        tekst: post.tekst
    });
});

app.get('/admin', (req, res) => {
    let token = req.cookies['auth_token']; //cita kolacic
    if (token && auth.checkToken(token)) {
        res.render('admin');
    } else {
        res.redirect('/login');
    }
});

app.get('/login', (req, res) => {
    res.render('login');
})

app.get('/aboutUs', function (req, res) {
    res.render('aboutUs');
})

app.listen(3000, () => console.log('Listening port 3000'));
