var express = require('express');
var router = express.Router();
var authController = require('../controllers/authController');

router.post('/login' ,authController.login );
router.post('/register-user', authController.register);
router.post('/register-promoter', authController.verifyTokenAdmin, authController.register );
router.post('/register-admin', authController.verifyTokenAdmin, authController.register );
  
module.exports = router;