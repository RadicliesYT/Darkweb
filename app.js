const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({ secret: 'your-secret', resave: true, saveUninitialized: true }));

mongoose.connect('mongodb+srv://Ananmay125:pma4got0f9XBkPof@darkweb.9zwo3qf.mongodb.net/?retryWrites=true&w=majority&appName=DarkWeb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const User = mongoose.model('User', new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}));

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

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/register.html');
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await User.create({ username, password: hashedPassword });
        req.session.userId = user._id;
        res.redirect('/login');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering user');
    }
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && await bcrypt.compare(password, user.password)) {
        req.session.userId = user._id;
        res.redirect('/index');
    } else {
        res.redirect('/login');
    }
});

app.get('/index', (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/login');
    }
    res.sendFile(__dirname + '/index.html');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
