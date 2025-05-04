const express = require('express');
const router = express.Router();
const errorController = require('../controllers/errorController');

router.get('/', errorController.getAllErrors);
router.put('/:id', errorController.updateErrors);


module.exports = router; 