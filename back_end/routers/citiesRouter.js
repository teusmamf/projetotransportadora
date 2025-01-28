const express = require('express');
const {
    readOrigincity,
    readDestinyCity
} = require('../controllers/cities');

const router = express.Router();

router.get('/get_origin_city', readOrigincity);
router.get('/get_all_destiny_cities',readDestinyCity)



module.exports = router;