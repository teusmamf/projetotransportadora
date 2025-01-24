import express from 'express';
import citiesRouter from './routers/citiesRouter.js'




const app = express();


app.use(express.json());
app.use('/api_transportadora/cities', citiesRouter);

app.get('/health', (req,res)=> {
    res.json({status: 'API FUNCIONANDO COM SUCESSO'})
})

app.listen(3000, ()=> {
    console.log("API RODANDO NA PORTA 3000");
    
})
