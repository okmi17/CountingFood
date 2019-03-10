const express = require('express');
const router = express.Router();

//defino una ruta
router.get('/',(req,res)=>{
    res.send('Ok');//recuerde usar las rutas en el index principal
})








module.exports= router;//exporto la variable router para utilizarlo en otros archivos de la app