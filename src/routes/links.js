const express = require('express');
const router= express.Router();

//pool hace referencia a la conexion a la bd
const pool = require('../database');

router.get('/Login',(req,res)=>{
    res.render('links/Login');
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
/*Toca arreglar esto*/
module.exports = router;
