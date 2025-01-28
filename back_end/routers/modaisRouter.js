const express = require('express');
const {
 getAllmodals
} = require('../controllers/modal');



const router = express.Router();



router.get('/get_all_modals', getAllmodals);



module.exports = router;