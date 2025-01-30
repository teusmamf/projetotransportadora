const express = require('express');
const {
    Getroutestatus
} = require('../controllers/pathsControllers');


const router = express.Router();

router.get('/get_route_status', Getroutestatus);


module.exports = router;