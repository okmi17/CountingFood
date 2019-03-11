//se llama express
const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
//este modulo sera para poder configurar el engine de handlebars  y decir donde va a estar la carpeta de layouts 
const path = require('path');
const flash = require('connect-flash');//este modulo nos permite enviar mensajes a diferentes vistas y es un midleware
const session = require('express-session');//este modulo es indispensable para usar connect-flash, la session te almacena los datos en el servidor aunque tambien se puede hacer en la BD
const MySQLStore = require('express-mysql-session');//para usar flash y para usar la sesion de express-session, asi podremos guardar la sesion en la BD
const { database } = require('./keys');
const passport = require('passport');
//inicializacion
const app = express();//app contiene a express cuando este se ejecuta
require('./lib/passport');

//settings
//en que puerto va a funcionar el server, puede que funcione en un puerto del SO o el que indique el 4000, 'port' es el nombre que se le da al puerto 
app.set('port', process.env.PORT || 4000);
//aqui le decimos a node donde va a estar la carpeta views, la constante de node __dirname devuelve la direccion del archivo que se esta ejecutando en este caso me devuelve la direccion de la carpéta src
app.set('views', path.join(__dirname, 'views'));//esta linea simplemente le dice a node donde esta la carpeta views, el nombre 'views es el nombre e la direccion que pongo en el segundo argumento
//configuracion de handlebars
//(primer parametro es el nombre del engine)
app.engine('.hbs', exphbs({
    defaultLayout: 'main',//donde estara el archivo principal de html
    //el metodo join() une directorios
    layoutsDir: path.join(app.get('views'), 'layouts'),//asi configuro que layouts esta dentro de views
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',//que extension tendran mis archivos handlebars
    helpers: require('./lib/handlebars')
}))
//utilizamos handlebars
app.set('view engine', '.hbs');

//middlewares: son funciones que se ejecutan cada vez que un usuario envia una peticion al server, 
//(1:59:22)
app.use(session({
    secret:'sesionDelFlash',
    resave:false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}))
//(1:54:00)
app.use(flash())
//un middleware es el viejo morgan
app.use(morgan('dev'))//el argumento 'dev' es para que muestre un determinado tipo de mensajes por consola
app.use(express.urlencoded({extended:false}))//sirve para poder aceptar los datos que me envien los usuarios, el extended :false sirve para indicar que solo voy a aceptar datos sencillos como cadenas de texto y asi que no voy a aceptar imagenes
app.use(express.json())//mas adelante se puede quitar esta linea de codigo
app.use(passport.initialize());
app.use(passport.session());



//variables globales
app.use((req, res,next)=>{
    app.locals.mensaje = req.flash('mensaje');
    next();//toma la peticion del usuario despues la devolucion del server y despues se sigue ejecutando el resto del codigo 
})

//Routes
app.use(require('./routes/index.js'));//la ruta se puede dejar asi tambien: ./routes, ya que node siempre busca los archivos que se llaman index.js si el archivo tiene otro nombre ahi si se pone como esta arriba
app.use(require('./routes/authentication.js'));
app.use('/links',require('./routes/links.js'));//el primer argumento es un prefijo el cual se va a utilizar de primero en la mayoria de enlaces 

//archivos publicos (Public)
//(30:25)
app.use(express.static(path.join(__dirname, 'public')))//especifica donde esta la carpeta public

//Starting the Server
app.listen(app.get('port'), () => {
    console.log('servidor en el puerto', app.get('port'));
});
//(53:30) donde quede