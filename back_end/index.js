const express = require('express');
const cors = require('cors');
//import citiesRouter from './routers/citiesRouter.js'
const citiesRouter = require('./routers/citiesRouter.js');
const modalsRouter = require('./routers/modaisRouter.js');
const prductsRouter = require('./routers/produtcsRouter.js');
const calculoRouter = require('./routers/calculoRouter.js');
const pathsRouter = require('./routers/pathsRouter.js');


const app = express();
app.use(cors());

app.use(express.json());

console.log("Rotas cidades prontas.");

app.use('/api_transportadora/cities', citiesRouter);

console.log("Rotas modais prontas.");
app.use('/api_transportadora/modals', modalsRouter);

console.log("Rotas produtos prontas.");
app.use('/api_transportadora/products', prductsRouter);

console.log("Rotas calculo prontas.");
app.use('/api_transportadora/calculo', calculoRouter);

console.log("Rotas calculo prontas.");
app.use('/api_transportadora/rotas', pathsRouter);

app.get('/health', (req,res)=> {
    res.json({status: 'API FUNCIONANDO COM SUCESSO'})
})

app.listen(3000, ()=> {
    console.log("API RODANDO NA PORTA 3000");
    
})
