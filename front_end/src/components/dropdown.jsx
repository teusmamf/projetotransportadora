import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dropdown = ({ label, apiEndpoint, onChange }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get(apiEndpoint);

        let data = response.data;

        if (data.produtos) {
          data = data.produtos.map((produto) => ({
            value: produto.codigo,
            label: produto.descricao,
          }));
        } else if (data.Modais) {
          data = data.Modais.map((modal) => ({
            value: modal,
            label: `${modal}`,
          }));
        } else if (data.cidadesOrigem) {
          data = data.cidadesOrigem.map((cidade) => ({
            value: `${cidade.cidade}-${cidade.uf}`, // Combina cidade e UF como valor
            label: `${cidade.cidade} (${cidade.uf})`, // Exibe cidade e UF como label
          }));
        } else if (data.cidadesDestino) {
          data = data.cidadesDestino.map((cidade) => ({
            value: `${cidade.cidade}-${cidade.uf}`, // Combina cidade e UF como valor
            label: `${cidade.cidade} (${cidade.uf})`, // Exibe cidade e UF como label
          }));
        }

        setOptions(data);
      } catch (error) {
        console.error(`Erro ao buscar dados para ${label}:`, error);
      }
    };
    fetchOptions();
  }, [apiEndpoint]);

  return (
    <div className="dropdown">
      <label>{label}</label>
      <select onChange={(e) => onChange(e.target.value)}>
        <option value="">Selecione...</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
