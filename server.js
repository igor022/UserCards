const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const port = process.env.PORT || 3000;


const app = express();
app.use(favicon(__dirname + '/build/favicon.ico'));

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));  

 //простой тест сервера
app.get('/ping', (req, res) => {
    return res.send('pong');
});


app.get('/*', (req, res) => {
    res.sendFile('./public/index.html');
})

app.listen(port);