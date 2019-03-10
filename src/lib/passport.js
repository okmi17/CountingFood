const passport= require('passport');
const Strategy = require('passport-local').Strategy;
passport.use('local', new Strategy({
usernameField:'IDENTIFICACION',
 passwordField:'CONTRASENA',
 passReqToCallback:true
},async(req,IDENTIFICACION,CONTRASENA,done)=>{
    console.log(req.body);
}));

passport.serializeUser((usr,done)=>{

});