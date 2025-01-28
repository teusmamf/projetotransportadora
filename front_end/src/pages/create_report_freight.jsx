import React from "react";
import { useState } from "react";
import axios from "axios";
import Dropdown from "../components/dropdown";

const CalculationPage = () => {
    const [originCity, setOriginCity] = useState('');
    const [destinationCity, setDestinationCity] = useState('');
    const [modal, setModal] = useState('');
    const [product, setProduct] = useState('');
  
    const [result, setResult] = useState(null);
  
    const handleCalculate = async () => {
      try {
        const response = await axios.post("http://localhost:3000/api_transportadora/calculo/calcular_risco", {
          origemCidade: originCity.split("-")[0].trim(),
          origemUf: originCity.split("-")[1]?.trim(),
          destinoCidade: destinationCity.split("-")[0].trim(),
          destinoUf: destinationCity.split("-")[1]?.trim(),
          qtdeEixo: parseInt(modal, 10),
          codigoProduto: parseInt(product, 10)
        });

        const { acidentes, porcentagemRisco } = response.data;

        setResult({
          origem: `${originCity.split("-")[0].trim()} (${originCity.split("-")[1]?.trim()})`,
          destino: `${destinationCity.split("-")[0].trim()} (${destinationCity.split("-")[1]?.trim()})`,
          modal,
          produto: product,
          acidentes,
          risco: `${porcentagemRisco}%`
        });
      } catch (error) {
        console.error("Erro ao calcular riscos:", error);
        setResult(null);
      }
    };
  
    return (
      <div className="calculation-page">
        <h1>Motor de Cálculo de Frete – Gerenciador de Risco</h1>
  
        <div className="dropdowns">
          <Dropdown
            label="Cidade Origem"
            apiEndpoint="http://localhost:3000/api_transportadora/cities/get_origin_city"
            onChange={setOriginCity}
          />
  
          <Dropdown
            label="Cidade Destino"
            apiEndpoint="http://localhost:3000/api_transportadora/cities/get_all_destiny_cities"
            onChange={setDestinationCity}
          />
  
          <Dropdown
            label="Modal"
            apiEndpoint="http://localhost:3000/api_transportadora/modals/get_all_modals"
            onChange={setModal}
          />
  
          <Dropdown
            label="Produto"
            apiEndpoint="http://localhost:3000/api_transportadora/products/get_all_proucts"
            onChange={setProduct}
          />
        </div>
  
        <button className="calculate-button" onClick={handleCalculate}>
          Calcular Riscos
        </button>
  
        <div className="results">
          <h2>Resultados</h2>
          {result ? (
            <table>
              <thead>
                <tr>
                  <th>Cidade Origem</th>
                  <th>Cidade Destino</th>
                  <th>Modal</th>
                  <th>Produto</th>
                  <th>% Risco Rota</th>
                  <th>Nº Acidentes Rota</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{result.origem}</td>
                  <td>{result.destino}</td>
                  <td>{result.modal}</td>
                  <td>{result.produto}</td>
                  <td>{result.risco}</td>
                  <td>{result.acidentes}</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <p>Aguardando cálculo...</p>
          )}
        </div>
      </div>
    );
  };
  
  export default CalculationPage;
