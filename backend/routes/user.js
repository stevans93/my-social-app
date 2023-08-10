const { Router } = require('express');
const verifyToken = require('../midleweare/verifyToken');
const router = new Router();

/**** GET ****/
router.get('/', require('../controller/userController/getAllUsers'));

/**** POST ****/
router.post('/add', require('../controller/userController/addUser'));

/**** PUT ****/
router.put('/update/:id', verifyToken, require('../controller/userController/updateUser'));

/**** DELETE ****/

module.exports = router;