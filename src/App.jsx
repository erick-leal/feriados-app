import { useEffect, useState } from "react";
import { getNextHoliday } from "./api";
import HolidayCardDesktop from "./components/HolidayCardDesktop";
import HolidayCardMobile from "./components/HolidayCardMobile";
import CountryHeader from "./components/CountryHeader";
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
    
    if (isMobile) {
      const currentCountry = country || { name: 'Chile', code: 'CL' };
      
      return (
        <>
          <CountryHeader country={currentCountry} />
          <HolidayCardMobile 
            holiday={holiday} 
            country={currentCountry} 
          />
        </>
      );
    }

    return (
      <div className="desktop-container">
        <CountryHeader country={country} />
        <HolidayCardDesktop holiday={holiday} />
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
