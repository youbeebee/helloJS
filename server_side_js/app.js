//Express JS 사용
const express = require('express');
var app = express();
app.get('/', (req, res) => {
    res.send('Hello homepage');
}); //GET 방식으로 homepage에 접속한 경우
app.get('/login', (req, res) => {
    res.send('Login please');
}); //GET 방식으로 ./login에 접속한 경우
app.listen(3000, () => {
    console.log('Connect 3000 port!');
});
//http://localhost:3000 으로 접속