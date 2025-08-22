import React from 'react';

const CountryHeader = ({ country = { name: 'Chile', code: 'CL' } }) => {
  const flagUrl = `https://flagcdn.com/48x36/${country.code.toLowerCase()}.png`;
  
  return (
    <div className="country-header">
      <h1>
        <div>Próximo feriado en:</div>
        <div className="country-flag-container">
          <span className="country-name">{country.name}</span>
          <img 
            src={flagUrl}
            alt={`Bandera de ${country.name}`}
            className="country-flag"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      </h1>
    </div>
  );
};

export default CountryHeader;
