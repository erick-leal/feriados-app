import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { getNextHoliday } from "./api";
import HolidayCardDesktop from "./components/HolidayCardDesktop";
import HolidayCardMobile from "./components/HolidayCardMobile";
import CountryHeader from "./components/CountryHeader";
import StructuredData from "./components/StructuredData";
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
    // Fecha fija para probar feriados de octubre (puedes cambiarla)
    const testDate = new Date();
    // const testDate = new Date('2025-10-15');
    
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
        return { code: countryCode, name: countryData.name };
      } catch (error) {
        console.error('Error detecting country:', error);
        return { code: 'CL', name: 'Chile' }; // Default a Chile si hay error
      }
    };

    const fetchHolidays = async () => {
      try {
        const country = await detectCountry();
        // Formateamos la fecha correctamente para la API (YYYY-MM-DD)
        const formattedDate = testDate.toISOString().split('T')[0];
        
        // Pasamos la fecha formateada a getNextHoliday
        const holidayData = await getNextHoliday(country.code, formattedDate);
        
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
          />
        </>
      );
    }

    const pageTitle = holiday 
    ? `Próximo feriado en ${country.name}: ${holiday.name} - ${new Date(holiday.date).toLocaleDateString('es-CL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`
    : `Próximos feriados en ${country.name} | Calendario 2024-2025`;

  const pageDescription = holiday
    ? `El próximo feriado en ${country.name} es ${holiday.name} el ${new Date(holiday.date).toLocaleDateString('es-CL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.`
    : `Consulta los próximos feriados en ${country.name}. Calendario completo de días festivos con fechas exactas y días de la semana.`;

    return (
      <div className="desktop-container">
        <Helmet>
          <title>{pageTitle}</title>
          <meta name="description" content={pageDescription} />
          <meta property="og:title" content={pageTitle} />
          <meta property="og:description" content={pageDescription} />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={pageTitle} />
          <meta name="twitter:description" content={pageDescription} />
        </Helmet>
        <StructuredData />
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
