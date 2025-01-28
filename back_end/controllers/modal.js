const xlsx = require('xlsx');
const path = require('path');



const getAllmodals = ( req , res) => {
    try {
        try {
        
                const filePath = path.join(__dirname,'../database/consultarotas.xlsx');
                const workbook = xlsx.readFile(filePath);
                const sheetName = workbook.SheetNames.includes('Resultado') ? 'Resultado' : workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const data = xlsx.utils.sheet_to_json(sheet);
        
                const Modais = data.map(row => row['Qtde_Eixo']);
                res.status(200).json({Modais});
            } catch (error) {
                console.log("ERRO AO LER PLANILHA", error);
                res.status(500).json({error: 'Erro ao processara planilha'});
            }
    } catch (error) {
        
    }
}

module.exports = { getAllmodals};