const express = require('express');
const router= express.Router();

//pool hace referencia a la conexion a la bd
const pool = require('../database');

router.get('/Login',(req,res)=>{
    res.render('links/Login');
});

router.get('/CreateUser',(req,res)=>{
    res.render('links/CreateUser');
});



router.post('/Login', async (req,res)=>{
    const {IDENTIFICACION, CARGO} = req.body;
    const LoginUser = {
        IDENTIFICACION,
        CARGO
    };
    await pool.query('INSERT INTO EMPLEADO set ?',[LoginUser]);
    res.send('reiceved');   
});

router.post('/CreateUser', async (req,res)=>{
    console.log(req.body);
    const {   
                Identificacion,
                Contrasena, 
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
    const RegisterUser = 
    {
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
    await pool.query('INSERT INTO empleado set ?',[RegisterUser]);
    res.send('reiceved');   
});

router.get('/ListEmployees',async (req,res) => {
    const empleados =  await pool.query('SELECT * FROM empleado');
    console.log(empleados); 
    res.render("links/ListEmployees",{empleados: empleados}); 
});
module.exports = router;
