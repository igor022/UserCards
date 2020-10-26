const express = require('express');
const port = process.env.REACT_APP_PORT || 3000;

console.log(port);
console.log(__dirname);

const app = express();

app.use(express.static('public'));  

app.get('/*', (req, res) => {
    res.sendFile('./public/index.html');
})

app.listen(port);