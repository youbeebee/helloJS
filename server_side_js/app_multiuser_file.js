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
        <ul>
            <li><a href="/auth/login">Login</a></li>
            <li><a href="/auth/register">Register</a></li>
        </ul>
        `);
    }
});

app.post('/auth/login', (req, res) => {
    var uname = req.body.username;
    var pwd = req.body.password;

    for (var i = 0; i < users.length; i++) {
        var user = users[i];
        if (uname === user.username && pwd === user.password) {
            req.session.displayName = user.displayName;
            return req.session.save(() => {
                res.redirect('/welcome');
            });
        }
    }
    res.send('Who are you? <a href="/auth/login">login</a>');
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

var users = [
    {
        username:'me',
        password: '111',
        displayName: 'UBB'
    }
];//실제로는 DB에서 가져온 값

app.post('/auth/register', (req, res) => {
    var user = {
        username: req.body.username,
        password: req.body.password,
        displayName: req.body.displayName
    };//실제로는 DB에서 가져온 값
    users.push(user);
    req.session.displayName = req.body.displayName;
    req.session.save(() => {
        res.redirect('/welcome');
    });
});

app.get('/auth/register', (req, res) => {
    var output = `
    <h1>Register</h1>
    <form action="/auth/register" method="post">
        <p>
            <input type="text" name="username" placeholder="username">
        </p>
        <p>
            <input type="password" name="password" placeholder="password">
        </p>
        <p>
            <input type="text" name="displayName" placeholder="displayName">
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