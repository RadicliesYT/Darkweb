const express = require('express');
const app = express();
const PORT = 3000;
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const {connect, Schema, model} = require("mongoose");

connect('mongodb+srv://Ananmay125:pma4got0f9XBkPof@darkweb.9zwo3qf.mongodb.net/?retryWrites=true&w=majority&appName=DarkWeb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Error connecting to MongoDB Atlas:', err));

const userSchema = new Schema({
    username: { type: String, unique: true },
    password: String
});

const User = model('User', userSchema);

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/register.html');
});

app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            username: req.body.username,
            password: hashedPassword
        });
        await newUser.save();
        res.redirect('/login');
    } catch {
        res.redirect('/');
    }
});

app.post('/login', async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.sendFile(__dirname + '/index.html');
        } else {
            res.sendFile(__dirname + '/index.html');
        }
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});

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
