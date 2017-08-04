const express = require('express');
const app = express();

var p1 = require('./routes/p1')(app);
app.use('/p1', p1); //p1으로 들어오는 접속은 router로 위임한다.

var p2 = require('./routes/p2')(app);
app.use('/p2', p2);

app.listen(3000, () => {
    console.log('Connected 3000 port!');
});