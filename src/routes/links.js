const express = require('express');
const router = express.Router();

//pool hace referencia a la conexion a la bd
const pool = require('../database');
const {
    isLoggedIn
} = require('../lib/auth');
const helpers = require('../lib/helpers');




router.get('/ListEmployees', isLoggedIn, async (req, res) => {
    const empleados = await pool.query('SELECT * FROM empleado');
    res.render("links/ListEmployees", {
        empleados: empleados
    });
});


router.get('/Maintenance', isLoggedIn, async (req, res) => {
    res.render("links/Maintenance");
});


router.post('/ListEmployees', async (req, res) => {
    const Hola = req.params.id;

});


router.get('/Delete/:IDENTIFICACION', isLoggedIn, async (req, res) => {
    const {
        IDENTIFICACION
    } = req.params;
    pool.query('DELETE FROM empleado WHERE IDENTIFICACION = ?', [IDENTIFICACION]);
    res.redirect('/links/ListEmployees');

});

router.get('/Edit/:IDENTIFICACION', isLoggedIn, async (req, res) => {
    const {
        IDENTIFICACION
    } = req.params;
    const data = await pool.query('SELECT * FROM empleado WHERE IDENTIFICACION = ?', [IDENTIFICACION]);
    console.log(data);
    res.render('links/EditUser', {
        data: data[0]
    });
});

router.post('/Edit/:IDENTIFICACION', async (req, res) => {
    const {
        IDENTIFICACION
    } = req.params;
    const {
        CORREO,
        SUELDOBASICO,
        PENSIONES,
        CESANTIAS,
        EPS,
        CARGO,
    } = req.body;
    const RegisterUser = {
        CORREO,
        SUELDOBASICO,
        PENSIONES,
        EPS,
        CARGO,
        CESANTIAS

    };
    console.log(RegisterUser);
    pool.query('UPDATE empleado set ? WHERE IDENTIFICACION = ?', [RegisterUser, IDENTIFICACION]);
    res.redirect('/links/ListEmployees');

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
    RegisterUser.Contrasena = await helpers.encryptPassword(Contrasena);
    await pool.query('INSERT INTO empleado set ?',[RegisterUser]);
    res.redirect('CreateUser');
  
});

router.get('/inventario', isLoggedIn, async (req, res) => {
    const productos = await pool.query('SELECT * FROM PRODUCTO');
    // console.log(productos);

    res.render('links/inventario', {
        productos
    });

});


router.get('/CreateUser', isLoggedIn, (req, res) => {
    res.render('links/CreateUser');
});

router.post('/inventario', async (req, res) => {

    console.log(req.body);
    const {
        busquedaProducto
    } = req.body;
    const productos = await pool.query('SELECT * FROM PRODUCTO  WHERE  NOMBREPRODUCTO = ?', [busquedaProducto])
    console.log(productos);

    res.render('links/inventario', {
        productos
    });

});
//------------------------------------------------------------------------------
router.post('/buscarTipo', async (req, res) => {

    console.log(req.body);
    const {
        opciones
    } = req.body;
    const tipoProductos = await pool.query('SELECT * FROM PRODUCTO  WHERE  TIPOPRODUCTO = ?', [opciones])
    console.log(tipoProductos);

    res.render('links/inventario', {
        tipoProductos
    });

});


//------------------------------------------------------------------------------
//para cuando el navegador pida una peticion get al servidor
router.get('/agregarProducto', isLoggedIn, (req, res) => { //add
    res.render('links/agregarProducto');
});

router.get('/menuPrincipal', isLoggedIn, (req, res) => { //add
    res.render('links/menuPrincipal');
});
router.post('/agregarProducto', isLoggedIn, async (req, res) => {
    //req.body me dice que datos esta recibiendo el servidor
    //console.log(req.body);
    const {
        NOMBREPRODUCTO,
        TIPOPRODUCTO,
        DESCRIPCIONPRODUCTO,
        COSTO,
        CANTIDADINVENTARIO,
        CANTIDADPORCION
    } = req.body
    const nuevoProducto = {
        //idProducto,
        NOMBREPRODUCTO,
        TIPOPRODUCTO,
        DESCRIPCIONPRODUCTO,
        CANTIDADINVENTARIO,
        COSTO,
        CANTIDADPORCION

    }
    //console.log(nuevoProducto);
    let productoAIngresar = await pool.query('SELECT * FROM PRODUCTO  WHERE  NOMBREPRODUCTO = ?', [NOMBREPRODUCTO])
    console.log('hola ', productoAIngresar[0]);
    if (productoAIngresar[0] !== undefined) {
        if (nuevoProducto.NOMBREPRODUCTO === productoAIngresar[0].NOMBREPRODUCTO) {
            req.flash('mensaje', 'El producto no se agrego por que ya esta en la base de datos');
            res.redirect('inventario')

        }
    } else {
        //el signo de ? significa que me va a pasar el dato a agregar a continuacion
        await pool.query('INSERT INTO PRODUCTO set ? ', [nuevoProducto]);
        req.flash('mensaje', 'El producto se agrego correctamente a la base de datos');
        //res.send('recibido perro')
        res.redirect('agregarProducto')
    }

})
router.get('/delete/:id', isLoggedIn, async (req, res) => {
    const id = req.params
    //console.log(req.params.IDPRODUCTO);
    await pool.query('DELETE FROM PRODUCTO WHERE IDPRODUCTO = ?', [id.id])
    console.log(req.params);
    req.flash('mensaje', 'El producto se elimino satisfactoriamente');
    res.redirect('/links/inventario')
})
//para ir a agregar producto desde inventario
router.get('/agregar', isLoggedIn, (req, res) => {
    res.redirect('agregarProducto')
})
// de agregar producto a inventario desde el nav
router.get('/navInventario', isLoggedIn, (req, res) => {
    res.redirect('inventario')
})
router.get('/navMenuPrincipal', isLoggedIn, (req, res) => {
    res.redirect('menuPrincipal')
})
router.get('/menuPrincipalInventario', isLoggedIn, (req, res) => {
    res.redirect('inventario')
})
router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const id = req.params;
    const producto = await pool.query('SELECT * FROM PRODUCTO WHERE IDPRODUCTO =?', [id.id])
    // console.log(id);
    console.log(producto[0]);

    res.render('links/edit', {
        producto: producto[0]
    })
})
router.post('/edit/:id', async (req, res) => {
    const id = req.params;
    const {
        NOMBREPRODUCTO,
        TIPOPRODUCTO,
        DESCRIPCIONPRODUCTO,
        COSTO,
        CANTIDADINVENTARIO,
        CANTIDADPORCION
    } = req.body;
    const newProducto = {
        NOMBREPRODUCTO,
        TIPOPRODUCTO,
        DESCRIPCIONPRODUCTO,
        COSTO,
        CANTIDADINVENTARIO,
        CANTIDADPORCION
    }
    await pool.query('UPDATE PRODUCTO SET ? WHERE IDPRODUCTO = ?', [newProducto, id.id])
    req.flash('mensaje', 'El producto se edito satisfactoriamente');
    res.redirect('/links/inventario')
})

module.exports = router;