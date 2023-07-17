const { Router } = require('express');
const router = new Router();

router.get('/test', require('../controller/userController/getAllUsers'));
router.post('/test', require('../controller/userController/addUser'));

module.exports = router;