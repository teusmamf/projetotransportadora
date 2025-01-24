const express = require('express');
const {
    readOrigincity
} = require('../controllers/cities');

const router = express.Router();

router.get('/get_origin_city', readOrigincity);


module.exports = router;