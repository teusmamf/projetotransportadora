const xlsx = require('xlsx');
const path = require('path');
const { log } = require('console');


const readOrigincity = (req, res) => {
    try {

        const filePath = path.join(__dirname,'../database/consultarotas.xlsx');
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames.includes('Resultado') ? 'Resultado' : workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(sheet);

        const CidadesOrigem = data.map(row => row['Cidade Origem']);
        res.status(200).json({CidadesOrigem});
    } catch (error) {
        console.log("ERRO AO LER PLANILHA", error);
        res.status(500).json({error: 'Erro ao processara planilha'});
    }
}

module.exports = { readOrigincity };