import { useEffect, useState } from "react";
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

    // Update document title and meta tags
  useEffect(() => {
    document.title = pageTitle;
    
    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = pageDescription;
    
    // Update or create og:title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.content = pageTitle;
    
    // Update or create og:description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.content = pageDescription;
    
    // Cleanup function to reset title on unmount
    return () => {
      document.title = 'Feriados en Chile 2024-2025 | Próximos Días Feriados';
    };
  }, [pageTitle, pageDescription]);

    return (
      <div className="desktop-container">
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
