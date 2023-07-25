const { Router } = require('express');
const router = new Router();

router.post('/register', require('../controller/userController/register'));

module.exports = router;