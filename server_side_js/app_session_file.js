const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);//./sessions에 저장
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    secret: '1234qwer!@#$',
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
}));

app.get('/count', (req, res) => {
    if (req.session.count) {
        req.session.count++;
    } else {
        req.session.count = 1;
    }
    res.send('count : '+req.session.count);
});

app.get('/auth/logout', (req, res) => {
    delete req.session.displayName;
    res.redirect('/auth/login');
});

app.get('/welcome', (req, res) => {
    if (req.session.displayName) {
        res.send(`
        <h1>Hello, ${req.session.displayName}</h1>
        <a href="/auth/logout">logout</a>
        `);
    } else {
        res.send(`
        <h1>Welcome</h1>
        <a href="/auth/logout">logout</a>
        `);
    }
});

app.post('/auth/login', (req, res) => {
    var user = {
        username:'me',
        password: '111',
        displayName: 'UBB'
    };//실제로는 DB에서 가져온 값
    var uname = req.body.username;
    var pwd = req.body.password;

    if (uname === user.username && pwd === user.password) {
        req.session.displayName = user.displayName;
        res.redirect('/welcome');
    } else {
        res.send('Who are you? <a href="/auth/login">login</a>');
    }

});

app.get('/auth/login', (req, res) => {
    var output = `
    <h1>login</h1>
    <form action="/auth/login" method="post">
        <p>
            <input type="text" name="username" placeholder="username">
        </p>
        <p>
            <input type="password" name="password" placeholder="password">
        </p>
        <p>
            <input type="submit">
        </p>
    </form>
    `;
    res.send(output);
});

app.listen(3000, () => {
    console.log('Connected 3000 port!');
});