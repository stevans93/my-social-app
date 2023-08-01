const { Router } = require('express');
const router = new Router();

router.post('/register', require('../controller/authController/register'));
router.post('/login', require('../controller/authController/login'));

module.exports = router;