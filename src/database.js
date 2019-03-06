const mysql = require('mysql');
const { database } = require('./keys');//traigo la propiedad database

//(47:19)
const pool = mysql.createPool(database);//database tiene el nombre de la bd t asi se genera la conexion