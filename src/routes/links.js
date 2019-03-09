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

router.get('/ListEmployees',async (req,res) => {
    const empleados =  await pool.query('SELECT * FROM empleado');
    res.render("links/ListEmployees",{empleados: empleados}); 
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
router.post('/ListEmployees', async (req,res)=>{
    const Hola = req.params.id;

});


router.post('/CreateUser', async (req,res)=>{
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
    res.redirect('CreateUser');
  
});


router.get('/Delete/:IDENTIFICACION', async(req,res)=>{
    const {IDENTIFICACION} = req.params;
    pool.query('DELETE FROM empleado WHERE IDENTIFICACION = ?',[IDENTIFICACION]);
    res.redirect('/links/ListEmployees');

});

router.get('/Edit/:IDENTIFICACION', async(req,res)=>{
    const {IDENTIFICACION} = req.params;
    const data = await pool.query('SELECT * FROM empleado WHERE IDENTIFICACION = ?',[IDENTIFICACION]);
    console.log(data);
    res.render('links/EditUser',{data:data[0]});
});

router.post('/edit/:id', async (req,res)=>{
    const {IDENTIFICACION} = req.params;
    const {   
                Correo,
                SueldoBasico,
                Pensiones,
                Cesantias,
                EPS,
                Cargo,
            } = req.body;
    const RegisterUser = 
    {
        Correo,
        SueldoBasico,
        Pensiones,
        EPS,
        Cargo,
        Cesantias

    };
    pool.query('UPDATE empleado set ? WHERE IDENTIFICACION = ?',[RegisterUser,IDENTIFICACION]);
    res.redirect('/links/ListEmployees');
  
});

module.exports = router;
