const express = require('express');
const router = express.Router();
const userCtrl = require('../Controller/user');
const auth = require('../Midelware/auth');
const checker = require('../Midelware/checker');

router.post('/signup',checker, userCtrl.signup)
router.post('/login',checker,userCtrl.connectUser)
router.post('/delete',auth,userCtrl.deleteUser)
router.get('/testAuth',auth,userCtrl.authTest)
router.get('/',userCtrl.allUser)


module.exports = router;