import { useEffect, useState } from "react";
import { getNextHoliday } from "./api";
import HolidayCard from "./components/HolidayCard";
import HolidayCardMobile from "./components/HolidayCardMobile";
import "./styles/App.css";

function App() {
  const [holiday, setHoliday] = useState(null);
  const [error, setError] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [country, setCountry] = useState({ 
    code: 'CL', 
    name: 'Chile', 
  });

  useEffect(() => {
    // Detectar el país del usuario
    const detectCountry = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const countryCode = data.country_code || 'CL';
        let countryData = getCountryData(countryCode);
        if (!countryData) {
          countryData = { 
            code: 'CL', 
            name: 'Chile', 
          };
        }
        setCountry(countryData);
        return countryCode;
      } catch (error) {
        console.error('Error detecting country:', error);
        return 'CL'; // Default a Chile si hay error
      }
    };

    const fetchHolidays = async () => {
      try {
        const countryCode = await detectCountry();
        const holidayData = await getNextHoliday(countryCode);
        setHoliday(holidayData);
      } catch (e) {
        console.error('Error:', e);
        setError(e.message);
      }
    };

    fetchHolidays();

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderContent = () => {
    if (error) {
      return <p className="error-message">{error}</p>;
    }
    
    const countryTitle = (
      <div className="country-header">
        <h1>Próximo feriado en {country.name}</h1>
      </div>
    );

    if (isMobile) {
      const currentCountry = country || { name: 'Chile', code: 'CL' };
      const flagUrl = `https://flagcdn.com/48x36/${currentCountry.code.toLowerCase()}.png`;
      
      return (
        <>
          <div className="country-header">
            <h1>
              <div>Próximo feriado en:</div>
              <div className="country-flag-container">
                <span className="country-name">{currentCountry.name}</span>
                <img 
                  src={flagUrl}
                  alt={`Bandera de ${currentCountry.name}`}
                  className="country-flag"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            </h1>
          </div>
          <HolidayCardMobile 
            holiday={holiday} 
            country={currentCountry} 
          />
        </>
      );
    }
    
    return (
      <div className="desktop-container">
        {countryTitle}
        <HolidayCard holiday={holiday} country={country} />
      </div>
    );
  };

  return (
    <div className="app">
      {renderContent()}
    </div>
  );
}

export default App;
