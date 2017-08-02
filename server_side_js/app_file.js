const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const multer = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({storage: storage});
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use('/user', express.static('uploads'));
app.set('views', './views_file');
app.set('view engine', 'jade');
app.locals.pretty = true;

app.get('/upload', (req, res) => {
    res.render('upload');
});

app.post('/upload', upload.single('userfile'), (req, res) => {
    //multer에서 req 객체에 file 프로퍼티를 추가해줌
    console.log(req.file);
    res.send('Uploaded: '+req.file.filename);
});

app.get('/topic/new', (req, res) => {
    fs.readdir('data', (err, files) => {
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.render('new', {topics: files});
    });
});

app.get(['/topic', '/topic/:id'], (req, res) => {
    fs.readdir('data', (err, files) => {
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        var id = req.params.id;
        if(id){ //id 값이 있을 때
            fs.readFile('data/'+id, 'utf8', (err, data) => {
                if(err){
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }
                res.render('view', {topics: files, title: id, description: data});
            });
        } else { //id 값이 없을 때
            res.render('view', {topics: files, title: 'Welcome',
                                description: 'Hello, JS for server'});
        }
    });
});

app.post('/topic', (req, res) => {
    var title = req.body.title;
    var description = req.body.description;
    fs.writeFile('data/'+title, description, (err) => {
        if(err){
            res.status(500).send('Internal Server Error');
            console.log(err);
        }
        res.redirect('/topic/'+title);
    });
});

app.listen(3000, () => {
    console.log('Connected, 3000 port!');
});
