const mysql = require('mysql');
const { database } = require('./keys');//traigo la propiedad database
//modulo para convertir callbacks a promesas o async - await, util es un modulo de node por eso no hay que instalarlo, pero usamos destructuracion por que solo necesitamos la propiedad promisify
const {promisify} = require('util');

//(47:19)
const pool = mysql.createPool(database);//database tiene el nombre de la bd t asi se genera la conexion
//(48:36)
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('la conexion con la BD ha sido cerrada');
        }
        if (err.code === 'ER_COUNT_ERROR') {
            console.error(' la base de datos tiene muchas conexiones');
        }
        if(err.code === 'ECONNREFUSED'){
            console.error(' conexion de base de datos ha sido rechazada');
            
        }
    }
    if(connection) connection.release();
    console.log('base de datos conectada perros!');
    return;
    
})//este metodo se pone aca para no estar llamandolo a cada rato cuando se ejecute el codigo

pool.query = promisify(pool.query);//cada vez que vaya a hacer una consulta a la BD puedo usar promesas o async

module.exports=pool;