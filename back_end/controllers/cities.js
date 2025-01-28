const xlsx = require('xlsx');
const path = require('path');

// Função para ler a coluna "Cidade Origem" com "UF Origem"
const readOrigincity = (req, res) => {
    try {
        const filePath = path.join(__dirname, '../database/consultarotas.xlsx');
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0]; 
        const sheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(sheet);

        
        const cidadesOrigem = data.map(row => ({
            cidade: row['Cidade Origem'],
            uf: row['UF Origem']
        }));

        res.status(200).json({ cidadesOrigem });
    } catch (error) {
        console.error('Erro ao ler a planilha:', error);
        res.status(500).json({ error: 'Erro ao processar a planilha' });
    }
};


const readDestinyCity = (req, res) => {
    try {
        const filePath = path.join(__dirname, '../database/consultarotas.xlsx');
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(sheet);

      
        const cidadesDestino = data.map(row => ({
            cidade: row['Cidade Destino'],
            uf: row['UF Destino']
        }));

        res.status(200).json({ cidadesDestino });
    } catch (error) {
        console.error('Erro ao ler a planilha:', error);
        res.status(500).json({ error: 'Erro ao processar a planilha' });
    }
};

module.exports = { readDestinyCity, readOrigincity };
