const express = require('express');
const router = express.Router();
const controller = require('../controllers/users');

router.post('/', controller.create)

router.get('/:id', controller.index);

router.get('/', controller.list);

router.put('/:id', controller.replace);

router.patch('/:id', controller.update);

router.delete('/:id', controller.destroy);

module.exports = router;

















