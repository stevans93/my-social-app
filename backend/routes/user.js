const { Router } = require('express');
const verifyToken = require('../midleweare/verifyToken');
const router = new Router();

router.get('/', require('../controller/userController/getAllUsers'));

router.post('/add', require('../controller/userController/addUser'));

router.put('/update/:id', verifyToken, require('../controller/userController/updateUser'));

module.exports = router;