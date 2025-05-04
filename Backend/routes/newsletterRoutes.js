const express = require('express');
const router = express.Router();
const newsletterController = require('../controllers/newsletterController');

router.get('/', newsletterController.getAllNewsletter);
router.post('/', newsletterController.createNewsletter);
router.delete('/', newsletterController.deleteNewsletter);

module.exports = router;
