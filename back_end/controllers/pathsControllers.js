const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');


const routeDataPath = path.join(__dirname, '../database/route_data.json');

const Getroutestatus = ( req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(routeDataPath, 'utf8'));
        const randomRoute = data[Math.floor(Math.random() * data.length)];
        res.status(200).json(randomRoute);
      } catch (error) {
        console.error('Erro ao obter rota aleatória:', error);
        res.status(500).json({ error: 'Erro ao processar a requisição' });
      }
}


module.exports = {Getroutestatus};
