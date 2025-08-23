import { useEffect } from 'react';

const StructuredData = () => {
  useEffect(() => {
    // Create script element
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Feriados en Chile",
      "url": "https://ticktockferiados.cl",
      "description": "Consulta los próximos feriados de tu Pais. Calendario completo de días festivos con fechas exactas y días de la semana.",
      "applicationCategory": "LifestyleApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "creator": {
        "@type": "Organization",
        "name": "Feriados CL",
        "url": "https://ticktockferiados.cl"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://ticktockferiados.cl/buscar?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    };
    
    script.text = JSON.stringify(structuredData);
    
    // Add script to head
    document.head.appendChild(script);
    
    // Cleanup function to remove script on unmount
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default StructuredData;
