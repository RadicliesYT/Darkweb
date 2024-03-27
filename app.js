const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.get('/index.html', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.get('/goku.html', (req, res) => {
    res.sendFile(__dirname + '/goku.html');
})

app.get('/info.html', (req, res) => {
    res.sendFile(__dirname + '/info.html');
})

app.get('/jakesoundeffects.html', (req, res) => {
    res.sendFile(__dirname + '/jakesoundeffects.html');
})

app.get('/new.html', (req, res) => {
    res.sendFile(__dirname + '/new.html');
})

app.get('/popular.html', (req, res) => {
    res.sendFile(__dirname + '/popular.html');
})

app.get('/spiderman.html', (req, res) => {
    res.sendFile(__dirname + '/spiderman.html');
})

app.listen(PORT, (error) =>{
        if(!error)
            console.log("Server is Successfully Running,and App is listening on port "+ PORT)
        else
            console.log("Error occurred, server can't start", error);
        }
);
