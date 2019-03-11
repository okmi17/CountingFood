const express = require('express');
const router = express.Router();

const passport = require('passport');
const {
    isLoggedIn
} = require('../lib/auth');


router.get('/Login', (req, res) => {
    res.render('links/Login');
});

router.get('/CreateUser', isLoggedIn, (req, res) => {
    res.render('links/CreateUser');
});

router.post('/CreateUser', passport.authenticate('local', {
    successRedirect: '/Login',
    failureRedirect: '/CreateUser',
    failureFlash: true
}));


router.post('/Login', (req, res, next) => {
    passport.authenticate('Login', {
        successRedirect: 'links/menuPrincipal',
        failureRedirect: '/Login',
        failureFlash: true
    })(req, res, next);
});

router.get('/Logout', isLoggedIn, (req, res) => {
    req.logOut();
    res.redirect('/Login');
});
module.exports = router;