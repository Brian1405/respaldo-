var express = require('express');
var router = express.Router();
let userController=require ('../controllers/usersController')
var multer= require('multer');
var path=require('path')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname))
  }
})
 
var upload = multer({ storage: storage })


/* User register */
router.get('/register',userController.register);
router.post('/register',upload.any(),userController.store);

/* Log In */
router.get('/login',userController.login);
//router.post('/auth',userController.auth)

/* User Profile */
router.get('/profile',userController.profile)
module.exports = router;
