const express = require('express');
const router= express.Router();

//pool hace referencia a la conexion a la bd
const pool = require('../database');

router.get('/Login',(req,res)=>{
    res.render('links/Login');
});
    
router.post('/Login', async (req,res)=>{
    const {User, Password} = req.body;
    const LoginUser = {
        User,
        Password
    };
    await pool.query('INSERT INTO Usuario set ?',[LoginUser]);
    res.send('reiceved');   
});

module.exports = router;
