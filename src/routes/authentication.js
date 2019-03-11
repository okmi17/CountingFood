const express = require('express');
const router = express.Router();

const passport = require('passport');
//const { isLoggedIn } = require('../lib/auth');


router.get('/Login', (req, res) => {
    res.render('links/Login');
});

router.get('/CreateUser', (req, res) => {
    res.render('links/CreateUser');
});

router.post('/CreateUser', passport.authenticate('local', {
    successRedirect: '/Login',
    failureRedirect: '/CreateUser',
    failureFlash: true
}));


router.post('/Login', (req, res, next) => {
    /*req.check('Identificacion', 'Username is Required').notEmpty();
    req.check('Contrasena', 'Password is Required').notEmpty();
    const errors = req.validationErrors();
    if (errors.length > 0) {
        req.flash('message', errors[0].msg);
        res.redirect('/Login');
    }*/
    passport.authenticate('Login', {
        successRedirect: '/menuPrincipal',
        failureRedirect: '/Login',
        failureFlash: true
    })(req, res, next);
});

module.exports = router;