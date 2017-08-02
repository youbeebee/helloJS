//Express JS 사용
const express = require('express');
var app = express();

//템플릿 엔진으로 jade를 사용
app.locals.pretty = true; //결과 html에 줄바꿈 적용시킴,
app.set('view engine', 'jade');
app.set('views', './views');

//public 폴더 밑에 static파일을 넣음. http://localhost:3000/sierra.jpg 로 확인
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('<h1>Hello homepage</h1>');
}); //GET 방식으로 homepage에 접속한 경우
app.get('/login', (req, res) => {
    res.send('Login please');
}); //GET 방식으로 ./login에 접속한 경우
app.get('/sierra', (req, res) => {
    res.send('Hello Seirra, <img src="/sierra.jpg" width="20%", height="20%">');
});
app.get('/dynamic', (req, res) => {
    var lis = ''
    for (var i = 0; i < 5; i++) {
        lis = lis + '<li>coding</li>\n';
    }
    var time = Date();
    var output = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8"/>
    </head>
    <body>
        <p>Hello, dynamic!</p>
        <ul>${lis}</ul>
        ${time}
    </body>
    </html>`;//줄바꿈이 포함된 문자열을 사용할 수 있는 표준. 내부에선 ${}로 변수를 나타낼수 있음
    res.send(output);
});
//Jade로 템플릿 사용
app.get('/template', (req, res) => {
    res.render('temp', {title:'Jade', time:Date()}); //views/temp.jade
});
//query string
app.get('/topic', (req, res) => {
  var topics = [
    'Javascript is....',
    'Nodejs is...',
    'Express is...'
  ];
  var output = `
  <a href="/topic?id=0">JavaScript</a><br>
  <a href="/topic?id=1">Nodejs</a><br>
  <a href="/topic?id=2">Express</a><br><br>
  ${topics[req.query.id]}
  `
  res.send(output);
});
app.get('/topic/:id/:mode', (req, res) => {
    res.send(req.params.id+','+req.params.mode)
});

app.listen(3000, () => {
    console.log('Connect 3000 port!');
});

// 실습 키워드 $> node app.js
//http://localhost:3000 으로 접속
//http://localhost:3000/login
//http://localhost:3000/static.html //정적인 페이지
//http://localhost:3000/dynamic     //동적인 페이지
//http://localhost:3000/template    //jade를 사용한 템플릿 페이지
//http://localhost:3000/topic?id=0
//http://localhost:3000/topic/1/edit
