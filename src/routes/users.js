let fs = require('fs')
let express = require('express');
let router = express.Router();
let userController = require('../controllers/usersController')

let multer = require('multer');
let path = require('path')
let rutasMiddleware = require('../middlewares/rutasMiddleware')
let { check, validationResult, body } = require('express-validator');
const authMiddleware = require('../middlewares/authMiddleware');

//base de datos
const usersJson = path.join(__dirname, '../data/usersDataBase.json');
const arrayUsers = JSON.parse(fs.readFileSync(usersJson, 'utf-8') || "[]");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

var upload = multer({ storage: storage })


/* User register */
router.get('/register', userController.register);
router.post('/register', rutasMiddleware, upload.any(), [
    /*no lo toma*/check('nombre').isLength().withMessage('Este campo debe estar completo'),//withMessage para dar un msj

  check('contraseña').isLength({ min: 3 }).withMessage('La contraseña debe tener almenos 3  caracteres'),
  check('email').isEmail().withMessage('El email debe ser un mail valido'),
  /*body('email').custom(function(value){// para verificar que el email no esta en nuestra base de datos osea en esta ocacion en el json
   arrayUsers.forEach(user => {
      let validacion= user.email== value
     if(validacion==true){
        return false
     }
     
     
     })
     console.log(validacion);
    return true
    
    
  }).withMessage('Usuario ya existente')*/

],
  userController.store);

/* Log In */
router.get('/login', userController.login);

router.post('/login', [
  check('email')
    .isEmail().withMessage('Debe escribir un mail valido')
    .trim()//para espacios
    .not().isEmpty().withMessage('El campo no puede estar vacio'),
  check('password', 'La pass debe contener un minimo de 3 caracteres')
    .isLength({ min: 3 })
], userController.processLogin);

//router.post('/auth',userController.auth)

/* User Profile */
router.get('/profile/:id', authMiddleware, userController.profile)
router.post('/logout',userController.logout)





/*****PRUEBAS*****/

router.get('/pruebaSession',function (req,res){
  if(req.session.numeroVisitas==undefined){
    req.session.numeroVisitas=0
  }
  req.session.numeroVisitas++;
  res.send('Session tiene el numero '+ req.session.numeroVisitas)
})
router.get('/mostrarNumeroSession',function (req,res){
  res.send ('Session tiene el numero:'+ req.session.numeroVisitas)
  
})
router.get('/check',userController.check)
router.get('/sesion',userController.sesion)


module.exports = router;


// Faltaria emprolijar y dar efecto con css  todo funciona a la perfeccion 