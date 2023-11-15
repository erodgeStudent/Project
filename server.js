const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.set('trust proxy', 1);

app
    .use(bodyParser.json())
    .use(session({
        cookie : {
            secure:true,
            maxAge:60000
            },
        // store: new RedisStore(),
        secret: "secret",
        saveUninitialized: true ,
        resave: false
    }))
    .use(passport.initialize())
    .use(passport.session())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
        );
        res.setHeader(
            'Access-Control-Allow-Methods', 
            'GET, POST, PUT, DELETE, OPTIONS, PATCH'
            );
        next();
    })
    .use(function(req, res, next) {
        if(!req.session){
            return next(new Error('Oh no'))
        }
        next();
    })

    .use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']}))
    .use(cors({ origin: '*'}))
    .use('/', require('./routes/index.js'));

    passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL
        },
        function(accessToken, refreshToken, profile, done) {
            //user.findOrCreate({ githubId: profile.id }, function (err, user) {
                return done(null, profile);

            // });
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });

//add two endpoints
app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out")});

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false}),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    });

mongodb.initDb((err) =>{
    if(err) {
        console.log(err);
    } else {
        app.listen(port, () => {
        console.log(`Database is listening at http://localhost:${port}`);
    });
    }
});
