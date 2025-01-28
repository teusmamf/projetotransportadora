const xlsx = require('xlsx');
const path = require('path');

const calculateRoute = (req, res) => {
    try {
        const { origemCidade, origemUf, destinoCidade, destinoUf, qtdeEixo, codigoProduto } = req.body;

        // Carregar a planilha
        const filePath = path.join(__dirname, '../database/consultarotas.xlsx');
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames.includes('Resultado') ? 'Resultado' : workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(sheet);

        // Padronizar strings para comparação
        const normalizeString = (str) => str.toString().trim().toLowerCase();

        // Buscar a rota que corresponde aos critérios
        const rotaEncontrada = data.find(row =>
            normalizeString(row['Cidade Origem']) === normalizeString(origemCidade) &&
            normalizeString(row['UF Origem']) === normalizeString(origemUf) &&
            normalizeString(row['Cidade Destino']) === normalizeString(destinoCidade) &&
            normalizeString(row['UF Destino']) === normalizeString(destinoUf) &&
            row['Qtde_Eixo'] == qtdeEixo &&
            row['Código_Produto'] == codigoProduto
        );

        if (!rotaEncontrada) {
            return res.status(404).json({ error: 'Rota não encontrada' });
        }

        // Resultado com acidentes e porcentagem random
        const acidentes = rotaEncontrada['Quantidade'] || 0;
        const porcentagemRisco = Math.floor(Math.random() * 100) + 1; // 1 a 100%

        return res.status(200).json({
            acidentes,
            porcentagemRisco
        });
    } catch (error) {
        console.error('Erro ao calcular a rota:', error);
        res.status(500).json({ error: 'Erro ao processar o cálculo' });
    }
};

module.exports = { calculateRoute };
