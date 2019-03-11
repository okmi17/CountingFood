const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool =require('../database');
const helpers = require('../lib/helpers');

passport.use('Login', new LocalStrategy({
    usernameField: 'User',
    passwordField: 'Contrasena',
    passReqToCallback: true,
  }, async (req, User, Contrasena, done) => {
    const rows = await pool.query('SELECT * FROM empleado WHERE IDENTIFICACION = ?', [User]);
    if (rows.length > 0) {
      const user = rows[0];
      const validPassword = await helpers.matchPassword(Contrasena, user.CONTRASENA);
      console.log(Contrasena);
      console.log(user.CONTRASENA);
      if (validPassword) {
        done(null, user, req.flash('success', 'Bienvenido ' + user.NOMBRE + " " + user.APELLIDO));
      } else {
        done(null, false, req.flash('mensaje', 'Contraseña Incorrecta.'));
      }
    } else {
      return done(null, false, req.flash('mensaje', 'El empleado no existe.'));
    }
  }));
 
/*passport.use('local', new LocalStrategy({
    usernameField: 'Identificacion',
    passwordField: 'Contrasena',
    passReqToCallback: true
}, async (req, Identificacion, Contrasena) => {
    const {
        Nombre,
        Apellido,
        FechadeNacimiento,
        Edad,
        Correo,
        SueldoBasico,
        Pensiones,
        Cesantias,
        EPS,
        Cargo,
        FechaIngreso
    } = req.body;

    var RegisterUser = {
        Identificacion,
        Nombre,
        Apellido,
        Edad,
        FechadeNacimiento,
        Correo,
        SueldoBasico,
        Contrasena,
        Pensiones,
        EPS,
        Cargo,
        FechaIngreso,
        Cesantias

    };
    RegisterUser.Contrasena = await helpers.encryptPassword(Contrasena);

    const resultado = await pool.query('INSERT INTO empleado set ?', [RegisterUser]);
    RegisterUser.Id = resultado.insertId;
    return done(null, RegisterUser);

}));
*/

passport.serializeUser((user, done) => {
    done(null, user.ID);
  });
  
  passport.deserializeUser(async (IdUser, done) => {
    const rows = await pool.query('SELECT * FROM empleado WHERE ID = ?', [IdUser]);
    done(null, rows[0]);
  });

