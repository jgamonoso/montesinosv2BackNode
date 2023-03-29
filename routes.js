const express = require('express');
const router = express.Router();

const noticias = require('./v2/noticias');
const login = require('./v2/login');

router.use('/noticias', noticias);
router.use('/login', login);

module.exports = router;
