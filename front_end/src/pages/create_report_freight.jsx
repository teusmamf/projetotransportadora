import React, { useState } from "react";
import axios from "axios";
import Dropdown from "../components/dropdown";
import BrazilMap from "../components/brasilmap";
import RouteButton from "../components/route_btn";
import ViewLocalButton from "../components/Viewaccident";
import logo from "../assets/logo.jpeg";  

const CalculationPage = () => {
    const [result, setResult] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [showBrazilMap, setShowBrazilMap] = useState(false);

    const handleCalculate = async () => {
        try {
            // Valores fixos do resultado
            const fixedResult = {
                origem: "AMERICO BRASILIENSE (SP)",
                destino: "SANTOS (SP)",
                modal: "3",
                produto: "ACUCAR GRANEL",
                acidentes: 3,
                risco: "18%"
            };

            setResult(fixedResult);
            setErrorMessage('');
            setShowBrazilMap(true); // Exibe o mapa após o cálculo
        } catch (error) {
            setErrorMessage('Erro ao calcular riscos. Tente novamente mais tarde.');
            setResult(null);
            console.error("Erro ao calcular riscos:", error);
        }
    };

    return (
        <div className="calculation-page">
            <div className="header-section">
                <img src={logo} alt="TrackShield Logo" className="logo" />
                <h1 className="title_header">Analisador de Frete e Sinistro </h1>
            </div>

            <div className="dropdowns">
                <Dropdown
                    label="Cidade Origem"
                    apiEndpoint="https://projetotransportadoraback.vercel.app/api_transportadora/cities/get_origin_city"
                    onChange={() => {}}
                />

                <Dropdown
                    label="Cidade Destino"
                    apiEndpoint="https://projetotransportadoraback.vercel.app/api_transportadora/cities/get_all_destiny_cities"
                    onChange={() => {}}
                />

                <Dropdown
                    label="Modal"
                    apiEndpoint="https://projetotransportadoraback.vercel.app/api_transportadora/modals/get_all_modals"
                    onChange={() => {}}
                />

                <Dropdown
                    label="Produto"
                    apiEndpoint="https://projetotransportadoraback.vercel.app/api_transportadora/products/get_all_proucts"
                    onChange={() => {}}
                />
            </div>

            <button className="calculate-button" onClick={handleCalculate}>
                Calcular Riscos
            </button>

            <div className="container_title_results">
                <h2>Resultados</h2>
            </div>
            <div className="results">
                {result ? (
                    <table className="table_results">
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

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            {showBrazilMap && (
                <div className="maps-section">
                    <div className="map-container">
                        <h3>Mapa do Brasil</h3>
                        <BrazilMap />
                    </div>
                    <div className="map-container">
                        <p>Rota Selecionada</p>
                        <RouteButton origin={result.origem} destination={result.destino} />
                    </div>
                </div>
            )}

            <ViewLocalButton
                show={result && (result.acidentes > 0 || result.obras > 0)}
                routeData={result}
            />
        </div>
    );
};

export default CalculationPage;
