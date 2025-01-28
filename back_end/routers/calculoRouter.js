const express = require('express');
const {
    calculateRoute
} = require('../controllers/calculo');

const router = express.Router();

router.post('/calcular_risco', calculateRoute);




module.exports = router;