const express = require('express');
const PORT = process.env.PORT || 8080;
const body_parser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const DOMParser = require('xmldom').DOMParser;
const axios = require('axios');
//const xml2json = require('xml2json');
//Controllers
const auth_controller = require('./controllers/auth_controller');
const list_controller = require('./controllers/list_controller');

//const espn = 'https://www.espn.com/nfl/playbyplay?gameId=401220225';, https://static.nfl.com/ajax/scorestrip?season=2020&seasonType=REG&week=3
let app = express();

 




app.use(body_parser.urlencoded({
    extended: true
}));

app.use(session({
    secret: '1234qwerty',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000000
    }
}));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

const is_logged_handler = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
};

//Serve Static files
app.use('/css', express.static('css'))

//Auth
app.use(auth_controller.handle_user);
app.get('/login', auth_controller.get_login);
app.post('/login', auth_controller.post_login);
app.post('/register', auth_controller.post_register);
app.post('/logout', auth_controller.post_logout);



//NFL
//app.get('/', is_logged_handler, list_controller.get_weeks);
app.post('/add-weeks', is_logged_handler, list_controller.post_weeks);
app.post('/games', is_logged_handler, list_controller.post_games);
app.get('/week/:id', is_logged_handler, list_controller.get_week);
app.get('/', is_logged_handler, list_controller.get_weeks);
app.post('/submit-pick', is_logged_handler, list_controller.post_pick);
app.post('/update-games', is_logged_handler, list_controller.post_update_games);
app.post('/update-pick', is_logged_handler, list_controller.post_update_pick);
app.get('/leaderboard', is_logged_handler, list_controller.get_board);
//app.get('/week/:id', is_logged_handler, list_controller.get_picks);


app.use((req, res, next) => {
    res.status(404);
    res.send(`
        page not found
    `);
});

//Shutdown server CTRL + C in terminal

const mongoose_url = 'mongodb+srv://server:CyWNK4XRuoTB2KP9@cluster0.yg28i.mongodb.net/harkka-NFL?retryWrites=true&w=majority';
//const mongoose_url = 'mongodb+srv://user_01:PtTYDQWffX8Dd2i3@cluster0-iihta.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(mongoose_url, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true
}).then(() => {
    console.log('Mongoose connected');
    console.log('Start Express server');
    
    app.listen(PORT);
});
