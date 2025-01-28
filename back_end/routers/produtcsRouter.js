const express = require('express');
const {
 readProduto
} = require('../controllers/produto');



const router = express.Router();



router.get('/get_all_proucts', readProduto);



module.exports = router;